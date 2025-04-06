import React from 'react';
import { ProductProps } from '../../type';
import { MdOutlineStarOutline, MdOutlineStarHalf, MdOutlineStar } from 'react-icons/md';

const ProductCart = ({ product }) => {
  // Add null checks and fallbacks
  const percentage = product?.discountedPrice && product?.regularPrice ? 
    ((product?.regularPrice - product?.discountedPrice) / product?.regularPrice) * 100 : 0;
  const firstImage = product?.images?.[0] || '/placeholder.jpg';
  const productName = product?.name || 'Product';
  
  // Calculate rating (assuming product.rating is a number between 0-5)
  const rating = product?.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className='border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer'>
      <div className="w-full h-60 relative p-2 group">
        <span className='bg-black text-skyText absolute left-0 right w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10'>
          save {percentage.toFixed(0)}%
        </span>
        <img 
          src={firstImage} 
          alt={productName}
          className='w-full h-full rounded-md object-cover group-hover:scale-110 duration-300'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
      </div>
      <div className='flex flex-col gap-2 px-2 pb-2'>
        <h3 className='text-xs uppercase font-semibold text-lightText'>{product?.overView}</h3>
      </div>
      {product?.name && (
        <div className='p-2'>
          <h2 className='text-lg font-bold line-clamp-2'>{product.name}</h2>
          
          {/* Star Rating */}
          <div className="flex items-center gap-1 my-1 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
              <MdOutlineStar key={`full-${i}`} />
            ))}
            {hasHalfStar && <MdOutlineStarHalf />}
            {[...Array(emptyStars)].map((_, i) => (
              <MdOutlineStarOutline key={`empty-${i}`} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product?.reviews || 0})</span>
          </div>
          
          {product.discountedPrice && (
            <div className="flex items-center gap-2">
              <p className='text-gray-900 font-bold'>${product.discountedPrice}</p>
              {product.regularPrice && product.discountedPrice < product.regularPrice && (
                <p className='text-sm text-gray-500 line-through'>${product.regularPrice}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCart;