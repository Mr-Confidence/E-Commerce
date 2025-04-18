import React, { useEffect, useState } from "react";
import { logo } from "../assets";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import Container from "./Container";
import { FaChevronDown } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import { CategoryProps } from "../../type";
import ProductCart from "./ProductCart";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

function Header() {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

   

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const response = await fetch(endpoint); // Using fetch to get data
        const data = await response.json(); // Assuming the response is JSON
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

      useEffect(()=>{
        const filtered = products.filter((product)=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProducts(filtered);

      setFilteredProducts(filtered);
      },[searchText])
    
  return (
    <div className="w-full bg-whiteText md:sticky md:top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-44" />
        </Link>
        {/* Search Bar */}
        <div className="hidden md:inline-flex max-w-3xl w-full relative">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search products..."
            className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-darkText sm:text-sm px-4 py-2"
          />
          {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
            />
          ) : (
            <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
          )}
        </div>
         {/* Search product will go here */}
         {searchText && (
          <div className="absolute left-0 top-20 w-full mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-[#8b225a] scrollbar-hide">
            {filteredProducts.length > 0 ?(<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">{filteredProducts.map((product)=>(<ProductCart product={product} key={product._id} setSearchText={setSearchText}/>))}</div>):(<div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md"><p className="text-xl font-normal">No products found{""} <span className="underline underline-offset-2 decoration-[1px] text-red-500 text-semibold">{`(${searchText})`}</span></p>Please try again</div>)}
          </div>
         )}
        {/* Menubar */}
        <div className="flex items-center gap-6 text-2xl">
          <Link to="/profile">
            <FiUser className="hover:text-skyText duration-200 cursor-pointer" />
          </Link>
          {/* Favorites */}
          <Link to="/favorite" className="relative block">
            <FiStar className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-500 text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              0
            </span>
          </Link>

          <Link to="/cart" className="relative block">
            <FiShoppingBag className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-500 text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              0
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full bg-darkText text-whiteText">
        <Container className="py-2 max-w-4xl flex items-center justify-between">
          <Menu>
            <MenuButton className="inline-flex item-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whitetext">
              Select Category
              <FaChevronDown className="ml-2" />
            </MenuButton>
            <Transition  enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <MenuItems anchor="bottom end" className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50">
                {categories.map(
                  /** @param {typeof CategoryProps} category */
                  (category) => (
                    <MenuItem key={category._id}>
                      <Link
                        to={`/category/${category._id}`}
                        className="flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/30 tracking-wide"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-6 h-6 rounded-md"
                        />
                        <span>{category.name}</span> 
                      </Link>
                    </MenuItem>
                  )
                )}
              </MenuItems>
            </Transition>
          </Menu>
          {bottomNavigation.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className="uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group"
            >
              {title}
              <span className="inline-flex w-full h-[1px] bg-whiteText absolute -bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Header;
