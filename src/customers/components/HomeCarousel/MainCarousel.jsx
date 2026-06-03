import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";

const items = mainCarouselData.map((item) => (
  <img
    src={item.src}
    // className="cursor-pointer min-w-[350px] sm:max-h-[550px] w-full"
    className="cursor-pointer w-full h-[300px] sm:h-[550px] object-cover object-top"
    alt=""
  />
));

const MainCarousel = () => {
  return (
    <AliceCarousel
      items={items}
      mouseTracking
      controlsStrategy="alternate"
      className="h-full"
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
};

export default MainCarousel;
