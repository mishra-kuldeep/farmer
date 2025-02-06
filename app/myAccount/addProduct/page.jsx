"use client";
import React, { useEffect, useState } from "react";
import "../../admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import ProductUnitServices from "@/services/ProductUnitServices";
import ProductgradeServices from "@/services/ProductgradeServices";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import AddProductSearch from "@/component/smallcompo/addProductSearch";

const AddProductDtl = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [slugError, setSlugError] = useState("");
  const [productList, setProductList] = useState([]);
  const [unitlist, setUnitlist] = useState([]);
  const [gradelist, setgradelist] = useState([]);
  const [imageErrors, setImageErrors] = useState([]); // Array for storing invalid images with errors
  const [validImageNames, setValidImageNames] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profile, setprofile] = useState([]);
  const [countrySymbol, setCountrySymbol] = useState([])
  const [Category, setCategory] = useState('')
  const [SubCategory, setSubCategory] = useState('')
  const [values, setValues] = useState({
    productDtlName: "",
    productDtl: "",
    productId: "",
    Brand: "",
    Product: [],
    price: "",
    discount: 0,
    discountType: "Percentage",
    productType: "Inorganic",
    gradeId: 3,
    sku: "",
    quantity: "",
    unitId: "",
    available: true,
    isEdit: false,
  });
  const onchangeHandeler = (e) => {
    const { name, files } = e.target;

    if (name === "Product") {
      const maxFileSize = 200 * 1024; // 100 KB
      const maxImages = 5; // Maximum allowed images
      const selectedFiles = Array.from(files);

      // Check if more than 5 images are selected
      if (selectedFiles.length > maxImages) {
        setImageErrors([
          `You can only upload a maximum of ${maxImages} images.`,
        ]);
        setValidImageNames([]);
        return;
      }

      const validFiles = [];
      const validFileNames = [];
      const invalidFiles = [];

      // Validate each file
      selectedFiles.forEach((file) => {
        if (file.size <= maxFileSize) {
          validFiles.push(file); // Only push valid files to the array
          validFileNames.push(file.name); // Store valid file names
        } else {
          invalidFiles.push(`${file.name} is larger than 200KB`); // Store invalid file name with error
        }
      });

      // Update state with valid images and valid file names
      if (validFiles.length > 0) {
        setValues((prev) => ({ ...prev, Product: validFiles }));
        setValidImageNames(validFileNames); // Store valid file names
      }

      // Set error messages for invalid files
      setImageErrors(invalidFiles);
    } else {
      setValues((pre) => ({ ...pre, [name]: e.target.value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setSlugError("");
    }
  };

  const onSubmitHandler = async () => {
    setLoader(true);
    // const specialCharRegex = /[^a-zA-Z0-9\s-]/;
    // const formattedSlug = values.slug.toLowerCase().replace(/['\s]+/g, "-");

    // if (!specialCharRegex.test(formattedSlug)) {
    // Prepare form data
    const formData = new FormData();

    for (let key in values) {
      if (key !== "Product") {
        formData.append(key, values[key]);
      }
    }

    // Append the images to the form data
    values.Product.forEach((file, index) => {
      formData.append(`Product`, file);
    });

    try {
      await CategoryServices.addProductsFormer(formData);

      setErrors({});
      setValues({
        productDtlName: "",
        productDtl: "",
        productId: "",
        price: "",
        Product: [],
        discount: "",
        discountType: "",
        sku: "",
        metaTitle: "",
        metaDescription: "",
        quantity: "",
        unit: "",
        slug: "",
        productType: "",
        grade: "",
        available: false,
      });
      setLoader(false);
      toast("Product added successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
      router.push("/myAccount/listAddedProduct");
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
    // } else {
    //   setSlugError("Do not contain any special characters in the slug field");
    // }
  };

  useEffect(() => {
    if (user?.profile?.id) {
      setisLoading(true);
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setprofile(data?.userProfile);
        setisLoading(false);
      });
    }
  }, [user]);

  const initApi = () => {
    CategoryServices.getProducts()
      .then(({ data }) => {
        setProductList(data?.data);
      })
      .catch((err) => console.log(err));

    ProductgradeServices.getProductgrades()
      .then(({ data }) => {
        setgradelist(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);
  useEffect(() => {
    AuthService.getCountryList().then(({ data }) => {
      setCountrySymbol(data?.find((val) => val?.countryId == user.profile.country)?.currencySymbol);
    })
      .catch((err) => {
        console.log(err);
      });
    ProductUnitServices.getProductUnit(user?.profile?.country)
      .then(({ data }) => {
        setUnitlist(data);
      })
      .catch((err) => console.log(err));

  }, [user?.profile?.country]);



  const handleDataFromChild = (data) => {
    setCategory(data?.Category?.categoryName || ""),
      setSubCategory(data?.SubCategory?.subcategoryName || ""),
      setValues((prev) => ({
        ...prev,
        productId: data?.productId || "",
        productDtlName: data?.productName || "",
        productDtl: data?.description || "",

      }));

  };

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
              <h4 className="text-secondary mb-3">Add/Sell Product</h4>
              <hr />
              {/* Form content */}
              <div className="col-md-4 mb-3 ms-md-0 ms-2 position-relative">
                <AddProductSearch sendDataToParent={handleDataFromChild} />
                {errors.productId && (
                  <span className="error_input_text">{errors.productId}</span>
                )}
              </div>
              <div className="col-md-8 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Product Description *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="productDtl"
                  value={values.productDtl}
                  onChange={onchangeHandeler}
                />
                {errors.productDtl && (
                  <span className="error_input_text">{errors.productDtl}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Category *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="Category"
                  value={Category}
                  disabled
                  onChange={onchangeHandeler}
                />
                {errors.Category && (
                  <span className="error_input_text">
                    {errors.Category}
                  </span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Sub Category *</label>
                <input
                  type="text"
                  disabled
                  className="form-control p-2 adjustLabel_input"
                  name="SubCategory"
                  value={SubCategory}
                  onChange={onchangeHandeler}
                />
                {errors.SubCategory && (
                  <span className="error_input_text">
                    {errors.SubCategory}
                  </span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Brand</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="Brand"
                  value={values.Brand}
                  onChange={onchangeHandeler}
                />
                {errors.Brand && (
                  <span className="error_input_text">
                    {errors.Brand}
                  </span>
                )}
              </div>
              {/* 
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Product Type </label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="productType"
                  // value={values.producType}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  <option value="Organic">Organic Product</option>
                  <option value="Inorganic">Inorganic Product</option>
                </select>
              </div> */}
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Product Grade </label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="gradeId"
                  // value={values.grade}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  {gradelist?.map((ele) => (
                    <option key={ele?.gradeId} value={ele?.gradeId}>
                      {ele?.gradeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2"
                style={{ position: "relative" }}
              >
                <label className="adjustLabel  ms-3">Price *</label>
                <input
                  type="number"
                  className="form-control p-2 ps-4 adjustLabel_input"
                  name="price"
                  value={values.price}
                  onChange={onchangeHandeler}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "3px",
                    top: "15px",
                    backgroundColor: "#dadada",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                  className="fw-bold text-secondary p-2"
                >
                  {countrySymbol}
                </span>
                {errors.price && (
                  <span className="error_input_text">{errors.price}</span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Unit *</label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="unitId"
                  // value={values.unitId}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  {unitlist?.map((ele) => (
                    <option key={ele?.unitId} value={ele?.unitId}>
                      {ele?.unitName}
                    </option>
                  ))}
                </select>
                {errors.unitId && (
                  <span className="error_input_text">{errors.unitId}</span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Quantity *</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="quantity"
                  value={values.quantity}
                  onChange={onchangeHandeler}
                />
                {errors.quantity && (
                  <span className="error_input_text">{errors.quantity}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2"
                style={{ position: "relative" }}
              >
                <label className="adjustLabel">Discount</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="discount"
                  // value={values.discount}
                  onChange={onchangeHandeler}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "24px",
                    top: "14px",
                    backgroundColor: "#dadada",
                    borderRadius: "0px 5px 5px 0px",
                  }}
                  className="fw-bold text-secondary p-2"
                >
                  %
                </span>
                {errors.discount && (
                  <span className="error_input_text">{errors.discount}</span>
                )}
              </div>
              <div className="col-md-4 ms-md-0 ms-2">
                <label className="adjustLabel " style={{ marginLeft: "100px" }}>
                  Upload Images
                </label>
                <input
                  type="file"
                  className="form-control p-2 adjustLabel_input"
                  name="Product"
                  multiple
                  onChange={onchangeHandeler}
                />
                <p className="helperTextInput">
                  You can select multiple images up to 5 images
                </p>
                <p className="helperTextInput">
                  Each image size must be less than 100kb
                </p>
                {/* Display valid image names */}
                {validImageNames.length > 0 && (
                  <div className="valid-images">
                    <p className="error_input_text text-success">
                      Valid images:
                    </p>
                    <ul>
                      {validImageNames.map((name, index) => (
                        <li
                          key={index}
                          className="error_input_text text-success"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Display invalid image errors */}
                {imageErrors.length > 0 && (
                  <div className="invalid-images">
                    <p className="error_input_text">Invalid images:</p>
                    <ul>
                      {imageErrors.map((error, index) => (
                        <li key={index} className="error_input_text">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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

export default AddProductDtl;
