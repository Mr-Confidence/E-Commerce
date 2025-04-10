import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import { config } from "../../config";
import { Link } from "react-router-dom";
import { BlogProps } from "../../type";

const Blog = () => {
  const [blogsData, setBlogsData] = useState([]); // State for blogs data
  
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/blogs`;
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setBlogsData(data);
        } else {
          console.error('Failed to fetch blogs', response.statusText);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Title text="Our Blog Posts" className="text-center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7">
        {blogsData?.map((blog) => (
          <div key={blog?._id} className="group cursor-pointer">
            <div className="overflow-hidden">
              <img
                src={blog?.image}
                alt={blog?.title || "Blog image"}
                className="w-full h-auto object-cover group-hover:scale-110 duration-300"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm uppercase font-medium text-gray-500">
                {blog?._base || "Uncategorized"}
              </p>
              <p className="text-2xl font-bold line-clamp-1">
                {blog?.title}
              </p>
              <Link 
                to={`/blog/${blog?._id}`} 
                className="mt-2 inline-block text-blue-600 hover:text-blue-800"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Blog;