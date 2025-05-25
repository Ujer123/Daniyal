import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FaHouseChimney } from "react-icons/fa6";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const Banner = () => {
  
  return (
    <>
    <section className="relative h-96 w-full">
        <Image
          src={assets.perfumesbanner}
          alt="About Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white text-center">
            About Daniyal Perfumes
             <Breadcrumb>
      <BreadcrumbList className="text-white place-self-center mt-4">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex gap-2"><FaHouseChimney className="mt-0.5"/>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='text-white'>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
          </h1>
        </div>
      </section>
      <div className="bg-gray-300 flex justify-around py-3">
        <Image
          src={assets.paraben}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
        <Image
          src={assets.silicon}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
        <Image
          src={assets.non}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
        <Image
          src={assets.cruelty}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
        <Image
          src={assets.sulphate}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
        <Image
          src={assets.natural}
          alt="About Banner"
          className="max-w-full h-auto"
          priority
        />
      </div>
    </>
  );
};

export default Banner;