import Container  from "./Container";
import React from 'react'
import { homeBanner } from '../assets'
import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <Container className="relative py-5 overflow-hidden">
  <div className="relative">
    <img
      src={homeBanner}
      alt="homepage Promotional Banner"
      className="w-full h-full object-cover rounded-md"
    />
    <div className="absolute inset-0 bg-black/15 z-10" />
    <div className="absolute inset-0 flex flex-col justify-center px-10">
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold">MSI Raider GE68 HX</h2>
      <p className="text-base md:text-lg font-semibold leading-8 max-w-[250px] mt-5">The beast monster of the gaming world you can boast of without any challenger</p>
      <LinkButton className="w-44 flex items-center justify-center bg-whiteText text-darkText hover:bg-maronText hover:text-whiteText duration-200 mt-4" />
    </div>
  </div>
</Container>

  )
}

export default HomeBanner