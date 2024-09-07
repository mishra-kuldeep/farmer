import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const EditProduct = ({ setState }) => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const [values, setValues] = useState({
    productName: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    status: false,
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
  };

  const onSubmitHandler = () => {
    CategoryServices.editProduct(values,editId)
      .then((data) => {
        setErrors({});
        toast("product updated successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        setState("1");
      })
      .catch((err) => {
        console.log(err);
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      });
  };

  useEffect(() => {
    if (editId) {
        CategoryServices.getSingeProduct(editId).then(({data})=>{
            setValues({
                productName: data.productName,
                description: data.description,
                category: data.category,
                subCategory: data.subCategory,
                brand: data.brand,        
                status: data.status,
              });
        })
    }
  }, [editId]);

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">Product Name *</label>
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
        <label className="adjustLabel">Subcategory *</label>
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
            Status for Product
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

export default EditProduct;
