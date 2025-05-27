'use client'
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { assets } from "@/assets/assets";
import Image from "next/image";

const testimonials = [
  {
    name: "Rohan P.",
    rating: 4,
    text: "The 'Forest Whisper' scent from Daniyal Perfumes is incredibly calming and sophisticated. It's my go-to for work and evening events – never overpowering, just perfectly balanced. The natural ingredients really make a difference.",
  },
  {
    name: "Priya V.",
    rating: 5,
    text: "The fragrance consultation service at Daniyal Perfumes was a game-changer! I finally found my signature scent, 'Luna Dew,' which perfectly matches my personality. The longevity is impressive, and the aroma is simply divine. Highly recommend Daniyal Perfumes!",
  },
  {
    name: "Liam K.",
    rating: 4,
    text: "I was looking for something distinct and discovered 'Solstice Nectar' from Daniyal Perfumes. It's so fresh and uplifting, perfect for everyday wear. I appreciate that it's made with natural ingredients, and it feels very light on the skin.",
  },
  {
    name: "Meera D.",
    rating: 5,
    text: "The bespoke scent creation workshop at Daniyal Perfumes was an unforgettable experience. I created a perfume that is truly 'me.' The quality of their essential oils is superb, and the team is incredibly knowledgeable and passionate. Worth every penny!",
  },
  {
    name: "Omar F.",
    rating: 5,
    text: "Daniyal Perfumes consistently delivers exceptional quality. Their 'Desert Rain' is unlike anything else on the market – unique, sophisticated, and it lasts all day. This is now my favorite fragrance brand.",
  },
];

export function TestimonialCard() {
  const [expand, setExpand] = useState(null);

  const toggleExpand =(index)=>{
    setExpand(expand === index ? null : index)
  }

  const getPreviewText = (text)=>{
    const words = text.split(" ")
    return words.length > 25 ? words.slice(0, 19).join(" ")+ "..." : text;
  }
  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          See what our <span className="text-orange-600">Clients says!</span>
        </h2>
        <div className="border-b-2 border-orange-600 w-32 mt-4 place-self-center" />
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-5/6 place-self-center px-6 py-12 text-center bg-white flex justify-center items-center"
      >
        <CarouselContent>
          {testimonials.map((t, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="aspect-auto text-left p-6 bg-[#DEFCFF]">
                    <h3 className="text-base font-semibold">{t.name}</h3>
                    <div className="flex gap-2 my-1">
                      <p className="text-xs">{4.5}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                              index < Math.floor(4)
                                ? assets.star_icon
                                : assets.star_dull_icon
                            }
                            alt="star_icon"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      {expand === index ? t.text : getPreviewText(t.text)}{" "}
                       {t.text.split(" ").length > 25 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="text-orange-600 underline ml-1"
                        >
                          {expand === index ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
