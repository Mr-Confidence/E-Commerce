import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import Carousel  from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";
import CustomRightArrow from './CustomRightArrow';
import CustomLeftArrow from './CustomLeftArrow';

// Responsive settings for the Carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const BannerCategories = () => {
  /** @type {[{ _id: string, name: string, image: string }[], Function]} */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Carousel 
      responsive={responsive} 
      infinite={true} 
      autoPlay={true} 
      autoPlaySpeed={1000} 
      className="flex flex-row p-4 max-w-screen-xl mx-auto lg:px-0 relative"
    customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {categories.map((category) => (
        <Link key={category._id} to={`category/${category._id}`} className='flex items-center gap-x-2 p-1 border border-gray-100 mr-1 flex-1 rounded-md hover:border-skyText hover:shadow-lg'>
          <img
            src={category.image}
            alt={category.name}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-sm font-semibold">{category.name}</span> 
        </Link>
      ))}
    </Carousel>
  );
};

export default BannerCategories;
    