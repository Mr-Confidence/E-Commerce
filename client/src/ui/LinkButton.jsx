import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const LinkButton = ({ showButton, link, className }) => {
    const NewClassName = twMerge("bg-darkText/80 hover:bg-darkText text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200", className);

    return (
        <Link to={link ? link : '/products'} className={NewClassName}>
            {showButton && <FaArrowLeft />} Start Shopping
        </Link>
    );
};

export default LinkButton;
