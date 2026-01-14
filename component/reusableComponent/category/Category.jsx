import React, { useEffect, useState } from "react";
import "./category.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CategoryServices from "@/services/CategoryServices";
import { IoMdArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [subId, setsubId] = useState(null);

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
        style={{ width: "600px", height: "70vh", overflow: "auto" }}
        className="d-none d-md-flex p-0"
      >
        <div
          style={{
            width: "300px",
            height: "70vh",
            overflow: "auto",
            backgroundColor: "var(--mainColor)",
          }}
        >
          {categoryList?.map((ele, i) => (
            <div
              onClick={() =>
                router.push(`/ViewAll/product?categotyId=${ele?.categoryCode}`)
              }
              key={i}
              className={`${ele?.categoryCode == subId && "activecat"
                } cat_list hovercatlist d-flex justify-content-between pe-2 align-items-center cursor`}
              style={{ borderBottom: "0.1px solid rgb(175, 175, 175)" }}
              onMouseEnter={() => {
                setSubCategoryList(ele?.SubCategories);
                setsubId(ele?.categoryCode);
              }}
            >
              <p key={i} className=" text-white">
                {ele?.categoryName}
              </p>
              {!!ele.SubCategories.length && (
                <IoMdArrowDropright
                  className={`${ele?.categoryCode !== subId && "iconcatlist"}`}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ width: "300px" }}>
          {subCategoryList?.map((ele, i) => (
            <p
              key={i}
              className="cat_list catsublisthover text-dark"
              onClick={() =>
                router.push(
                  `/ViewAll/product?subcategotyId=${ele?.subcategoryCode}`
                )
              }
            >
              {ele?.subcategoryName}
            </p>
          ))}
        </div>
      </div>

      <div className="d-md-none d-block">
        {categoryList?.map((ele, i) => (
          <div key={i} >
            <p className="cat_list  d-flex justify-content-between">
              <span
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={{ width: "90%" }}
                onClick={() =>
                  router.push(`/ViewAll/product?categotyId=${ele?.categoryCode}`)
                }
              >
                {ele?.categoryName}
              </span>
              {!!ele.SubCategories.length && (
                <span
                  style={{ width: "10%", textAlign: "center" }}
                  onClick={() => toggleCategory(ele?.categoryName)}
                >
                  {openCategory === ele?.categoryName ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </p>
            {openCategory === ele?.categoryName && (
              <div>
                {ele?.SubCategories?.map((val, i) => (
                  <p
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    key={i}
                    className="cat_list cat_listsubtitle  ms-3"
                    onClick={() =>
                      router.push(
                        `/ViewAll/product?subcategotyId=${val?.subcategoryCode}`
                      )
                    }
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
