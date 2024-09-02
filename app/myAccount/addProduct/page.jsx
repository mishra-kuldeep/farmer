"use client"
import React, { useEffect, useState } from "react";
import "../../admin/addProduct/addProduct.css"
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const specialCharRegex = /[^a-zA-Z0-9\s-]/;

const AddProductDtl = () => {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [slugError,setSlugError] = useState("")
  const [productList,setProductList] =useState([])

  const [values, setValues] = useState({
    productDtlName: "",
    description: "",
    productId:"",
    price: "",
    discount: "",
    discountType: "",
    sku: "",
    metaTitle: "",
    metaDescription: "",
    quantity: "",
    unit: "",
    slug: "",
    available: true,
  });
 
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

 const onSubmitHandler = async () => {
    const specialCharRegex = /[^a-zA-Z0-9\s-]/;
    const formattedSlug = values.slug.toLowerCase().replace(/['\s]+/g, "-");
  
    if (!specialCharRegex.test(formattedSlug)) {
      // Directly update the slug in the values object before calling the service
      const updatedValues = {
        ...values,
        slug: formattedSlug,
      };
      try {
        await CategoryServices.addProductsFormer(updatedValues);
  
        // Reset errors and form values after successful service call
        setErrors({});
        setValues({
          productDtlName: "",
          productDtl: "",  
          productId:"",
          price: "",
          discount: "",
          discountType: "",
          sku: "",
          metaTitle: "",
          metaDescription: "",
          quantity: "",
          unit: "",
          slug: "",
          available: false,
        });
        toast("Product added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        router.push("/myAccount/listAddedProduct")
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
      setSlugError("Do not contain any special characters in the slug field");
    }
  };

  const initApi = () => {
    CategoryServices.getProducts().then(({data})=>{
      setProductList(data?.data)
    }).catch((err)=>console.log(err))
  }

  useEffect(()=>initApi(),[])
  console.log(productList)

  return (
    <div className="row  m-0 px-3">
       <h4 className="text-secondary mb-3">Add Product</h4>
        <hr />
      <div className="col-md-4 mb-3 ">
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
      <div className="col-md-8 mb-3">
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
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Product *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="productId"
          value={values.productId}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          {productList?.map((ele)=><option key={ele.productId} value={ele.productId}>{ele.productName}</option>)}
        </select>
        {errors.productId && <span className="error_input_text">{errors.productId}</span>}
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
      <div className="col-md-3 text-center mt-3">
        <button className="login_btn" onClick={onSubmitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProductDtl;
