import { assets } from "@/assets/assets";
import Image from "next/image";
import { TbPhoneCall } from "react-icons/tb";
import { FaRegEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.LogoRemove} alt="logo" />
          <p className="mt-6 text-sm text-gray-300">
            Daniyal Perfumes are good and nice with long lasting fragrance Use this example to show an advanced settings bar with filter and sorting options and then a list
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-orange-600 mb-5">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-300 hover:text-orange-600 transition-colors" href="#">Home</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-orange-600 transition-colors" href="#">About us</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-orange-600 transition-colors" href="#">Contact us</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-orange-600 transition-colors" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-orange-600 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
            <a href="tel:+919136767042" className="flex text-gray-300"><TbPhoneCall size={17} className="text-orange-600 mr-2"/>+91 9136767042</a>
            <a href="mailto:ujermohd0@gmail.com" className="flex text-gray-300"><FaRegEnvelope size={17} className="text-orange-600 mr-2"/>ujermohd0@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-300">
        Copyright 2025 © Ujer<span className="text-orange-600"> All Right Reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;