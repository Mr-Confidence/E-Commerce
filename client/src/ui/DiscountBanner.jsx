import Container from './Container';
import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import { 
  brandOne, 
  brandTwo, 
  brandThree, 
  brandFour, 
  brandFive, 
  brandSix, 
  discountImgOne, 
  discountImgTwo 
} from '../assets';

const DiscountBanner = () => {
    const popularSearchItems = [
        { title: "Smart Watches", link: "smartWatches" },
        { title: "Headphone", link: "headphones" },
        { title: "Cameras", link: "camerasAndPhotos" },
        { title: "Audio", link: "tvAndAudio" },
        { title: "Laptop & Computers", link: "computersAndLaptop" },
        { title: "Cell Phone", link: "cellPhones" },
    ];

    const brands = [
        { id: 1, image: brandOne },
        { id: 2, image: brandTwo },
        { id: 3, image: brandThree },
        { id: 4, image: brandFour },
        { id: 5, image: brandFive },
        { id: 6, image: brandSix },
    ];

    return (
        <Container>
            {/* Popular Search Section */}
            <div>
                <Title text="Popular Search"/>
                <div className="w-full h-[1px] bg-gray-200 mt-3" />
            </div>
            <div className='my-7 flex items-center flex-wrap gap-4'> 
                {popularSearchItems.map((item, index) => (
                    <Link
                        key={index}
                        to={`/category/${item.link}`}
                        className="border border-gray-300 px-4 md:px-8 py-2 md:py-3 rounded-full capitalize font-medium hover:bg-black hover:text-white duration-200"
                    >
                        {item.title}
                    </Link>
                ))}
            </div>

            {/* Discount Banner Section */}
            <div className='w-full py-5 md:py-0 my-12 bg-[#f6f6f6] rounded-lg flex flex-col md:flex-row items-center justify-between overflow-hidden'>
                <img 
                    src={discountImgOne} 
                    alt="Discount offer" 
                    className='hidden lg:inline-flex h-36' 
                />                
                <div className='flex flex-col flex-1 gap-1 items-center p-4 text-center'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-x-3 text-xl md:text-4xl font-bold'>
                        <h2>Sony Headphone</h2>
                        <Link 
                            to="/product" 
                            className='border border-red-600 px-4 py-2 text-xl md:text-3xl text-red-600 rounded-full hover:bg-red-600 hover:text-white duration-200'
                        >
                            Discount 20%
                        </Link>
                    </div>
                    <p className='text-sm text-gray-600 font-medium mt-2'>
                        Out to play with the world or shape it—depends on the moment.
                    </p>
                </div>
                <img 
                    src={discountImgTwo} 
                    alt="Discount offer" 
                    className='hidden lg:inline-flex h-36' 
                />
            </div>

            {/* Brands Section */}
            <div className='mt-7'>
                <p className='font-bold text-2xl'>Brands We Distribute</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-7'>
                    {brands.map((brand, index) => (
                        <div 
                            key={brand.id}
                            className={`border border-gray-300 ${index !== brands.length - 1 ? 'border-r-0' : ''} flex items-center justify-center px-6 py-4 cursor-pointer group hover:bg-gray-100 duration-200`}
                        >
                            <img 
                                src={brand.image} 
                                alt={`Brand ${brand.id}`} 
                                className='w-36 h-auto group-hover:opacity-70 duration-200' 
                            /> 
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default DiscountBanner