import React from "react";
import "./basket.css";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import imagee from "../../public/product/palak1.jpg";
const array = [1, 2, 3, 4, 5, 6, 7];

const basket = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="productlistWrapper">
            {/* {array?.map((val)=>{ */}
            {/* // return  */}
            <div className="cardBasket">
              <img src={imagee.src} alt="image" />
              <div className="cartBaketDetail">
              <div>
                <h6>Cauliflower</h6>
                <h6>₹ 80</h6>
              </div>
              <div>
                <h6>Quantity</h6>
                <div className="quantitywrap">
                  <span className="minus">
                    <FaMinus size={15}/>
                  </span>
                  <span>1</span>
                  <span className="plus">
                    <FaPlus size={15}/>
                  </span>
                </div>
              </div>

              <div>
                <h6>Sub Total</h6>
                <h6>₹ 80</h6>
              </div>
            </div></div>
            {/* })} */}
          </div>
        </div>
        <div className="col-md-3">
          <div className="detailWrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default basket;
