// "use client";
// import React, { useState } from "react";
// import "./section1home.css";
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";
// import { FaStar } from "react-icons/fa";
// import { FaRegBookmark } from "react-icons/fa";
// import product1 from "../../../public/product/apple.jpg";

// const Section1Home = () => {
//   const [limit, setLimit] = useState({
//     min: 0,
//     max: 4,
//   });
//   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
//   return (
//     <div className="container">
//       <div className="bestSellerWrapper">
//         <div className="headerbestSeller">
//           <h5>Best Sellers</h5>
//           <div className="arrowBtn_bestSeller">
//             <p className="Show_More_bestSeller">Show More</p>
//             <button>scroll</button>
//             <p
//               className="next_btn_bestSeller"
//               onClick={() =>
//                 setLimit({ min: limit.min - 2, max: limit.max - 2 })
//               }
//             >
//               <IoIosArrowBack />
//             </p>
//             <p
//               className="next_btn_bestSeller"
//               onClick={() =>
//                 setLimit({ min: limit.min + 2, max: limit.max + 2 })
//               }
//             >
//               <IoIosArrowForward />
//             </p>
//           </div>
//         </div>
//         <div className="bestseller_cards_wrap">
//           <div className="row dd m-0">
//             {array.map((ele) => (
//               <div className="col-md-3 p-2">
//                 <div className="bestseller_cards">
//                   <div className="image_div">
//                     <img src={product1.src} alt="product image" />
//                   </div>
//                   <h6 className="mt-2">Seasonal Fruit & Vegetable</h6>
//                   <div className="rating_wrap">
//                     <p className="centerAllDiv rating">
//                       <span className="fw-bold">4.2</span>
//                       <FaStar size={10} className="ms-1" />
//                     </p>
//                     <span className="rating_unit">210 Ratings</span>
//                   </div>
//                   <h5>{ele}</h5>
//                   <h5 className="mt-2 fw-bold">
//                     ₹ 199
//                     <sub>
//                       <del className="text-secondary fw-light">₹299</del>
//                     </sub>
//                   </h5>
//                   <div className="d-flex justify-content-between">
//                     <button
//                       className="bookmark_btn"
//                       data-bs-toggle="tooltip"
//                       data-bs-placement="bottom"
//                       title="Save for Later"
//                     >
//                       <FaRegBookmark />
//                     </button>
//                     <button
//                       className="addtoCart_btn"
//                       data-bs-toggle="tooltip"
//                       data-bs-placement="bottom"
//                       title="Save for Later"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Section1Home;
"use client";
import React, { useRef } from "react";
import "./section1home.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import product1 from "../../../public/product/apple.jpg";
import { isMobile } from "react-device-detect";

const Section1Home = () => {
  const scrollContainerRef = useRef(null);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= isMobile?containerWidth:containerWidth*50/100;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += isMobile?containerWidth:containerWidth*50/100;
      }
    }
  };

  return (
    <div className="container">
      <div className="bestSellerWrapper">
        <div className="headerbestSeller">
          <h5>Best Sellers</h5>
          <div className="arrowBtn_bestSeller">
            <p className="Show_More_bestSeller">Show More</p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("left")}
            >
              <IoIosArrowBack />
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("right")}
            >
              <IoIosArrowForward />
            </p>
           
          </div>
        </div>
        <div
          className="bestseller_cards_wrap dd row m-0"
          ref={scrollContainerRef}
        >
          {array.map((ele) => (
            <div className="col-md-3 p-2 col-6" key={ele}>
              <div className="bestseller_cards">
                <div className="image_div">
                  <img src={product1.src} alt="product image" />
                </div>
                <h6 className="mt-2">Seasonal Fruit & Vegetable</h6>
                <div className="rating_wrap">
                  <p className="centerAllDiv rating">
                    <span className="fw-bold">4.2</span>
                    <FaStar size={10} className="ms-1" />
                  </p>
                  <span className="rating_unit">210 Ratings</span>
                </div>
                <h5>{ele}</h5>
                <h5 className="mt-2 fw-bold">
                  ₹ 199
                  <sub>
                    <del className="text-secondary fw-light">₹299</del>
                  </sub>
                </h5>
                <div className="d-flex justify-content-between">
                  <button
                    className="bookmark_btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Save for Later"
                  >
                    <FaRegBookmark />
                  </button>
                  <button
                    className="addtoCart_btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Save for Later"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1Home;
