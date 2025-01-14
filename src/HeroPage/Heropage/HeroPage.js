import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";
import { Loader } from "../Loader/Loader";
import MenuPage from "../MenuPage/MenuPage";

const HeroPage = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <MenuPage />
      <Loader />
      <Footer />
    </>
  );
};

export default HeroPage;
