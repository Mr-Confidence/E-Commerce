import Container from './Container';
import React, { useEffect, useState } from 'react';
import { config } from "../../config";
import Title from "./Title";
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const response = await fetch(endpoint); // Fetching data
        const data = await response.json(); // Parsing the response
        setCategories(data); // Updating the state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData(); // Fetch categories when the component is mounted
  }, []);

  return (
    <Container>
      <div className='mb-10'>
        <div className='flex items-center justify-between'>
          <Title text="Popular Categories" />
          <Link to={"/category/TvAndAudio"} className='font-medium relative group overflow-hidden'>
            View All Categories
            <span className="absolute -bottom-0 left-0 w-full block h-[1px] bg-gray-600 translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <div className='w-full h-[1px] bg-gray-200 mt-3' />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 mt-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._base}`}
            className='w-full h-auto relative group overflow-hidden'
          >
            <img
              src={category.image}
              alt={category.name || "Category"} // More descriptive alt
              className='w-full h-auto rounded-md group-hover:scale-110 duration-300'
            />
            <div className='absolute bottom-3 w-full text-center'>
              <p className='text-sm md:text-base font-bold'>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
