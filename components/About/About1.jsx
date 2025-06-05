import { assets } from "@/assets/assets"
import Image from "next/image"

const About1 = () => {
  return (
    <>
      <div className="grid grid-cols-12 my-7 items-center gap-4">
                          <div className="lg:col-span-7">
                   <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our <span className="text-orange-600">Story</span>
              </h2>
              <div className="border-b-2 border-orange-600 w-32 mt-4" />
            </div>
                            <p>Welcome to Daniyal Perfume, where we believe that a fragrance is more than just a scent—it's a statement of individuality and an extension of your personality. Founded with a passion for creating exceptional fragrances, Daniyal Perfume aims to offer a collection that resonates with diverse preferences and lifestyles.</p>
                            <p className="pt-2">At Daniyal, we understand the profound connection between scent and emotion. Each fragrance in our collection is meticulously crafted, inspired by the beauty of nature and the vibrancy of life. Our perfumes encapsulate unique stories and experiences, inviting you to embark on a sensory journey every time you wear them.</p>
                          </div>
        <div className="lg:col-span-5">
        <Image
                          src={assets.about_1}
                          alt="About us"
                          className="max-w-full h-auto rounded-lg"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          </div>
      </div>
      <div className="grid grid-cols-12 my-7 items-center gap-4">
        <div className="lg:col-span-3 bg-slate-300 rounded-lg text-center p-7 h-full">
            <h3 className="text-black font-medium text-lg">Our Vision</h3>
            <p className="text-sm">We aspire to redefine the fragrance experience by offering high-quality, affordable perfumes that speak to the heart.</p>
            </div>
        <div className="lg:col-span-3 bg-slate-300 rounded-lg text-center p-7 h-full">
            <h3 className="text-black font-medium text-lg">Our Collection</h3>
            <p className="text-sm">From bold and adventurous to soft and subtle, our diverse range of perfumes caters to everyone.</p>
        </div>
        <div className="lg:col-span-3 bg-slate-300 rounded-lg text-center p-7 h-full">
            <h3 className="text-black font-medium text-lg">Quality & Craftsmanship</h3>
            <p className="text-sm">Our skilled artisans blend these elements with precision to create fragrances that are not only captivating but also long-lasting.</p>
        </div>
        <div className="lg:col-span-3 bg-slate-300 rounded-lg text-center p-7 h-full">
            <h3 className="text-black font-medium text-lg">Join Our Journey</h3>
            <p className="text-sm">Follow us on social media, subscribe to our newsletter, and experience the world of Daniyal Perfume.</p>
        </div>
      </div>
    </>
  )
}

export default About1
