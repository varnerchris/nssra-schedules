import React, { useEffect, useState } from "react";
import "./css/buildingSchedule.css"; // Import the CSS file
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
//import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

//import { parseXMLData } from './utility/xmlParser';

function BuildingSchedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  console.log(currentDate);

  useEffect(() => {
    const fetchXMLData = async () => {
      try {
        const response = await fetch("/building-schedule.xml");
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");
        const rows = xmlDoc.getElementsByTagName("ttReportRow");
        const today = new Date();

        // Filter and process rows with begin date after today and exclude specific mentions
        const filteredRows = Array.from(rows).filter((row) => {
          //const beginDate = row.getElementsByTagName('sadetail_begindate')[0].textContent;
          const reservationPurpose = row.getElementsByTagName(
            "sadetail_vsifunction-reservationpurpose"
          )[0].textContent;

          // Exclude rows with specific mentions
          const excludeMentions = [
            "ELA",
            "meeting",
            "Committee",
            "prep",
            "orientation",
          ];
          //const excludeMentions = ["tomato"];
          const hasExcludedMention = excludeMentions.some((mention) =>
            reservationPurpose.toLowerCase().includes(mention.toLowerCase())
          );

          // Remove rows with three or more numbers in a row
          const hasThreeOrMoreNumbers = /\d{3,}/.test(reservationPurpose);

          //Return exclude any mentions, have a reservation purpose, or include an activity code

          return (
            !hasExcludedMention && reservationPurpose && !hasThreeOrMoreNumbers
          );
        });

        // Create a list of filtered rows
        const scheduleItems = filteredRows
          .map((row, index) => {
            const beginDate =
              row.getElementsByTagName("sadetail_begindate")[0].textContent;
            const beginTime =
              row.getElementsByTagName("sadetail_begintime")[0].textContent;
            const endTime =
              row.getElementsByTagName("sadetail_endtime")[0].textContent;
            const reservationPurpose = row.getElementsByTagName(
              "sadetail_vsifunction-reservationpurpose"
            )[0].textContent;
            const facilityRoom = row.getElementsByTagName(
              "sadetail_itemdescription"
            )[0].textContent;

            return {
              beginDate,
              beginTime,
              endTime,
              reservationPurpose,
              facilityRoom,
            };
          })
          .filter((item) => {
            const { beginDate } = item;
            const programDate = new Date(beginDate);

            // Convert today's date to the same format as programDate
            const todayDateString = today.toISOString().split("T")[0];

            // Filter out programs whose end times have passed for today
            const currentTime = today.getTime();
            return (
              programDate.toISOString().split("T")[0] === todayDateString &&
              new Date(
                `${programDate.toISOString().split("T")[0]} ${item.endTime}`
              ).getTime() > currentTime
            );
          })

          .sort((a, b) => {
            const aDate = new Date(`${a.beginDate} ${a.beginTime}`);
            const bDate = new Date(`${b.beginDate} ${b.beginTime}`);
            return aDate - bDate;
          })
          .map((item, index) => {
            const { reservationPurpose, beginTime, endTime, facilityRoom } =
              item;
            return (
              <React.Fragment key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    marginBottom: 2,
                    width: 300,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" color="text.secondary">
                      {reservationPurpose}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      {beginTime} - {endTime}
                    </Typography>
                    <Typography variant="body2">{facilityRoom}</Typography>
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          });

        // Set the current date
        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
        };

        setCurrentDate(today.toLocaleDateString(undefined, options));

        const noPrograms = (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Card variant="outlined" sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  No programs scheduled for {currentDate}.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );

        setScheduleList(
          scheduleItems.length === 0 ? [noPrograms] : scheduleItems
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchXMLData();
  }, [currentDate]);

  return (
    <React.Fragment>
      {scheduleList.length === 0 ? (
        <Box
          sx={{
            minWidth: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              marginBottom: 2,
              width: 300,
            }}
          >
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                No programs scheduled today.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box sx={{ minWidth: 100 }}>{scheduleList}</Box>
      )}
    </React.Fragment>
  );
}

export default BuildingSchedule;
