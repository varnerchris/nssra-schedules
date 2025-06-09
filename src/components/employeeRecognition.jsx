import React, { useEffect, useState } from "react";

function EmployeeRecognition() {
  const apiUrl = `https://api.bamboohr.com/api/gateway.php/${process.env.REACT_APP_BAMBOOHR_SUBDOMAIN}/v1/employees/directory`;
  const apiKey = process.env.REACT_APP_BAMBOOHR_API_KEY;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the authorization header value
        const authHeader = `Basic ${btoa(apiKey + ":")}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: authHeader,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.statusText} - ${errorText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(`Fetch error: ${err.message}`);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Employee Directory</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default EmployeeRecognition;
