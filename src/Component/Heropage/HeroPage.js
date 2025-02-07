import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import MenuPage from "../MenuPage/MenuPage";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Marquee from "../MarqueeSlider/Marquee";

const HeroPage = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Marquee />
      <MenuPage />
      <Loader />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HeroPage;
