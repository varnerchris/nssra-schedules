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
          "https://winpark.org/wp-json/wp/v2/posts/"
        ); // Testing Endpoint

        const data = await response.json();
        const allEvents = data
          .map((event) => (
            <Box
              key={event.id}
              sx={{
                marginRight: 8,
              }}
            >
              <Typography variant="h5" color="success.dark">
                {event.title.rendered}
              </Typography>
            </Box>
          ))
          .slice(0, MAX_DISPLAY_ITEMS); // Slice the array to include only the first 5 items;

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
        }}
      >
        {logo}
      </Box>
      {events}
    </Box>
  );
}

export default GatorEvents;
