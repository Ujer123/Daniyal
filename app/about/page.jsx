import React from 'react'
import AboutBanner from '@/components/About/AboutBanner'
import About1 from '@/components/About/About1'
import Services from '@/components/About/Services'
import Banner from '@/components/Home/Banner'
import { TestimonialCard } from '@/components/About/TestimonialCard'
import NewsLetter from '@/components/Home/NewsLetter'

const About = () => {
  return (
    <>
      <AboutBanner/>
      <div className="px-6 md:px-16 lg:px-32">
        <About1/>
        <Services/>
        <Banner/>
        <TestimonialCard/>
      </div>
      <NewsLetter/>
    </>
  )
}

export default About
