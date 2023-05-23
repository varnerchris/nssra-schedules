import React, { useEffect, useState } from 'react';
//import { parseXMLData } from './utility/xmlParser';

function BuildingSchedule() {
  const [scheduleList, setScheduleList] = useState([]);

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
          const excludeMentions = ['ELA', 'training', 'meeting', 'Committee', 'prep','orientation'];
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
            <div key={index}>
              <p><strong>{reservationPurpose}</strong></p>
              <p>Room: {facilityRoom}</p>
              <p>Begin Date: {beginDate}</p>
              <p>Time: {beginTime} - {endTime}</p>
            </div>
          );
        });

        setScheduleList(scheduleItems);
        console.log('Success');
      } catch (error) {
        console.error(error);
      }
    };

    fetchXMLData();
  }, []);

  return (
    <div>
      <h2>Building Schedule</h2>
      <ul>{scheduleList}</ul>
    </div>
  );
}

export default BuildingSchedule;
