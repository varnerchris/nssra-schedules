import React, { useEffect, useState } from "react";
import "./css/DisplayEvents.css"; // Import the CSS file
import "../App.css"; // Import the CSS file
import nssraLogo from "./images/NSSRALogoWhite.png";
import EventDescription from "./utility/EventDescription"; // Import the new component

function DisplayEvents() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // State to handle content loading
  const [isContentVisible, setIsContentVisible] = useState(true); // State for fade-in effect
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false); // State to filter by image presence
  const MAX_DISPLAY_ITEMS = 100; //max slides to show
  const SLIDESHOW_INTERVAL = 15000; // Interval in milliseconds (15 seconds)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // First API call to get the list of future events
        const response1 = await fetch(
          "https://www.nssra.org/wp-json/tribe/events/v1/events/?per_page=200"
        );
        const data1 = await response1.json();

        // Filter events to include only those with a future start date
        const filteredEvents = data1.events.filter((event) => {
          const eventDate = new Date(event.start_date); // Convert the event date to a Date object
          const currentDate = new Date(); // Get the current date
          return eventDate > currentDate;
        });

        // Extract the IDs of filtered events
        const eventIds = filteredEvents.map((event) => event.id);

        // Second API call to get event details by ID
        const response2 = await fetch(
          "https://www.nssra.org/wp-json/wp/v2/tribe_events?order=desc&per_page=100&acf_format=standard"
        );
        const data2 = await response2.json();

        // Filter second API data by matching IDs
        const matchedEvents = data2.filter((event) =>
          eventIds.includes(event.id)
        );

        // Combine matched events data with filteredEvents
        const combinedEvents = filteredEvents.map((event) => {
          const matchedEvent = matchedEvents.find((e) => e.id === event.id);
          return {
            ...event,
            image: matchedEvent?.acf?.digital_display_image, // Adjust according to your image field
          };
        });

        // Optionally filter out events without images
        const eventsToDisplay = showOnlyWithImages
          ? combinedEvents.filter((event) => event.image)
          : combinedEvents;

        // Shuffle events and set a random start index
        const shuffledEvents = eventsToDisplay
          .sort(() => 0.5 - Math.random())
          .slice(0, MAX_DISPLAY_ITEMS);
        setEvents(shuffledEvents);
        setCurrentIndex(Math.floor(Math.random() * shuffledEvents.length));
        setIsLoaded(true); // Set loaded to true after data is fetched

        // Start slideshow
        const intervalId = setInterval(() => {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % shuffledEvents.length
          );
        }, SLIDESHOW_INTERVAL);

        return () => clearInterval(intervalId); // Clean up on component unmount
      } catch (error) {
        console.error(error);
        setIsLoaded(true); // Set loaded to true even if there was an error
      }
    };

    fetchEvents();
  }, [showOnlyWithImages]); // Add showOnlyWithImages to dependency array

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsContentVisible(true); // Trigger fade-in effect
      }, 100); // Slight delay to ensure content is fully loaded

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const currentEvent = events[currentIndex];
  console.log(currentEvent);

  return (
    <div className="container">
      {events.length === 0 ? (
        <div className="color-moving-wrapper">
          <div className="color-moving"></div>
          <img src={nssraLogo} alt="Logo" className="logo" />
        </div>
      ) : (
        <div className={`fade-in ${isContentVisible ? "visible" : ""}`}>
          {currentEvent ? (
            currentEvent.image ? (
              <div
                className="event-with-image"
                style={{ backgroundImage: `url(${currentEvent.image})` }}
              >
                <div className="event-content">
                  <h3 className="event-title">{currentEvent.title}</h3>
                  <p className="event-date">
                    {new Date(currentEvent.start_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>

                  <EventDescription
                    description={currentEvent.description}
                    classImport="event-description"
                  />
                  <p className="event-website">
                    {currentEvent.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </p>
                </div>
              </div>
            ) : showOnlyWithImages ? ( // Check if only images should be shown
              <div className="color-moving-wrapper">
                <div className="color-moving"></div>
                <img src={nssraLogo} alt="Logo" className="logo" />
              </div>
            ) : (
              <div className="event-without-image">
                <div className="event-content-no-image">
                  <h3 className="event-title-no-image">{currentEvent.title}</h3>
                  <p className="event-date-no-image">
                    {new Date(currentEvent.start_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>

                  <EventDescription
                    description={currentEvent.description}
                    classImport="event-description-no-image"
                  />
                  <p className="event-website">
                    {currentEvent.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="color-moving-wrapper">
              <div className="color-moving"></div>
              <img src={nssraLogo} alt="Logo" className="logo" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayEvents;
