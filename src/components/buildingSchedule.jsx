import React, { useEffect } from 'react';
import { parseXMLData } from './utility/xmlParser';

function BuildingSchedule() {
    useEffect(() => {
      const fetchXMLData = async () => {
        try {
          const response = await fetch('/building-schedule.xml');
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const rows = xmlDoc.getElementsByTagName('ttReportRow');

        // Loop through each row and extract begin date and end date
        for (let i = 0; i < rows.length; i++) {
          
          
          const row = rows[i];
          const beginDate = row.getElementsByTagName('sadetail_begindate')[0].textContent;
          const endDate = row.getElementsByTagName('sadetail_enddate')[0].textContent;
          const reservationPurpose = row.getElementsByTagName('sadetail_vsifunction-reservationpurpose')[0].textContent;
          
          console.log('Reservation Purpose', reservationPurpose)
          console.log('Begin Date:', beginDate);
          console.log('End Date:', endDate);
        }

        console.log('Success');
      } catch (error) {
        console.error(error);
      }
    };

    fetchXMLData();
  }, []);
  
    return <div>Building Schedule</div>;
  }
  
  export default BuildingSchedule;
  
  
  
  
  
  