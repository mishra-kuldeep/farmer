import React, { useEffect, useRef, useState } from "react";
import "../../app/product/[...slug]/productPage.css";
import ConfirmModel from "./ConfirmModel";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import toast from "react-hot-toast";
import { Image_URL } from "@/helper/common";
import IconButton from "./IconButton";
import ProductUnitServices from "@/services/ProductUnitServices";

const ProductModal = ({
  modalData,
  brandList,
  categoryList,
  subCategoryList,
  setActionPerformed,
}) => {
  const closeButtonRef = useRef(null);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [ImageList, setImageList] = useState("");
  const [loading, setloading] = useState(false);
  const [Index, setIndex] = useState(0);

  const [unitTitle, setUnitTitle] = useState("");

  const [slug, setSlug] = useState("");
  const [slugerror, setslugerror] = useState("");
  const [reviewerror, setreviewerror] = useState("");
  const [metaTitle, setmetaTitle] = useState("");
  const [metaDescription, setmetaDescription] = useState("");
  const [review, setreview] = useState("");

  const onConfirmHandeler = () => {
    const specialCharRegex = /[^a-zA-Z0-9\s-]/;
    const formattedSlug = slug.toLowerCase().replace(/['\s]+/g, "-");
    const data = {
      slug,
      review,
      metaTitle,
      metaDescription,
    };
    if (!slug) {
      setConfirm(false);
      return setslugerror("Slug is required field");
    }
    if (specialCharRegex.test(formattedSlug)) {
      setConfirm(false);
      return setslugerror(
        "Do not contain any special characters in the slug field"
      );
    }
    if (actionType == "approve") {
      setloading(true);
      ProductFarmerServices.approveProductsFarmer(modalData?.productDtlId, data)
        .then(({ data }) => {
          setloading(false);
          setConfirm(false);
          setActionPerformed(true);
          if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
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
      if (!review) {
        setConfirm(false);
        return setreviewerror(
          "Review is required while rejecting the product!"
        );
      }
      if (review?.length < 3) {
        setConfirm(false);
        return setreviewerror(
          "Review must be more than three characters long!"
        );
      }
      setloading(true);
      ProductFarmerServices.rejectProductsFarmer(modalData?.productDtlId, data)
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
          if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
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

  useEffect(() => {
    setImageList([]);
    if (modalData?.productDtlId) {
      ProductFarmerServices.getAllImage(modalData?.productDtlId).then(
        ({ data }) => {
          setImageList(data?.images);
        }
      );
      ProductUnitServices.getProductUnit().then(({ data }) => {
        setUnitTitle(
          data.filter((data) => data?.unitId == modalData?.unitId)[0]?.unitName
        );
      });
    }
  }, [modalData?.productDtlId]);

  const clearerrors = () => {
    setslugerror("");
    setreviewerror("");
    setmetaDescription("");
    setmetaTitle("");
    setSlug("");
    setreview("");
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-body ">
              <button
                ref={closeButtonRef}
                onClick={clearerrors}
                type="button"
                className="btn-close "
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  backgroundColor: "pink",
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div>
                <div className="product_basic_detail ">
                  <div className="product_imageList" style={{ width: "120px" }}>
                    <div
                      style={{
                        flexDirection: "column",
                        height: "75vh",
                        overflowY: "auto",
                      }}
                      className="d-flex align-items-center"
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
                  <div
                    className="product_singleImage"
                    style={{ height: "300px", width: "300px" }}
                  >
                    <img
                      src={`${Image_URL}/Products/${ImageList[Index]?.url}`}
                      alt="image"
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div className="product_details w-75  ps-md-3 p-0">
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <h6 style={{ whiteSpace: "nowrap" }}>
                              Product Name
                            </h6>
                          </td>
                          <td>{modalData?.productDtlName}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6 style={{ whiteSpace: "nowrap" }}>
                              Product Dicription
                            </h6>
                          </td>
                          <td>{modalData?.productDtl}</td>
                        </tr>
                        <tr>
                          <td>
                            <h6 style={{ whiteSpace: "nowrap" }}>
                              Product Price
                            </h6>
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
                            <h6 style={{ whiteSpace: "nowrap" }}>
                              Product Quantity
                            </h6>
                          </td>
                          <td>{modalData?.quantity}</td>
                        </tr>

                        <tr>
                          <td>
                            <h6>Unit</h6>
                          </td>
                          <td>{unitTitle}</td>
                        </tr>
                        {/* <tr>
                          <td>
                            <h6>Slug</h6>
                          </td>
                          <td>{modalData?.slug}</td>
                        </tr> */}
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

            <div
              className="modal-footer p-0"
              style={{ border: " 2px solid #ddd" }}
            >
              <div className="row w-100">
                <div className="col-md-10 mb-2">
                  <div className="row m-0">
                    <div className="col-md-6">
                      <label className="adjustLabel">Slug *</label>
                      <input
                        type="text"
                        className="form-control p-2 adjustLabel_input shadow-none"
                        onChange={(e) => {
                          setSlug(e.target.value);
                          setslugerror("");
                        }}
                        value={slug}
                      />

                      {slugerror && (
                        <span className="error_input_text">{slugerror}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="adjustLabel">Review *</label>
                      <input
                        type="text"
                        className="form-control p-2 adjustLabel_input shadow-none"
                        onChange={(e) => {
                          setreview(e.target.value);
                          setreviewerror("");
                        }}
                        value={review}
                      />
                      {reviewerror && (
                        <span className="error_input_text">{reviewerror}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="adjustLabel">Meta Title</label>
                      <textarea
                        type="text"
                        className="form-control p-2 adjustLabel_input shadow-none"
                        name="slug"
                        onChange={(e) => setmetaTitle(e.target.value)}
                        value={metaTitle}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="adjustLabel">Meta Description</label>
                      <textarea
                        type="text"
                        className="form-control p-2 adjustLabel_input shadow-none"
                        name="slug"
                        onChange={(e) => setmetaDescription(e.target.value)}
                        value={metaDescription}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div>
                    <button
                      type="button"
                      className="btn btn-success w-100 my-3"
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
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger w-100"
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
