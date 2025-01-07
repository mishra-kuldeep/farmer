import React, { useEffect, useState } from "react";
import "./category.css";
import { IoIosArrowDown ,IoIosArrowUp} from "react-icons/io";
import CategoryServices from "@/services/CategoryServices";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    if (openCategory === categoryName) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryName);
    }
  };
  useEffect(() => {
    CategoryServices.getCategorySubCategory().then(({ data }) => {
      setCategoryList(data?.categorySubCatList);
    });
  }, []);

  return (
    <>
      <div
        style={{ width: "600px", display: "flex" }}
        className="d-none d-md-flex"
      >
        <div style={{ width: "300px", backgroundColor: "#555" }}>
          {categoryList?.map((ele,i) => (
            <p
            key={i}
              className="cat_list text-white"
              onMouseEnter={() => setSubCategoryList(ele?.SubCategories)}
            >
              {ele?.categoryName}
            </p>
          ))}
        </div>
        <div style={{ width: "300px", backgroundColor: "#ddd" }}>
          {subCategoryList?.map((ele) => (
            <p className="cat_list text-dark">{ele?.subcategoryName}</p>
          ))}
        </div>
      </div>

      <div className="d-md-none d-block">
      {categoryList?.map((ele) => (
        <div key={ele?.categoryName}>
          <p
            className="cat_list text-white d-flex justify-content-between"
            onClick={() => toggleCategory(ele?.categoryName)}
          >
            <span style={{width:"90%"}}>{ele?.categoryName}</span>
            <span style={{width:"10%",textAlign:"center"}}>
              {openCategory === ele?.categoryName ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </p>
          {openCategory === ele?.categoryName && (
            <div>
              {ele?.SubCategories?.map((val) => (
                <p key={val?.subcategoryName} className="cat_list text-white ms-3">
                  {val?.subcategoryName}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};
export default Category;
