import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import CategoryFilters from "../ui/CategoryFilters";
import ProductCart from "../ui/ProductCart";

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      console.log("Fetching from:", url); // Debug log
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data); // Debug log
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoint = `${config?.baseUrl}/categories/${id}`;
        const data = await fetchData(endpoint);
        
        // Handle different response formats
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products) {
          setProducts(data.products);
        } else {
          throw new Error("Unexpected data format received");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message || "Failed to load category data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  const formatId = (id) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500">
          {error}
          <div className="mt-2 text-sm text-gray-500">
            Please check your network connection and try again.
          </div>
        </div>
      ) : (
        <Container>
          <h2 className="text-4xl text-center font-semibold mb-5">
            {formatId(id)}
          </h2>
          <div className="flex items-start gap-10">
            <CategoryFilters id={id} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.length === 0 ? (
                <div className="text-center text-gray-500 col-span-4">
                  No products available in this category.
                </div>
              ) : (
                products.map((product) => (
                  <ProductCart product={product} key={product._id} />
                ))
              )}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Category;