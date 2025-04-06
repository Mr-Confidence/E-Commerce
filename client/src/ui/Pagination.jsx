"use client";
import React, { useEffect, useState } from 'react';
import { config } from "../../config";
import { ProductProps } from '../../type';
import ReactPaginate from "react-paginate";
import ProductCart from './ProductCart';

const Items = ({ currentItems }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems && currentItems.map((product) => (
        <ProductCart key={product._id} product={product} />
      ))}
    </div>
  );
}; // Removed extra closing brace here

const Pagination = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage = 15;

  const PaginationComponent = ({ products }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage;
      const newStart = newOffset + 1;
      setItemOffset(newOffset);
      setItemStart(newStart);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center'>
          <ReactPaginate
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel=""
            pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
            pageClassName="mr-6"
            containerClassName="flex text-base font-semibold py-10"
            activeClassName="bg-black text-white"
          />
          <p>Products from {itemStart} to {Math.min(endOffset, products.length)} of {products.length}</p>    
        </div>
      </>
    );
  };

  return <PaginationComponent products={products} />;
};

export default Pagination;