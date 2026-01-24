import React from "react";
import { Carousel } from "react-bootstrap";
import "./slider.css";

const Slider = () => {
  return (
    <div style={{ borderRadius: "0px 0px 10px 10px", overflow: "hidden" }}>
      <Carousel interval={3000} controls={true} indicators={true} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 sliderImage"
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80"
            alt="Fresh from the Farm"
          />
          <Carousel.Caption className="d-none d-md-block">
            <h5>Fresh from the Farm</h5>
            <p>Experience the taste of freshly harvested organic produce.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 sliderImage"
            src="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=1200&q=80"
            alt="Support Local Farmers"
          />
          <Carousel.Caption className="d-none d-md-block">
            <h5>Support Local Farmers</h5>
            <p>Directly connect with the hands that feed you.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 sliderImage"
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
            alt="Best Seasonal Fruits"
          />
          <Carousel.Caption className="d-none d-md-block">
            <h5>Best Seasonal Fruits</h5>
            <p>Enjoy nature's candy at its peak sweetness.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
