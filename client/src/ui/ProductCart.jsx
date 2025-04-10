import React, { useState } from 'react';
import { MdOutlineStarOutline, MdOutlineStarHalf, MdOutlineStar } from 'react-icons/md';
import AddToCartButton from './AddToCartButton';
import { Transition, TransitionChild } from '@headlessui/react';
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import FormattedPrice from './FormattedPrice';
import ProductCardSideNav from './ProductCardSideNav';
import { useNavigate } from 'react-router-dom';

const ProductCart = ({ product, setSearchText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate values
  const percentage = product?.discountedPrice && product?.regularPrice ? 
    Math.round(((product.regularPrice - product.discountedPrice) / product.regularPrice) * 100) : 0;
  
  const firstImage = product?.images?.[0] || '/placeholder.jpg';
  const productName = product?.name || 'Product';
  
  // Calculate rating components
  const rating = product?.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Generate realistic review count
  const reviewCount = product?.reviews?.length || Math.floor(Math.random() * 9000000) + 1000000;

  // Format numbers with commas
  const formatNumber = num => num?.toLocaleString() || '0';

  // Handlers
  const openDialog = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);
  const handleProductClick = () => {
    navigate(`/product/${product?._id}`);
    setSearchText?.("");
  };

  if (!product) return null;

  return (
    <div 
      className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer group"
      onClick={handleProductClick}
    >
      {/* Product Image with Discount Badge */}
      <div className="w-full h-60 relative p-2">
        <span 
          onClick={openDialog}
          className="bg-black text-skyText absolute left-0 top-2 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10 hover:bg-gray-800 transition-colors"
          aria-label={`Save ${percentage}%`}
        >
          Save {percentage}%
        </span>
        <img 
          src={firstImage} 
          alt={productName}
          className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
          loading="lazy"
          onError={(e) => (e.target.src = '/placeholder.jpg')}
        />
        <div onClick={(e) => e.stopPropagation()}>
          <ProductCardSideNav product={product} />
        </div>
      </div>
     
      {/* Product Info */}
      <div className="p-3 space-y-2">
        {product?.overView && (
          <h3 className="text-xs uppercase font-semibold text-lightText truncate">
            {product.overView}
          </h3>
        )}

        <h2 className="text-lg font-bold line-clamp-2" title={productName}>
          {productName}
        </h2>
        
        {/* Star Rating with Review Count */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
              <MdOutlineStar key={`full-${i}`} />
            ))}
            {hasHalfStar && <MdOutlineStarHalf />}
            {[...Array(emptyStars)].map((_, i) => (
              <MdOutlineStarOutline key={`empty-${i}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({formatNumber(reviewCount)} reviews)
          </span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center gap-2">
          <p className="text-gray-900 font-bold">
            <FormattedPrice amount={product.discountedPrice} />
          </p>
          {product.regularPrice && product.discountedPrice < product.regularPrice && (
            <p className="text-sm text-gray-500 line-through">
              <FormattedPrice amount={product.regularPrice} />
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Enhanced Discount Dialog */}
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50" onClose={closeDialog}>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-xl">
                <DialogTitle as="h3" className="text-lg font-bold text-white">
                  Limited Time Offer!
                </DialogTitle>
                
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">
                    You're saving <span className="text-skyText font-bold">
                      <FormattedPrice amount={product.regularPrice - product.discountedPrice} />
                    </span> ({percentage}% off)
                  </p>
                  <p className="text-gray-300">
                    Product rating: {rating.toFixed(1)} stars ({formatNumber(reviewCount)} reviews)
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
                    onClick={closeDialog}
                  >
                    Continue Shopping
                  </Button>
                  <AddToCartButton 
                    product={product}
                    className="bg-skyText hover:bg-skyText/90 text-white"
                    onClick={closeDialog}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCart;