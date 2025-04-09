// ProductList.jsx
import Container  from './Container'; // Assuming Container.jsx is in the same directory
import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';
import Pagination from './Pagination';


const ProductList = () => {
  return (
    <Container>
      <div className='mb-10'>
        <div className='flex items-center justify-between'>
          <Title text="Top Selling Products" />
          <Link to={"/product"}>View All Products</Link>
        </div>
            <div className='w-full h-[1px] bg-gray-200 mt-2'/>
      </div>
      <Pagination />
    </Container>
  );
};

export default ProductList;
