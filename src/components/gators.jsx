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
          //"https://winpark.org/wp-json/wp/v2/posts/"
          "https://www.nssra.org/wp-json/wp/v2/gators/"
        ); // Testing Endpoint

        const data = await response.json();

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

            return (
              <Box
                key={event.id}
                sx={{
                  marginRight: 8,
                }}
              >
                <Typography variant="h5" color="white">
                  Gator {teamColor} {sport} vs {opponent}
                </Typography>
                <Typography variant="body1" color="success.dark">
                  {formattedDate} at {formattedTime}
                </Typography>
                <Typography variant="body2" color="success.dark">
                  {location}
                </Typography>
              </Box>
            );
          })
          .slice(0, MAX_DISPLAY_ITEMS); // Slice the array to include only the first 3 items
        setEvents(allEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  //const maxBoxes = 3; // Maximum number of boxes to render

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
          width: 480,
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
