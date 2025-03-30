import React, { useState } from "react";
import { logo } from "../assets";
import {IoClose, IoSearchOutline} from "react-icons/io5";
import {FiShoppingBag, FiStar, FiUser} from "react-icons/fi";
import Container from "./Container";
import {FaChevronDown} from "react-icons/fa6";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

function  Header() {
  const [searchText, setSearchText] = useState(""); 
  return <div className="w-full bg-whiteText">
    <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
    {/* Logo */}
      <img src={logo}  alt="logo" className="w-44"/>
      {/* Search Bar */}
      <div className="hidden md:inline-flex max-w-3xl w-full relative">
        <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} placeholder="Search products..." className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-darkText sm:text-sm px-4 py-2"/>
        {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
            />
          ) : (
            <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
          )}      </div>
      {/* Menubar */}
      <div className="flex items-center gap-6 text-2xl">
        <FiUser className="hover:text-skyText duration-200 cursor-pointer"/>
        <div className="relative block">
        <FiStar className="hover:text-skyText duration-200 cursor-pointer"/>
        <span className="inline-flex items-center justify-center bg-red-500 text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">0</span>
        </div>
        <div className="relative block">
        <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer"/>
        <span className="inline-flex items-center justify-center bg-red-500 text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">0</span>
        </div>

      </div>
    </div>
    <div className="w-full bg-darkText text-whiteText">
      <Container className="py-2 max-w-4xl flex items-center justify-between">
        <p className="flex items-center gap-1">
          Select Category <FaChevronDown />
          </p>
          {
            bottomNavigation.map(({title, link}) => (
             <div key={title}>
              
             </div>
            ))
          }
      </Container>
    </div>
    </div>;
}

export default Header;
  