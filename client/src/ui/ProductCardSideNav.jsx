import React, { useState } from 'react';
import { FaRegStar, FaStar, FaRegEye } from 'react-icons/fa';
import { LuArrowLeftRight } from 'react-icons/lu';

const ProductCardSideNav = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-4">
      {/* Favorite Button */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-black hover:text-white transition-all"
        onClick={handleFavoriteToggle}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? <FaStar /> : <FaRegStar />}
      </button>

      {/* Compare Button */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-black hover:text-white transition-all"
        aria-label="Compare Products"
      >
        <LuArrowLeftRight />
      </button>

      {/* View Product Button */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-black hover:text-white transition-all"
        aria-label="View Product"
      >
        <FaRegEye />
      </button>
    </div>
  );
};

export default ProductCardSideNav;
