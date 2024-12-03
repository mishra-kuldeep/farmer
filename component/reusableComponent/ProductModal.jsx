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
  const [NextPage, setNextPage] = useState(false);
  const [inspectionDateerror, setinspectionDateerror] = useState("");
  const [inspectionStatusError, setinspectionStatusError] = useState("");
  const [complianceLevelerror, setcomplianceLevelerror] = useState("");

  const [Inspectiondata, setInspectiondata] = useState({
    inspectionDate: "",
    inspectionStatus: "",
    productDtlId: "",
    remarks: "",
    url: "",
    complianceLevel: "",
    nextInspectionDue: "",
    inspectedQuantity: "",
    issuesFound: "",
    resolutionDate: "",
  });

  const onChangeHandeler = (e) => {
    const { value, name, files } = e.target;
    setInspectiondata((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    setinspectionDateerror("");
    setinspectionStatusError("");
    setcomplianceLevelerror("");
  };

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
    if (Inspectiondata.inspectionDate !== "") {
      setConfirm(false);
      if (!Inspectiondata.inspectionDate)
        return setinspectionDateerror("Inspection Date is required field");
      if (!Inspectiondata.inspectionStatus)
        return setinspectionStatusError("Inspection Status is required field");
      if (!Inspectiondata.complianceLevel)
        return setcomplianceLevelerror(" compliance Level is required field");
    }
    if (actionType == "approve") {
      setloading(true);
      const formData = new FormData();
      for (let key in Inspectiondata) {
        if (key === "url" && Inspectiondata[key]) {
          formData.append("ProductInspectionDoc", Inspectiondata[key]);
        } else {
          formData.append(key, Inspectiondata[key]);
        }
      }
      ProductFarmerServices.approveProductsFarmer(modalData?.productDtlId, data)
        .then((data) => {
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
      if (Inspectiondata.inspectionDate !== "") {
        ProductFarmerServices.productInspection(formData)
          .then((data) => {
            setloading(false);
          })
          .catch((err) => {
            console.log(err);
            setConfirm(false);
          });
      }
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
      ).catch((err)=>console.log(err));
      ProductUnitServices.getProductUnit(modalData?.unitId).then(({ data }) => {
        setUnitTitle(
          data.filter((data) => data?.unitId == modalData?.unitId)[0]?.unitName
        );
      }).catch((err)=>console.log(err));
    }
    setInspectiondata((prevData) => ({
      ...prevData,
      ["productDtlId"]: modalData?.productDtlId,
    }));
  }, [modalData?.productDtlId]);


  useEffect(() => {
    setInspectiondata((prevData) => ({
      ...prevData,
      ["productDtlId"]: modalData?.productDtlId,
    }));
  }, [NextPage]);

  const clearerrors = () => {
    setslugerror("");
    setreviewerror("");
    setmetaDescription("");
    setmetaTitle("");
    setSlug("");
    setreview("");
    setNextPage(false);
    setinspectionDateerror("");
    setcomplianceLevelerror("");
    setinspectionStatusError("");
    setInspectiondata({
      inspectionDate: "",
      inspectionStatus: "",
      remarks: "",
      url: "",
      complianceLevel: "",
      nextInspectionDue: "",
      inspectedQuantity: "",
      issuesFound: "",
      resolutionDate: "",
    });
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-body ">
              <button
                ref={closeButtonRef}
                onClick={() => clearerrors()}
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
                {!NextPage ? (
                  <div className="product_basic_detail ">
                    <div
                      className="product_imageList"
                      style={{ width: "120px" }}
                    >
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
                ) : (
                  <div className="col-md-12 mb-2">
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
                          <span className="error_input_text">
                            {reviewerror}
                          </span>
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
                      {/* /////////////////////////////Inspection Product/////////////////////////// */}
                      <div className="col-md-12 my-3 text-center text-secondary fw-bold">
                        Inspection Product{" "}
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">Inspection Date*</label>
                        <input
                          type="date"
                          name="inspectionDate"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.inspectionDate}
                        />
                        {inspectionDateerror && (
                          <span className="error_input_text">
                            {inspectionDateerror}
                          </span>
                        )}
                      </div>

                      {/* <div className="col-md-6">
                        <label className="adjustLabel">Inspection Status*</label>
                        <input
                          type="text"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="inspectionStatus"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.inspectionStatus}
                        />
                      </div> */}
                      <div className="col-md-6">
                        <label className="adjustLabel">
                          Inspection Status*
                        </label>
                        <select
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="inspectionStatus"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.inspectionStatus || ""} // Set default to an empty string if undefined
                        >
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value="Pass">Pass</option>
                          <option value="Fail">Fail</option>
                          <option value="Pending">Pending</option>
                        </select>
                        {inspectionStatusError && (
                          <span className="error_input_text">
                            {inspectionStatusError}
                          </span>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">Document</label>
                        <input
                          type="file"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="url"
                          onChange={(e) => onChangeHandeler(e)}
                          // value={Inspectiondata.url}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">
                          {" "}
                          Compliance Level*
                        </label>
                        <input
                          type="text"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="complianceLevel"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.complianceLevel}
                        />
                        {complianceLevelerror && (
                          <span className="error_input_text">
                            {complianceLevelerror}
                          </span>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">
                          Next Inspection Due
                        </label>
                        <input
                          type="date"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="nextInspectionDue"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.nextInspectionDue}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">
                          Inspected Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="inspectedQuantity"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.inspectedQuantity}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">Issues</label>
                        <input
                          type="text"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="issuesFound"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.issuesFound}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">Resolution Date</label>
                        <input
                          type="date"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="resolutionDate"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata?.resolutionDate}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="adjustLabel">Remarks</label>
                        <textarea
                          type="text"
                          className="form-control p-2 adjustLabel_input shadow-none"
                          name="remarks"
                          onChange={(e) => onChangeHandeler(e)}
                          value={Inspectiondata.remarks}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="modal-footer p-0"
              style={{ border: " 2px solid #ddd" }}
            >
              <div className="row w-100">
                <div className="col-md-6 text-center">
                  {NextPage ? (
                    <button
                      type="button"
                      className="btn btn-success w-25 my-2"
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
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success w-25 my-2"
                      onClick={() => {
                        setNextPage(true);
                      }}
                    >
                      Next Page
                    </button>
                  )}
                </div>
                <div className="col-md-6 text-center">
                  <button
                    type="button"
                    className="btn btn-danger w-25 my-2"
                    disabled={!NextPage}
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
