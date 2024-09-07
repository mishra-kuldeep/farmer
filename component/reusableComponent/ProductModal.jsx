import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../../app/product/[...slug]/productPage.css";
import ConfirmModel from "./ConfirmModel";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import toast from "react-hot-toast";
import { Image_URL } from "@/helper/common";
import IconButton from "./IconButton";

const ProductModal = ({
  modalData,
  brandList,
  categoryList,
  subCategoryList,
  setActionPerformed,
}) => {
  const imageContainerRef = useRef(null);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [ImageList, setImageList] = useState("");
  const [loading, setloading] = useState(false);
  const [Index, setIndex] = useState(0);

  const onConfirmHandeler = () => {
    if (actionType == "approve") {
      setloading(true);
      ProductFarmerServices.approveProductsFarmer(modalData?.productDtlId)
        .then(({ data }) => {
          setloading(false);
          setConfirm(false);
          setActionPerformed(true);
          toast(data?.message, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "green",
              color: "#fff",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          setConfirm(false);
        });
    }
    if (actionType == "reject") {
      setloading(true);
      ProductFarmerServices.rejectProductsFarmer(modalData?.productDtlId)
        .then(({ data }) => {
          toast(data?.message, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "green",
              color: "#fff",
            },
          });
          setloading(false);
          setConfirm(false);
          setActionPerformed(true);
        })
        .catch((err) => {
          console.log(err);
          setConfirm(false);
        });
    }
  };
  const onCancelHandeler = () => {
    setConfirm(false);
  };

  const scrollHandeler = (direction) => {
    const scrollAmount = 120; // Scroll amount is 120px
    if (imageContainerRef.current) {
      if (direction === "up") {
        imageContainerRef.current.scrollBy({
          top: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "down") {
        imageContainerRef.current.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }

  useEffect(() => {
    setImageList([])
    if (modalData?.productDtlId) {
      ProductFarmerServices.getAllImage(modalData?.productDtlId).then(
        ({ data }) => {
          setImageList(data?.images);
        }
      );
    }
  }, [modalData?.productDtlId]);

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Verify Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="product_basic_detail">
                  <div className="product_imageList">
                    <div
                    style={{flexDirection: "column", height: "75vh", overflowY: "auto" }}
                      className="d-flex align-items-center py-2"
                    >
                      {ImageList?.length > 0 &&
                        ImageList?.map((image, i) => (
                          <img
                            src={`${Image_URL}/Products/${image.url}`}
                            alt="image"
                            key={i}
                            onClick={() => setIndex(i)}
                            className="cursor"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="product_singleImage">
                    <img
                      src={`${Image_URL}/Products/${ImageList[Index]?.url}`}
                      alt="image"
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div className="product_details">
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <h6>Product Name</h6>
                          </td>
                          <td>{modalData?.productDtlName}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Product Dicription</h6>
                          </td>
                          <td>{modalData?.productDtl}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Product Price</h6>
                          </td>
                          <td>{modalData?.price}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Discount</h6>
                          </td>
                          <td>
                            {modalData?.discount} {modalData?.discountType}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Product Quantity</h6>
                          </td>
                          <td>{modalData?.quantity}</td>
                        </tr>
                     
                        <tr>
                          <td>
                            <h6>Unit</h6>
                          </td>
                          <td>{modalData?.unit}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Slug</h6>
                          </td>
                          <td>{modalData?.slug}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Brand</h6>
                          </td>
                          <td>
                            {
                              brandList.filter(
                                (elem) =>
                                  elem.brandId == modalData?.Product?.brand
                              )[0]?.brandName
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Category</h6>
                          </td>
                          <td>
                            {
                              categoryList.filter(
                                (elem) =>
                                  elem.categoryId ==
                                  modalData?.Product?.category
                              )[0]?.categoryName
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>Sub Category</h6>
                          </td>
                          <td>
                            {
                              subCategoryList.filter(
                                (elem) =>
                                  elem.subcategoryId ==
                                  modalData?.Product?.subCategory
                              )[0]?.subcategoryName
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-around">
              <button
                type="button"
                className="btn btn-success w-25"
                onClick={() => {
                  setConfirm(true);
                  setMessage(
                    "Are you sure to approve this product succesfully!"
                  );
                  setActionType("approve");
                }}
              >
                Approve it
              </button>
              <button
                type="button"
                className="btn btn-danger w-25"
                onClick={() => {
                  setConfirm(true);
                  setMessage(
                    "Are you sure to reject this product succesfully!"
                  );
                  setActionType("reject");
                }}
              >
                Reject it
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModel
        show={confirm}
        onConfirm={onConfirmHandeler}
        onCancel={onCancelHandeler}
        message={message}
        loading={loading}
      />
    </>
  );
};

export default ProductModal;
