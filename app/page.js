"use client"
import Section1Home from "@/component/homepage/section1/Section1Home";
import Section2Home from "@/component/homepage/section2/Section2Home";
import Section3Home from "@/component/homepage/section3/Section3Home";
import Section4Home from "@/component/homepage/section4/Section4Home";
import Slider from "@/component/slider/Slider";
import { useEffect, useState } from "react";

export default function Home() {
  const[isMobile,setIsMobile] = useState(false)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    checkScreenSize();
    // window.addEventListener("resize", checkScreenSize);
  
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  return (
    <>
      {isMobile ? (
        <div className="">
          <Slider />
        </div>
      ) : (
        <div className="container">
          <Slider />
        </div>
      )}
      <Section2Home />
      <Section1Home />
      <Section3Home />
      {/* <Section4Home/> */}
    </>
  );
}
