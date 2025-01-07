import React, { useEffect, useState } from "react";
import "./category.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CategoryServices from "@/services/CategoryServices";
import { IoMdArrowDropright } from "react-icons/io";

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
        className="d-none d-md-flex p-0"
      >
        <div style={{ width: "300px", backgroundColor: "#dddddd" }}>
          {categoryList?.map((ele, i) => (
            <div
              className="cat_list d-flex justify-content-between pe-2 align-items-center cursor"
              style={{borderBottom:"0.1px solid rgb(175, 175, 175)"}}
              onMouseEnter={() => setSubCategoryList(ele?.SubCategories)}
            >
              <p key={i} className=" text-dark">
                {ele?.categoryName}
              </p>
              {!!ele.SubCategories.length && <IoMdArrowDropright />}
            </div>
          ))}
        </div>
        <div style={{ width: "300px", backgroundColor: "#f2f2f2" }}>
          {subCategoryList?.map((ele) => (
            <p className="cat_list text-dark">{ele?.subcategoryName}</p>
          ))}
        </div>
      </div>

      <div className="d-md-none d-block">
        {categoryList?.map((ele) => (
          <div key={ele?.categoryName}>
            <p
              className="cat_list  d-flex justify-content-between"
              onClick={() => toggleCategory(ele?.categoryName)}
            >
              <span style={{ width: "90%" }}>{ele?.categoryName}</span>
              <span style={{ width: "10%", textAlign: "center" }}>
                {openCategory === ele?.categoryName ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </span>
            </p>
            {openCategory === ele?.categoryName && (
              <div>
                {ele?.SubCategories?.map((val) => (
                  <p
                    key={val?.subcategoryName}
                    className="cat_list cat_listsubtitle  ms-3"
                  >
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
