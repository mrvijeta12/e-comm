import React, { useState, useMemo, useCallback, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const responsive = {
  0: { items: 1 },
  564: { items: 2 },
  768: { items: 3 },
  1024: { items: 4.5 },
};

const HomeSectionCarousel = ({ data = [], sectionName }) => {
  // console.log("data", data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  /* ---------------- Visible items (responsive) ---------------- */
  const calculateVisibleItems = useCallback(() => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 576) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(calculateVisibleItems());
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateVisibleItems]);

  /* ---------------- Prevent re-rendering items ---------------- */
  const items = useMemo(() => {
    return data?.map((item, index) => (
      <HomeSectionCard key={item.id ?? index} item={item} />
    ));
  }, [data]);

  const totalItems = items?.length;

  /* ---------------- Stable handlers ---------------- */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const syncActiveIndex = useCallback(({ item }) => {
    setCurrentIndex(item);
  }, []);

  /* ---------------- Button logic ---------------- */
  const isPrevDisabled = currentIndex === 0;

  const isNextDisabled = currentIndex >= totalItems - visibleItems;

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl text-gray-800 font-extrabold mb-3">
        {sectionName}
      </h2>
      <div className="relative border border-gray-300 py-4">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          activeIndex={currentIndex}
          onSlideChanged={syncActiveIndex}
        />

        {/* Prev Button */}
        {!isPrevDisabled && (
          <button
            onClick={prevSlide}
            className="z-50 absolute top-1/2 left-0
              -translate-x-1/2 -translate-y-1/2
              bg-white shadow-lg p-3 flex items-center justify-center
              hover:bg-black hover:text-white rounded-lg"
          >
            <ArrowBackIosIcon />
          </button>
        )}

        {/* Next Button */}
        {!isNextDisabled && (
          <button
            onClick={nextSlide}
            className="z-50 absolute top-1/2 right-0
              translate-x-1/2 -translate-y-1/2
              bg-white shadow-lg p-3 flex items-center justify-center
              hover:bg-black hover:text-white rounded-lg"
          >
            <ArrowForwardIosIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(HomeSectionCarousel);
