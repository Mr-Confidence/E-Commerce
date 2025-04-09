import React, { useState } from 'react';
import { ProductProps } from '../../type';
import { MdOutlineStarOutline, MdOutlineStarHalf, MdOutlineStar } from 'react-icons/md';
import AddToCartButton from './AddToCartButton';
import { Transition, TransitionChild } from '@headlessui/react'; 
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';


const ProductCart = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const open =() => {
    setIsOpen(true);
  }
  const close =() => {
    setIsOpen(false);
  }
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
        <span onClick={open} className='bg-black text-skyText absolute left-0 right w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10'>
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
          <div className="mt-2">
            <AddToCartButton />
          </div>
          <Transition appear show={isOpen}>
              <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                  <div className='flex min-h-full items-center justify-center p-4'>
                  <TransitionChild 
                   enter="ease-out duration-300"
                   enterFrom="opacity-0 transform-[scale(95%)]"
                   enterTo="opacity-100 transform-[scale(100%)]"
                   leave="ease-in duration-200"
                   leaveFrom="opacity-100 transform-[scale(100%)]"
                   leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                      <DialogTitle as="h3" className="text-base/7 font-medium text-whiteText"> 
                        Hurry up!!!
                      </DialogTitle>
                      <p className="mt-2 text-sm/6 text-white/50">
                    You are going to save{" "}
                    <span className="text-skyText">
                      {/* <FormattedPrice
                        amount={product?.regularPrice - product?.discountedPrice}
                      />{" "} */}
                    </span>
                    from this product.
                  </p>
                  <p className="text-sm/6 text-white/50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, consequatur?
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                    </DialogPanel>
                  </TransitionChild>
                  </div>
                </div>
              </Dialog>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default ProductCart;