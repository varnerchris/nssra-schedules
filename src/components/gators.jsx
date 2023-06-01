import React, { useEffect, useState } from 'react';

function GatorEvents() {

  const [events, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
        
      try {
        const response = await fetch('https://www.nssra.org/wp-json/wp/v2/gators');
        //const response = await fetch('https://winpark.org/wp-json/wp/v2/posts/');
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Gator Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title.rendered}</h2>
          <p dangerouslySetInnerHTML={{ __html: event.excerpt.rendered }}  />
        </div>
      ))}
    </div>
  );
}

export default GatorEvents;