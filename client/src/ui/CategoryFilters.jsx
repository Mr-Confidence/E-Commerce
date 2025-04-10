import React, { useEffect, useState } from "react";
import { config } from "../../config";
import { PulseLoader } from 'react-spinners'; // Using PulseLoader instead
import { Link } from "react-router-dom";

const CategoryFilters = ({ id }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    const endpoint = `${config?.baseUrl}/categories`;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchData(endpoint);
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories. Please try again later.");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="hidden md:inline-flex flex-col gap-6">
      <p className="text-3xl font-bold">Filters</p>
      <div>
        <p className="text-sm uppercase font-semibold underline underline-offset-2 decoration-[1px] mb-2">
          Select Categories
        </p>
        <div className="flex flex-col gap-y-2 min-w-40">
          {loading ? (
            <div className="flex items-center justify-center my-5">
              <PulseLoader 
                color="#000000"
                size={10}
                speedMultiplier={0.75}
              />
              <p className="mt-2 text-sm text-gray-500">Loading categories...</p> {/* Added loading message */}
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : categories.length === 0 ? (
            <div className="text-gray-500 text-sm">No categories available.</div>
          ) : (
            categories.map((item) => (
              <Link
                to={`/category/${item._base}`}
                key={item._id}
                className={`text-base font-medium text-start underline underline-offset-2 decoration-[1px] decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item._base === id
                    ? "text-greenText decoration-greenText"
                    : "text-lightText"
                }`}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
