import React, { useEffect } from "react";
import MainCarousel from "../../customers/components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../customers/components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../Data/Men/men_kurta";
import { mens_jeans } from "../../Data/Men/men_jeans";
import { mens_shirt } from "../../Data/Men/men_shirt";
import { lehngacholiPage2 } from "../../Data/Saree/lenghaCholiPage2";
import { useDispatch, useSelector } from "react-redux";
import { getHomeProducts } from "../../customers/HomeState/HomeActions";

const Home = () => {
  useEffect(() => {
    document.title = "Zentric ";
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeProducts());
  }, [dispatch]);

  const { sections } = useSelector((state) => state.homeProducts);

  // console.log("sections", sections);

  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20">
        <HomeSectionCarousel
          data={sections.mens_kurta?.content}
          sectionName="Men's Kurta"
        />
        <HomeSectionCarousel
          data={sections.saree?.content}
          sectionName="Saree"
        />
        <HomeSectionCarousel
          data={sections.mens_shirts?.content}
          sectionName="Men's Shirts"
        />
        <HomeSectionCarousel
          data={sections.lehenga?.content}
          sectionName="Lehenga"
        />
        <HomeSectionCarousel
          data={sections.mens_jeans?.content}
          sectionName="Men's Jeans"
        />
      </div>
    </div>
  );
};

export default Home;
