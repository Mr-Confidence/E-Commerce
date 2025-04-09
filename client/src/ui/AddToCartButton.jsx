import React from 'react'
import { twMerge } from 'tailwind-merge'

const AddToCartButton = ({className, title}) => {
    const newClassName = twMerge("w-full bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer", className);
  return (
    <button className={newClassName}>{title?title:"ADD TO CART"}</button>
  )
};

export default AddToCartButton