"use client";
import React, { useEffect, useState } from "react";
import "../../admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";

const AddProductDtl = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [slugError, setSlugError] = useState("");
  const [productList, setProductList] = useState([]);
  const [imageErrors, setImageErrors] = useState([]); // Array for storing invalid images with errors
  const [validImageNames, setValidImageNames] = useState([]);
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    productDtlName: "",

    productDtl: "",
    productId: "",
    Product: [],
    price: "",
    discount: 0,
    discountType: "fixed",
    productType: "Inorganic",
    grade: "A",
    sku: "",
    metaTitle: "",
    metaDescription: "",
    quantity: "",
    unit: "",
    slug: "",
    available: true,
    isEdit: false,
  });

  const onchangeHandeler = (e) => {
    const { name, files } = e.target;
  
    if (name === "Product") {
      const maxFileSize = 100 * 1024; // 100 KB
      const maxImages = 5; // Maximum allowed images
      const selectedFiles = Array.from(files);
  
      // Check if more than 5 images are selected
      if (selectedFiles.length > maxImages) {
        setImageErrors([`You can only upload a maximum of ${maxImages} images.`]);
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
          invalidFiles.push(`${file.name} is larger than 100KB`); // Store invalid file name with error
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
    const specialCharRegex = /[^a-zA-Z0-9\s-]/;
    const formattedSlug = values.slug.toLowerCase().replace(/['\s]+/g, "-");

    if (!specialCharRegex.test(formattedSlug)) {
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
    } else {
      setSlugError("Do not contain any special characters in the slug field");
    }
  };


  const initApi = () => {
    CategoryServices.getProducts()
      .then(({ data }) => {
        setProductList(data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);

  return (
    <div className="row  m-0 px-md-3 mb-4">
      <h4 className="text-secondary mb-3">Add Product</h4>
      <hr />
      {/* Form content */}
      <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
        <label className="adjustLabel">Product Name *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="productDtlName"
          value={values.productDtlName}
          onChange={onchangeHandeler}
        />
        {errors.productDtlName && (
          <span className="error_input_text">{errors.productDtlName}</span>
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
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Product *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="productId"
          value={values.productId}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          {productList?.map((ele) => (
            <option key={ele.productId} value={ele.productId}>
              {ele.productName}
            </option>
          ))}
        </select>
        {errors.productId && (
          <span className="error_input_text">{errors.productId}</span>
        )}
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Price *</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="price"
          value={values.price}
          onChange={onchangeHandeler}
        />
        {errors.price && (
          <span className="error_input_text">{errors.price}</span>
        )}
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Discount</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="discount"
          // value={values.discount}
          onChange={onchangeHandeler}
        />
        {errors.discount && (
          <span className="error_input_text">{errors.discount}</span>
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
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Unit *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="unit"
          value={values.unit}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          <option value="kg">kg</option>
          <option value="ton">ton</option>
          <option value="grms">grms</option>
          <option value="litre">litre</option>
          <option value="ml">ml</option>
          <option value="pcs">pcs</option>
          <option value="pack">pack</option>
        </select>
        {errors.unit && <span className="error_input_text">{errors.unit}</span>}
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Product Grade </label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="grade"
          // value={values.grade}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
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
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Stock Keeping Unit</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="sku"
          value={values.sku}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Slug *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="slug"
          value={values.slug}
          onChange={onchangeHandeler}
        />
        {errors.slug && <span className="error_input_text">{errors.slug}</span>}
        {slugError && <span className="error_input_text">{slugError}</span>}
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12 mb-3 ms-md-0 ms-2">
            <label className="adjustLabel">Meta Title</label>
            <input
              type="text"
              className="form-control p-2 adjustLabel_input"
              name="metaTitle"
              value={values.metaTitle}
              onChange={onchangeHandeler}
              placeholder={`Buy ${
                values.productDtlName ? values.productDtlName : '"productname"'
              } in ${
                values.unit ? values.unit : '"unit"'
              } Online At Best Price of Rs ${
                values.price ? values.price : '"257.33"'
              } - FarmerMarket`}
            />
          </div>
          <div className="col-md-12 mb-3 ms-md-0 ms-2">
            <label className="adjustLabel">Meta Description</label>
            <textarea
              id="exampleFormControlTextarea1"
              rows="3"
              type="text"
              className="form-control p-2 adjustLabel_input shadow-none"
              name="metaDescription"
              value={values.metaDescription}
              onChange={onchangeHandeler}
              placeholder={`Buy ${
                values.productDtlName ? values.productDtlName : '"productname"'
              } Products online at FarmerMarket And Get Them Delivered At Your Doorstep. Best Quality Always Ensured Now available at Rs ${
                values.price ? values.price : '"257.33"'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6 ms-md-0 ms-2">
        <label className="adjustLabel " style={{marginLeft:"100px"}}>Upload Images</label>
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
        <p className="helperTextInput">Each image size must be less than 100kb</p>
       {/* Display valid image names */}
       {validImageNames.length > 0 && (
        <div className="valid-images">
          <p className="error_input_text text-success">Valid images:</p>
          <ul>
            {validImageNames.map((name, index) => (
              <li key={index} className="error_input_text text-success">{name}</li>
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
              <li key={index} className="error_input_text">{error}</li>
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
              setValues((prev) => ({ ...prev, available: !prev.available }))
            }
            readOnly
          />
          <label
            className="form-check-label ms-2 cursor"
            htmlFor="defaultCheck1"
            onClick={() =>
              setValues((prev) => ({ ...prev, available: !prev.available }))
            }
          >
            Available
          </label>
        </div>
      </div>
      <div className="col-md-3 text-center mt-3">
        <button className="login_btn" onClick={onSubmitHandler}   disabled={loader}
        >
          {loader && <MiniLoader />}
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProductDtl;
