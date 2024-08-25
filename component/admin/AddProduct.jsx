import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
const specialCharRegex = /[^a-zA-Z0-9\s-]/;

const AddProduct = ({ setState }) => {
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);

  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [slugError,setSlugError] = useState("")

  const [values, setValues] = useState({
    productName: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    originalPrice: "",
    discount: "",
    discountType: "",
    averageRating: "",
    numberOfRatings: "",
    sku: "",
    weight: "",
    reorderLevel: "",
    supplierInfo: "",
    metaTitle: "",
    metaDescription: "",
    quantity: "",
    unit: "",
    slug: "",
    status: false,
    available: true,
  });

  const initApi = async () => {
    const categoryList = await CategoryServices.getCategory();
    setcategoryList(categoryList?.data?.data);
    const subCategoryList = await CategoryServices.getSubCategory();
    setsubCategoryList(subCategoryList?.data?.data);
    const BrandList = await CategoryServices.getBrand();
    setBrandList(BrandList?.data?.data);
  };

  useEffect(() => {
    initApi();
  }, []);

  const onchangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setSlugError("")
  };

  console.log(values.slug.toLowerCase().replace(/['\s]+/g, "-"));
  console.log(
    specialCharRegex.test(values.slug.toLowerCase().replace(/['\s]+/g, "-"))
  );

  // const onSubmitHandler = async() => {
  //    if (
  //     !specialCharRegex.test(values.slug.toLowerCase().replace(/['\s]+/g, "-"))
  //   ) {
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       slug: prevValues.slug.toLowerCase().replace(/['\s]+/g, "-")
  //     })); 
  //     CategoryServices.addProduct(values)
  //       .then((data) => {
  //         setErrors({});
  //         setValues({
  //           productName: "",
  //           description: "",
  //           category: "",
  //           subCategory: "",
  //           brand: "",
  //           price: "",
  //           originalPrice: "",
  //           discount: "",
  //           discountType: "",
  //           averageRating: "",
  //           numberOfRatings: "",
  //           sku: "",
  //           weight: "",
  //           reorderLevel: "",
  //           supplierInfo: "",
  //           metaTitle: "",
  //           metaDescription: "",
  //           quantity: "",
  //           unit: "",
  //           slug: "",
  //           status: false,
  //           available: false,
  //         });
  //         toast("product added successfully!", {
  //           icon: "👏",
  //           style: {
  //             borderRadius: "10px",
  //             background: "green",
  //             color: "#fff",
  //           },
  //         });
  //         setState("1");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         const errorData = err?.response?.data?.errors || [];
  //         const errorObj = errorData.reduce((acc, curr) => {
  //           acc[curr.path] = curr.msg;
  //           return acc;
  //         }, {});
  //         setErrors(errorObj);
  //       });
  //   }else setSlugError("do not contain any special character inside a slug field")
  // };
  const onSubmitHandler = async () => {
    const specialCharRegex = /[^a-zA-Z0-9\s-]/;
    const formattedSlug = values.slug.toLowerCase().replace(/['\s]+/g, "-");
  
    if (!specialCharRegex.test(formattedSlug)) {
      // Directly update the slug in the values object before calling the service
      const updatedValues = {
        ...values,
        slug: formattedSlug,
      };
  
      // Call the service with the updated values
      try {
        await CategoryServices.addProduct(updatedValues);
  
        // Reset errors and form values after successful service call
        setErrors({});
        setValues({
          productName: "",
          description: "",
          category: "",
          subCategory: "",
          brand: "",
          price: "",
          originalPrice: "",
          discount: "",
          discountType: "",
          averageRating: "",
          numberOfRatings: "",
          sku: "",
          weight: "",
          reorderLevel: "",
          supplierInfo: "",
          metaTitle: "",
          metaDescription: "",
          quantity: "",
          unit: "",
          slug: "",
          status: false,
          available: false,
        });
  
        // Show success toast
        toast("Product added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
  
        // Update state after successful service call
        setState("1");
      } catch (err) {
        console.log(err);
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      }
    } else {
      // Set error if special characters are detected
      setSlugError("Do not contain any special characters in the slug field");
    }
  };
  

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">productName *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="productName"
          value={values.productName}
          onChange={onchangeHandeler}
        />
        {errors.productName && (
          <span className="error_input_text">{errors.productName}</span>
        )}
      </div>
      <div className="col-md-8 mb-3">
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
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Category *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="category"
          value={values.category}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          {categoryList?.map((item) => (
            <option value={item.categoryId} key={item.categoryId}>
              {item.categoryName}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error_input_text">{errors.category}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Sub Category *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="subCategory"
          value={values.subCategory}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          {subCategoryList?.map((item) => (
            <option value={item.subcategoryId} key={item.subcategoryId}>
              {item.subcategoryName}
            </option>
          ))}
        </select>
        {errors.subCategory && (
          <span className="error_input_text">{errors.subCategory}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Brand *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="brand"
          value={values.brand}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          {brandList?.map((item) => (
            <option value={item.brandId} key={item.brandId}>
              {item.brandName}
            </option>
          ))}
        </select>
        {errors.brand && (
          <span className="error_input_text">{errors.brand}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
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
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">originalPrice</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="originalPrice"
          value={values.originalPrice}
          onChange={onchangeHandeler}
        />
      </div>

      <div className="col-md-4 mb-3">
        <label className="adjustLabel">discount *</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="discount"
          value={values.discount}
          onChange={onchangeHandeler}
        />
        {errors.discount && (
          <span className="error_input_text">{errors.discount}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">discountType *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="discountType"
          value={values.discountType}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          <option value="fixed">fixed</option>
          <option value="percentage">percentage</option>
        </select>
        {errors.discountType && (
          <span className="error_input_text">{errors.discountType}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
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
      <div className="col-md-4 mb-3">
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
          <option value="g">g</option>
          <option value="litre">litre</option>
          <option value="ml">ml</option>
          <option value="pcs">pcs</option>
          <option value="pack">pack</option>
        </select>
        {errors.unit && <span className="error_input_text">{errors.unit}</span>}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">averageRating</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="averageRating"
          value={values.averageRating}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">numberOfRatings</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="numberOfRatings"
          value={values.numberOfRatings}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Stock Keeping Unit</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="sku"
          value={values.sku}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">weight</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="weight"
          value={values.weight}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">reorderLevel</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="reorderLevel"
          value={values.reorderLevel}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">supplierInfo</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="supplierInfo"
          value={values.supplierInfo}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">metaTitle</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="metaTitle"
          value={values.metaTitle}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-8 mb-3">
        <label className="adjustLabel">metaDescription</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="metaDescription"
          value={values.metaDescription}
          onChange={onchangeHandeler}
        />
      </div>
      <div className="col-md-4 mb-3">
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
      <div className="col-md-3 my-3 d-flex align-items-center justify-content-center">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox cursor"
            type="checkbox"
            id="flexSwitchCheckDefault"
            name="status"
            checked={values.status}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, status: e.target.checked }))
            }
          />
          <label
            className="form-check-label ms-2 cursor"
            htmlFor="flexSwitchCheckDefault"
          >
            Status for category
          </label>
        </div>
      </div>
      <div className="col-md-3 text-center mt-3">
        <button className="login_btn" onClick={onSubmitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
