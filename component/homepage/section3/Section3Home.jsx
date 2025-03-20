"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const cardArr = [
  {
    id: 1,
    title: "Agriculture Land",
    image:
      "https://plus.unsplash.com/premium_photo-1661900547591-80ee79e20d1c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmFsJTIwbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
    url: "/adverts/16"
  },
  {
    id: 2,
    title: "Plot",
    image:
      "https://images.unsplash.com/photo-1587745890135-20db8c79b027?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFuZCUyMHBsb3R8ZW58MHx8MHx8fDA%3D",
    url: "/adverts/17"
  },
  {
    id: 3,
    title: "Farm Land",
    image:
      "https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?cs=srgb&dl=pexels-pixabay-259280.jpg&fm=jpg",
    url: "/adverts/18"
  },
];

const cardArr2 = [
  {
    id: 1,
    title: "Cold Storage",
    image:
      "https://www.refconchillers.com/blog/wp-content/uploads/2024/02/industrial-cold-storage-refcon-chillers-india-1200x675.jpg",
    url: "/vender/4"
  },
  {
    id: 2,
    title: "Machinery",
    image:
      "https://i.pinimg.com/originals/b1/cf/4c/b1cf4ca4161c1a77d76af93bd8896ec5.jpg",
    url: "/vender/6"
  },
];

const Section3Home = () => {
  const boxRef1 = useRef([]);
  const boxRef2 = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

    gsap.from(boxRef1.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger:0.2,
      scrollTrigger: {
        trigger: boxRef1.current, // Element that triggers the animation
        start: "top 90%", // When the top of the element reaches 80% of the viewport
        end: "top 50%", // When the top reaches 30% of the viewport
        scrub: 1, // Smooth animation when scrolling
      },
    });
    gsap.from(boxRef2.current, {
      opacity: -1,
      y: 100,
      duration: 1,
      stagger:0.2,
      scrollTrigger: {
        trigger: boxRef1.current, // Element that triggers the animation
        start: "top 60%", // When the top of the element reaches 80% of the viewport
        end: "top 50%", // When the top reaches 30% of the viewport
        scrub: 1, // Smooth animation when scrolling
      },
    });
  });
  return (
    <>
      <div className="container">
        <div className="row">
          {/* ////////////  Farm Land service   ///////////////// */}
          <div className="col-md-7 ">
            <div style={{ backgroundColor: "var(--light)" }} className=" mt-2 border p-3 pb-0">
              <h5 className="mobilehome_title">Farm Land Services</h5>
              <div className="row overflowhiddenbutscroll " style={{overflowY:"hidden"}}>
                {cardArr.map((ele, i) => (
                  <div className="col-md-4 col-5  mb-3 px-2 px-md-3 " key={ele.id} ref={(e)=>(boxRef1.current[i]=e)}>
                    <Link href={`${ele.url}`} style={{ color: "inherit" }}>
                      <div className="section2cardHome">
                        <div className="image_div">
                          <img src={ele.image} alt="product image" />
                        </div>
                        <div className="section2cartTitle">
                          <span className="fw-bold">{ele.title}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ////////////  vender service   ///////////////// */}
          <div className="col-md-5">
            <div style={{ backgroundColor: "var(--light)" ,overflow:"hidden"}} className=" mt-2 border p-3">
              <h5 className="mobilehome_title">Vendor Services</h5>
              <div className="row overflowhiddenbutscroll" style={{overflow:"hidden"}}>
                {cardArr2.map((ele, i) => (
                  <div className="col-md-6 col-6 px-2 px-md-3" key={ele.id}  ref={(e)=>(boxRef2.current[i]=e)}>
                    <Link href={`${ele.url}`} style={{ color: "inherit" }}>
                      <div className="section2cardHome">
                        <div className="image_div">
                          <img src={ele.image} alt="product image" />
                        </div>
                        <div className="section2cartTitle">
                          <span className="fw-bold">{ele.title}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3Home;
