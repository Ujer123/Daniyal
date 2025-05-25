import React from 'react'
import Image from 'next/image'
import { assets } from "@/assets/assets";
import Link from 'next/link';

const AboutUs = () => {
  return (
    <>
      <section className="bg-[#DEFCFF] py-12 md:py-16 lg:py-20 rounded-lg mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                About <span className="text-orange-600">Daniyal Perfumes India</span>
              </h2>
              <div className="border-b-2 border-orange-600 w-32 mt-4" />
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              <strong>Daniyal Clothing Company</strong>, with its establishment in the <strong>year 2005</strong>,
              is earning huge accolades in the market for dealing in Fashion Jeans. With diligent efforts
              of <strong>Founder, Mr. Rashid Malik </strong>, the company is excellently
              catered to the needs of Fashion Jeans Lovers. The array includes Designer jeans in various fits
              like Skinny Jeans, Bootcut Jeans, Slim Jeans, Stretch Jeans, Straight Jeans, High Waisted Jeans,
              Ripped Jeans, Low Rise Jeans, and many more.
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              <strong>Infrastructure:</strong> Our state-of-the-art infrastructure is one of the vital
              elements of our staggering success. The production unit in Delhi, Quality control unit,
              packaging unit, warehousing facility, strong network, etc., all comprise our robust
              infrastructure. This has helped in quality and quantity production of the Denim Jeans that
              are a perfect match to the international standards.
            </p>
            <Link href='/about' className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">
              More About Us →
            </Link>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute rotate-[-10deg] top-0 left-0 right-0 bottom-0 border-[8px] border-white rounded-lg pointer-events-none z-0"></div>

            <div className="relative w-full h-full z-10">
            <Image
                  src={assets.allproduct}
                  alt="About us"
                  className="w-full h-full object-cover relative z-0 transform rotate-1 rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default AboutUs
