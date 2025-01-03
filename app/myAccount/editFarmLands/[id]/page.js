"use client";
import React, { useEffect, useState } from "react";
// import "../../admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import RentProductsServices from "@/services/RentProductServices";
const Page = ({ params }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rentCategorieslist, setRentCategorieslist] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profile, setprofile] = useState([]);
  const [dynamicFields, setDynamicFields] = useState({});
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({
    title: "",
    description: "",
    countryId: "",
    UserId: "",
    rentCategoryId: "",
    available: true,
    isForSale: false,
    isForRent: false,
    otherDetails: {},
  });
  const onchangeHandeler = (e) => {
    const { name } = e.target;
    setValues((pre) => ({ ...pre, [name]: e.target.value }));
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDynamicFieldChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      otherDetails: { ...prev.otherDetails, [name]: value },
    }));
  };
  const onSubmitHandler = async () => {
    setLoader(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key == "otherDetails") {
        formData.append("otherDetails", JSON.stringify(values.otherDetails));
      } else formData.append(key, values[key]);

    });
    images?.forEach((image, index) => {
      formData.append(`adImages`, image);
    });
    try {
      await RentProductsServices.EditRentProducts(params?.id, formData);
      setErrors({});
      setValues({
        countryId: "",
        UserId: "",
        rentCategoryId: "",
        available: true,
        isForSale: false,
        isForRent: false,
        otherDetails: {},
      });
      setLoader(false);
      toast(" Edit successfully!", {
        icon: "✔️",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
      router.push("/myAccount/FarmLandList");
    } catch (err) {
      console.log(err);
      const errorData = err?.response?.data?.errors || [];
      const errorObj = errorData.reduce((acc, curr) => {
        acc[curr.path] = curr.msg;
        return acc;
      }, {});
      setErrors(errorObj);
      setLoader(false);
    }
  };



  useEffect(() => {
    if (user?.profile?.id) {
      setisLoading(true);
      values.UserId = user?.profile?.id;
      values.countryId = user.profile.country;
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setprofile(data?.userProfile);
        setisLoading(false);
      });
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const initApi = () => {
    RentProductsServices.getAllRentCategories()
      .then(({ data }) => {
        setRentCategorieslist(data);
      })
      .catch((err) => console.log(err));

    RentProductsServices.getRentProductById(params?.id)
      .then(({ data }) => {
        setValues({
          countryId: data?.countryId,
          UserId: data?.UserId,
          title: data?.title,
          description: data?.description,
          phone: data?.phone,
          rentCategoryId: data?.rentCategoryId,
          available: data?.isAvailable,
          isForSale: data?.isForSale,
          isForRent: data?.isForRent,
          otherDetails: data?.otherDetails,
        });
        // setRentProduct(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (params?.id) {
      initApi();
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  useEffect(() => {
    if (values.rentCategoryId) {
      const selectedCategory = rentCategorieslist.find(
        (cat) => cat.rentCategoryId === parseInt(values.rentCategoryId)
      );
      if (selectedCategory && selectedCategory.otherDetails) {
        setDynamicFields(JSON.parse(selectedCategory.otherDetails));
        setValues((prev) => ({
          ...prev,
          otherDetails: JSON.parse(values?.otherDetails || selectedCategory.otherDetails ),
        }));
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.rentCategoryId, rentCategorieslist]);

  useEffect(() => {
    AuthService.getCountryList()
      .then(({ data }) => {
        // setCountrySymbol(
        //   data?.find((val) => val?.countryId == user.profile.country)
        //     ?.currencySymbol
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.profile?.country]);

  return (
    <>
      {isloading ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          Loading...
        </div>
      ) : (
        <>
          {profile?.IsVerified && profile?.isUpdate ? (
            <div className="row  m-0 px-md-3 mb-4">
              <h4 className="text-secondary mb-3">Edit Ads</h4>
              <hr />
              {/* Form content */}
              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Title Name *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="title"
                  value={values.title}
                  onChange={onchangeHandeler}
                />
                {errors.title && (
                  <span className="error_input_text">{errors.title}</span>
                )}
              </div>
              <div className="col-md-8 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Description *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="description"
                  value={values.description}
                  onChange={onchangeHandeler}
                />
                {errors.description && (
                  <span className="error_input_text">{errors.description}</span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Phone No *</label>
                <input
                  type="Number"
                  className="form-control p-2 adjustLabel_input"
                  name="phone"
                  value={values.phone}
                  onChange={onchangeHandeler}
                />
                {errors.phone && (
                  <span className="error_input_text">{errors.phone}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="adjustLabel " style={{ marginLeft: "100px" }}>
                  Upload Images
                </label>
                <input
                  type="file"
                  className="form-control p-2 adjustLabel_input"
                  name="Product"
                  multiple
                  onChange={onImageChange}
                />
                {images?.length > 0 && (
                  <p>{images?.length} image(s) selected</p>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Category *</label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="rentCategoryId"
                  value={values.rentCategoryId}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  {rentCategorieslist?.map((ele) => (
                    <option key={ele.rentCategoryId} value={ele.rentCategoryId}>
                      {ele.name}
                    </option>
                  ))}
                </select>
                {errors.rentCategoryId && (
                  <span className="error_input_text">
                    {errors.rentCategoryId}
                  </span>
                )}
              </div>
              {Object.keys(dynamicFields).map((key) => (
                <div key={key} className="col-md-4 mb-3">
                  <label className="adjustLabel">{key}</label>
                  <input
                    type="text"
                    className="form-control adjustLabel_input"
                    name={key}
                    value={values?.otherDetails[key]}
                    onChange={handleDynamicFieldChange}
                  />
                </div>
              ))}
              <div className="col-md-2 my-3 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input custom-checkbox cursor"
                    type="checkbox"
                    value={values.available}
                    checked={values.available}
                    id="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                    readOnly
                  />
                  <label
                    className="form-check-label ms-2 cursor"
                    htmlFor="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                  >
                    Available
                  </label>
                </div>
              </div>
              <div className="col-md-2 my-3 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input custom-checkbox cursor"
                    type="checkbox"
                    value={values.isForRent}
                    checked={values.isForRent}
                    id="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        isForRent: !prev.isForRent,
                      }))
                    }
                    readOnly
                  />
                  <label
                    className="form-check-label ms-2 cursor"
                    htmlFor="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        isForRent: !prev.isForRent,
                      }))
                    }
                  >
                    isForRent
                  </label>
                </div>
              </div>
              <div className="col-md-2 my-3 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input custom-checkbox cursor"
                    type="checkbox"
                    value={values.isForSale}
                    checked={values.isForSale}
                    id="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        isForSale: !prev.isForSale,
                      }))
                    }
                    readOnly
                  />
                  <label
                    className="form-check-label ms-2 cursor"
                    htmlFor="defaultCheck1"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        isForSale: !prev.isForSale,
                      }))
                    }
                  >
                    isForSale
                  </label>
                </div>
              </div>
              <div className="col-md-3 text-center mt-3">
                <button
                  className="login_btn"
                  onClick={onSubmitHandler}
                  disabled={loader}
                >
                  {loader && <MiniLoader />}
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: "80vh" }} className="centerAllDiv">
              <div>
                {!profile?.isUpdate && (
                  <p>
                    Please go first to update your profile to add you product{" "}
                    <span
                      onClick={() => router.push("/myAccount/myProfile")}
                      className="admin_btn cursor"
                    >
                      go
                    </span>
                  </p>
                )}
                {!profile?.IsVerified && profile?.isUpdate && (
                  <p>
                    Please wait for admin verfication, after verfication you can
                    add you product here
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Page;
