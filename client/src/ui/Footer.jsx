import React from "react";
import Container from "./Container";
import {payment} from "../assets";
import FooterTop from "./FooterTop";

function Footer() {
  return <div className="mt-10">
    <FooterTop />
    <Container className="flex flex-col md:flex-row items-center justify-between">
      <p>@ 2025 E-Commerce. All rights reserved.</p>
      <img src={payment} alt="payment-img" className="object-cover" />
    </Container>
  </div>;
}

export default Footer;
 