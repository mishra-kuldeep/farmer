import React from "react";
import slider1 from "../../public/slider/slider1.jpg";
import slider2 from "../../public/slider/slider2.jpg";
import slider3 from "../../public/slider/slider3.png";
import "./slider.css";

const Slider = () => {
  return (
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ borderRadius: "0px 0px 10px 10px", overflow: "hidden" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/06/09/31/24/360_F_609312487_cnMcTSARF8C4RMMDqkjkYxBBWE3MUH69.jpg"
              className="d-block w-100 sliderImage"
              alt="slider1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.pikbest.com/wp/202413/plant-silhouette-farm-organic-fruit-web-banner_6080030.jpg!bw700"
              className="d-block w-100 sliderImage"
              alt="slider2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i0.wp.com/eos.org/wp-content/uploads/2024/02/Bellin-Featured-Image-Final.png?fit=1200%2C675&ssl=1"
              className="d-block w-100 sliderImage"
              alt="slider3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
   
  );
};

export default Slider;
