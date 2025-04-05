import Container  from "./Container";
import React from 'react'
import { homeBanner } from '../assets'
import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <Container className="relative py-5 overflow-hidden">
        <div className='relative'>
            <img src={homeBanner} alt="homepage Promotional Banner"  className="w-full h-full object-cover rounded-md"/>
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-black/15"/>
        <div>
            <h2>MSI Raider GE68 HX</h2>
            <p>The monster beast of the gaming world</p>
            <LinkButton className="w-44 flex items-center justify-center bg-whiteText text-darkText hover:bg-darkText hover:text-whiteText duration-200 mt-4" />        </div>
    </Container>
  )
}

export default HomeBanner