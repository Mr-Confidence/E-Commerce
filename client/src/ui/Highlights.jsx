import Container from './Container';
import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import { Link } from 'react-router-dom';
import { HighlightsType } from '../../type';



const Highlights = () => {
  const [highlightsData, setHighlightsData] = useState([]); // State for highlights data

  // Fetch highlights data
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/highlights`;
      try {
        const response = await fetch(endpoint); // Fetch the data from the endpoint
        if (response.ok) { // Ensure the response is successful
          const data = await response.json(); // Parse JSON response
          setHighlightsData(data); // Store the data in state
        } else {
          console.error('Failed to fetch highlights', response.statusText);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error); // Error handling
      }
    };
    fetchData(); // Trigger data fetch on component mount
  }, []);

  // Handle empty data state
  if (highlightsData.length === 0) {
    return <Container className="text-center py-8">No highlights available at the moment.</Container>;
  }

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlightsData.map((highlight) => (
        <div
          key={highlight._id}
          className="relative h-60 rounded-lg shadow-md cursor-pointer overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${highlight.image})`,
              color: highlight.color || '#fff', // Fallback color if none provided
            }}
          ></div>
            {/* <div className='relative z-10 p-6 flex flex-col justify-between h-full'> */}
          <div className='relative z-10 p-6 flex flex-col justify-between h-full'>
           <div>
           <h3 className="text-xl font-bold">{highlight.name}</h3>
           <p className="text-sm">{highlight.title}</p>
           </div>
           <Link  to={`/${highlight._base}`}>{highlight.buttonTitle}</Link>
          </div>
          </div>
      ))}
    </Container>
  );
};

export default Highlights;
