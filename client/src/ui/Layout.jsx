import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
      <>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" reverseOrder={false} gutter={8} containerClassName="" toastOptions={{style: {background: "black", color: "white"}}}/>
      </>
    );
  };
  export default Layout;
  