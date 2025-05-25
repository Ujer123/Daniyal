import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/Home/HomeProducts";
import Banner from "@/components/Home/Banner";
import NewsLetter from "@/components/Home/NewsLetter";
import FeaturedProduct from "@/components/Home/FeaturedProduct";
import AboutUs from "@/components/About/AboutUs";
import Services from "@/components/About/Services";
import { TestimonialCard } from "@/components/About/TestimonialCard";


const Home = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts/>
        <AboutUs/>
        <Services/>
        {/* <FeaturedProduct /> */}
        <Banner />
        <TestimonialCard/>
        {/* <NewsLetter /> */}
      </div>
    </>
  );
};

export default Home;
