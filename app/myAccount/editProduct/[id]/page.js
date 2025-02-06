"use client"
import React, { useEffect, useState } from "react";
import "../../../admin/addProduct/addProduct.css"
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import ProductgradeServices from "@/services/ProductgradeServices";
import ProductUnitServices from "@/services/ProductUnitServices";

// import CountryServices from "@/services/CountryServices";
import { useSelector } from "react-redux";
import AddProductSearch from "@/component/smallcompo/addProductSearch";
import AuthService from "@/services/AuthServices";
// const specialCharRegex = /[^a-zA-Z0-9\s-]/;

const EditProductFarmer = ({ params }) => {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [slugError, setSlugError] = useState("")
  const [productList, setProductList] = useState([])
  const [unitlist, setUnitlist] = useState([]);
  const [gradelist, setgradelist] = useState([])
  const user = useSelector((state) => state.auth);
  const [Category, setCategory] = useState('')
  const [SubCategory, setSubCategory] = useState('')
  const [countrySymbol, setCountrySymbol] = useState([])
  const [values, setValues] = useState({
    productDtlName: "",
    productDtl: "",
    productId: "",
    price: "",
    Brand: "",  
    discount: "",
    gradeId: "",
    sku: "",
    metaTitle: "",
    metaDescription: "",
    quantity: "",
    unitId: "",
    slug: "",
    available: true,
  });

  const onchangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setSlugError("")
  };

  const onSubmitHandler = async () => {
    const updatedValues = {
      ...values,
      isEdit: true
    };
    try {
      const dataa = await ProductFarmerServices.editProductsFormer(params?.id, updatedValues);
      // Reset errors and form values after successful service call
      setErrors({});
      setValues({
        productDtlName: "",
        productDtl: "",
        productId: "",
        price: "",
        discount: "",
        sku: "",
        metaTitle: "",
        metaDescription: "",
        quantity: "",
        unitId: "",
        slug: "",
        gradeId: "",
        available: false,
        isEdit: true
      });
      toast(dataa?.data?.message, {
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
  };

  const initApi = () => {
    CategoryServices.getProducts().then(({ data }) => {
      setProductList(data?.data)
    }).catch((err) => console.log(err))

    ProductgradeServices.getProductgrades()
      .then(({ data }) => {
        setgradelist(data);
      }).catch((err) => console.log(err));
  }

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

  useEffect(() => initApi(), [])

  useEffect(() => {
    if (params?.id) {
      ProductFarmerServices.getSingleProductsFarmer(params?.id).then(({ data }) => {
        const valuess = data?.product
        setValues({
          productDtlName: valuess?.productDtlName,
          productDtl: valuess?.productDtl,
          productId: valuess?.productId,
          price: valuess?.price,
          discount: valuess?.discount,
          sku: valuess?.sku,
          metaTitle: valuess?.metaTitle,
          metaDescription: valuess?.metaDescription,
          quantity: valuess?.quantity,
          unitId: valuess?.unitId,
          slug: valuess?.slug,
          gradeId: valuess?.gradeId,
          available: valuess?.available,
        });
      }).catch((err) => console.log(err))
    }
  }, [params?.id]);


  const handleDataFromChild = (data) => {
    setCategory(data?.Category?.categoryName || ""),
      setSubCategory(data?.SubCategory?.subcategoryName || ""),
      setValues((prev) => ({
        ...prev,
        productId: data?.productId || "",
        // productDtlName: data?.productName || "",
        productDtl: data?.description || "",

      }));

  };


  return (
    <div className="row  m-0 px-3">
      <h4 className="text-secondary mb-3">Edit Product</h4>
      <hr />
      {/* Form content */}
      <div className="col-md-4 mb-3 ms-md-0 ms-2 position-relative">
        <AddProductSearch sendDataToParent={handleDataFromChild} value={values.productDtlName} />
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

      <div className="col-md-4 mb-3 ms-md-0 ms-2">
        <label className="adjustLabel">Product Grade </label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="gradeId"
          value={values.gradeId}
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
          value={values.unitId}
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
          value={values.discount}
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
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProductFarmer;
