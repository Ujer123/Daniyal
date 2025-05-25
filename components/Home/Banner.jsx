import { assets } from "@/assets/assets";
import Image from "next/image";
import { IoFlaskOutline,IoGiftOutline,IoDiamondOutline } from "react-icons/io5";
import { BsDroplet,BsClock,BsHeart } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-14 md:py-0 bg-[#DEFCFF] my-16 rounded-xl overflow-hidden">
      <div className="space-y-10 lg:space-y-32 ps-10">
        <div className="flex gap-5">
          <BsDroplet size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Exquisite Scents</h5>
          <p>Discover a collection of luxurious and captivating fragrances</p>
          </div>
        </div>
        <div className="flex gap-5">
          <BsClock size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Long-Lasting</h5>
          <p>Enjoy all-day freshness with our enduring formulas</p>
          </div>
        </div>
        <div className="flex gap-5">
          <IoFlaskOutline size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Premium Ingredients</h5>
          <p>Adom your vanity with our beautifully crafted designs</p>
          </div>
        </div>
      </div>
     
      <Image
        className="max-w-100 h-auto"
        src={assets.home1}
        alt="md_controller_image"
      />
      <div className="space-y-10 lg:space-y-32 pe-10">
        <div className="flex gap-5">
          <IoGiftOutline size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Perfect for Any Occasion</h5>
          <p>Find the ideal fragrance for every moment and mood</p>
          </div>
        </div>
        <div className="flex gap-5">
          <BsHeart size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Connect and Charm</h5>
          <p>Forge deeper connections with a scent that invites closeness.</p>
          </div>
        </div>
        <div className="flex gap-5">
          <IoDiamondOutline size={32} className="text-orange-600"/>
          <div className="max-w-xs">
          <h5 className="font-semibold">Wellness from Nature</h5>
          <p>Crafted exclusively from the purest botanical extracts and essential oils.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Banner;