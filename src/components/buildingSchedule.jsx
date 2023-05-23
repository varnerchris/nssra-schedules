import React, { useEffect, useState } from 'react';
import './css/buildingSchedule.css'; // Import the CSS file
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


//import { parseXMLData } from './utility/xmlParser';

function BuildingSchedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchXMLData = async () => {
      try {
        const response = await fetch('/building-schedule.xml');
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
        const rows = xmlDoc.getElementsByTagName('ttReportRow');
        const today = new Date();

        // Filter and process rows with begin date after today and exclude specific mentions
        const filteredRows = Array.from(rows).filter((row) => {
          const beginDate = row.getElementsByTagName('sadetail_begindate')[0].textContent;
          const [month, day, year] = beginDate.split('/');
          const parsedDate = new Date(`${month}-${day}-${year}`);

          const reservationPurpose = row.getElementsByTagName('sadetail_vsifunction-reservationpurpose')[0].textContent;

          // Exclude rows with specific mentions
          const excludeMentions = ['ELA', 'training', 'meeting', 'Committee', 'prep', 'orientation'];
          const hasExcludedMention = excludeMentions.some((mention) => reservationPurpose.toLowerCase().includes(mention.toLowerCase()));

          // Remove rows with three or more numbers in a row
          const hasThreeOrMoreNumbers = /\d{3,}/.test(reservationPurpose);

          //Return rows after today that exclude any mentions, have a reservation purpose, or include an activity code
          return parsedDate >= today && !hasExcludedMention && reservationPurpose && !hasThreeOrMoreNumbers;
        });


        // Create a list of filtered rows
        const scheduleItems = filteredRows.map((row, index) => {
          const beginDate = row.getElementsByTagName('sadetail_begindate')[0].textContent;
          const beginTime = row.getElementsByTagName('sadetail_begintime')[0].textContent;
          const endTime = row.getElementsByTagName('sadetail_endtime')[0].textContent;
          const reservationPurpose = row.getElementsByTagName('sadetail_vsifunction-reservationpurpose')[0].textContent;
          const facilityRoom = row.getElementsByTagName('sadetail_itemdescription')[0].textContent;

          return (
            <React.Fragment>
              <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {reservationPurpose}
                </Typography>
                
                <Typography variant="subtitle1">
                {facilityRoom}
                </Typography>
                <Typography variant="subtitle2" >
                {beginTime} - {endTime}
                </Typography>
              </CardContent>
            </React.Fragment>
          );


        });

        setScheduleList(scheduleItems);

        // Set the current date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString(undefined, options));
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchXMLData();
  }, []);

  return (
    <Box sx={{ minWidth: 100 }}>
      <Card variant="outlined">{scheduleList}</Card>
    </Box>
  );
}



export default BuildingSchedule;


/*import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
  );
}*/