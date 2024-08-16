import React from "react";
import product1 from "../../../public/product/snaks1.jpg";
import product2 from "../../../public/product/snaks2.jpg";

const array = [1, 2, 3, 4];

const Section3Home = () => {
  return (
    <div className="container">
      <div className="section2Heading">
        <h5 className="mx-2">Beverages</h5>
      </div>
      <div className="row m-0 overflowhiddenbutscroll pb-3">
        {array.map((ele, i) => (
          <div className="col-md-3 col-7" key={i}>
            <div className="section2cardHome shadowcss">
              <div className="image_div">
                {<img src={product1.src} alt="product image" />}
              </div>
              <div className="p-2">
                <span className="fw-bold">Namkeen and Bicuits</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3Home;
