import React from "react";
import palak from "../../public/product/palak1.jpg"

const AboutTheProduct = ({ about }) => {
  return (
    <div className="aboutProductWrapper p-md-4 p-2 mt-2">
      <h5>About the Product</h5>
      <p>{about}</p>
    </div>
  );
};

export default AboutTheProduct;
