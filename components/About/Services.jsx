import React from 'react'

const ServiceCard = ({ title, description, borderColor, bgColor }) => (
      <div className="relative h-full">
        <span
          className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${bgColor} rounded-lg`}
        ></span>
        <div
          className={`relative h-full p-5 bg-white border-2 ${borderColor} rounded-lg`}
        >
          <h3 className="my-2 text-lg font-bold text-gray-800">{title}</h3>
          <p className={`mt-3 mb-1 text-xs font-medium ${borderColor} uppercase`}>
            ------------
          </p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );

const Services = () => {
    const services = [
  {
    title: "Signature Scent Creation",
    description:
      "Craft your unique olfactory identity. Our expert perfumers guide you through a bespoke journey, blending exquisite notes to compose a fragrance that truly reflects your essence and style.",
    borderColor: "border-indigo-500",
    bgColor: "bg-indigo-500",
  },
  {
    title: "Fragrance Consultation",
    description:
      "Discover your perfect match. Our personalized consultation helps you navigate our diverse collection, identifying scents that resonate with your preferences, mood, and occasion.",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500",
  },
  {
    title: "Perfume Refill & Customization",
    description:
      "Extend the life of your favorite bottle. We offer eco-friendly refill services and subtle customization options to refresh or personalize your beloved fragrance.",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-400",
  },
  {
    title: "Scented Product Development",
    description:
      "Beyond the bottle, infuse your brand or space with bespoke aromas. We create custom scents for candles, diffusers, body care, and other luxurious products.",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-400",
  },
  {
    title: "Luxury Gifting & Engraving",
    description:
      "Elevate your gift-giving with a personal touch. Choose from our curated perfume sets, luxurious packaging, and custom bottle engraving for an unforgettable present.",
    borderColor: "border-green-500",
    bgColor: "bg-green-500",
  },
];
  return (
    <section className="relative flex flex-col justify-between h-full w-full mx-auto px-0 mt-16 container">
      <div className="w-fit mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900">
          Our <span className="text-orange-600 font-bold">Services</span>
        </h2>
        <div className="border-b-2 border-orange-600 w-[80%] mx-auto my-4"></div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-800 mb-12 max-w-2xl mx-auto">
        Here are a few of the awesome services we provide.
      </p>

      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {services.slice(0, 2).map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:py-16 py-6">
        {services.slice(2).map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  )
}

export default Services
