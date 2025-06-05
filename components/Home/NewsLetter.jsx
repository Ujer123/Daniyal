import { assets } from "@/assets/assets";
import Image from "next/image";

const NewsLetter = () => {
  return (
    <>
    <section className="relative h-72 w-full">
      <Image
                src={assets.bottomBg}
                alt="About Banner"
                fill
                className="object-cover object-center"
                priority
              />
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14 absolute inset-0 bg-black/70">
      <h1 className="md:text-4xl text-2xl font-medium text-white">
        Stay Updated with Latest Fragrances
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8 text-white">
        Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fragrance tips.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          />
        <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
          Subscribe
        </button>
      </div>
    </div>
                </section>
          </>
  );
};

export default NewsLetter;
