import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import gatorLogo from "./images/gatorLogo.png";

function GatorEvents() {
  const [events, setEvents] = useState([]);
  const MAX_DISPLAY_ITEMS = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://www.nssra.org/wp-json/wp/v2/gators?&per_page=100"
        ); // Final endpoint

        const data = await response.json();
        console.log(data);
        const currentDate = new Date(); // Get the current date and time
        console.log(currentDate);

        const allEvents = data
          .map((event) => {
            const sport =
              event.acf.sport.charAt(0).toUpperCase() +
              event.acf.sport.slice(1);
            const teamColor = event.acf.team_color;
            const opponent = event.acf.opponent;
            const dateTime = new Date(event.acf.date_and_time);
            const location = event.acf.location;

            const formattedDate = dateTime.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            });

            const formattedTime = dateTime.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return {
              id: event.id,
              sport,
              teamColor,
              opponent,
              dateTime,
              location,
              formattedDate,
              formattedTime,
            };
          })
          .filter((event) => event.dateTime >= currentDate) // Filter out events that have already passed

          .sort((a, b) => a.dateTime - b.dateTime) // Sort events by start date
          .slice(0, MAX_DISPLAY_ITEMS) // Slice the array to include only the first 3 items
          .map((event) => (
            <Box
              key={event.id}
              sx={{
                marginRight: 8,
                width: 520,
                marginTop: -2,
              }}
            >
              <Typography variant="h5" color="white">
                Gator {/*event.teamColor*/} {event.sport} {/*vs*/}{" "}
                {/*event.opponent*/}
              </Typography>
              <Typography variant="body1" color="success.dark">
                {event.formattedDate} at {event.formattedTime}
              </Typography>
              <Typography variant="body2" color="success.dark">
                {event.location}
              </Typography>
            </Box>
          ));
        setEvents(allEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const logo = gatorLogo;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 8,
        boxSizing: "border-box",
        backgroundColor: "#74B943",
        zIndex: 9999,
        height: 177,
      }}
    >
      <Box
        sx={{
          marginRight: 8,
          width: 300,
          height: 100,
          marginTop: -3,
        }}
      >
        <img
          src={logo}
          alt="gator logo"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
      </Box>

      {events}
    </Box>
  );
}

export default GatorEvents;
