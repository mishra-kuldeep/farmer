import React from "react";
import palakImage from "../../public/product/palak.jpg";
import palakImage1 from "../../public/product/palak1.jpg";
import "../../app/product/[...slug]/productPage.css";

const ProductModal = ({ modalData }) => {
  const imagelist = [
    palakImage,
    palakImage,
    palakImage,
    palakImage,
    palakImage,
  ];
  console.log(modalData);
  return (
    <>
      {/* <button
        type="button"
        class="btn btn-primary"
      
      >
        Launch demo modal
      </button> */}

      <div
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Verify Product
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <div className="product_basic_detail">
                  <div className="product_imageList">
                    {imagelist.map((image, i) => (
                      <img src={image.src} alt="image" key={i} />
                    ))}
                  </div>
                  <div className="product_singleImage">
                    <img src={palakImage1.src} alt="image" />
                  </div>
                  <div className="product_details">
                   <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-around">
              <button
                type="button"
                class="btn btn-success w-25"
                data-bs-dismiss="modal"
              >
                Approve it
              </button>
              <button type="button" class="btn btn-danger w-25">
                Reject it
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
