import React, { useEffect, useState } from "react";
import "./veiwAllFilter.css";
import { IoIosArrowDown } from "react-icons/io";
import { VscCircleLargeFilled } from "react-icons/vsc";
import ProductgradeServices from "@/services/ProductgradeServices";
import CategoryServices from "@/services/CategoryServices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";

const VeiwAllFilter = () => {
  const [categoryList, setcategoryList] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);

  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const [subcategoryloader, setsubcategoryloader] = useState(false);

  const getcetegory = async () => {
    const categoryList = await CategoryServices.getCategory();
    setcategoryList(categoryList?.data?.data);
  };

  const getsubcategory = async () => {
    setsubcategoryloader(true);
    const subCategoryList = await CategoryServices.getSubCategorybycategoryId(
      categoryId
    );
    console.log(subCategoryList?.data);
    setsubCategoryList(subCategoryList?.data?.subcategory);
    setsubcategoryloader(false);
  };

  useEffect(() => {
    getcetegory();
  }, []);

  useEffect(() => {
    if (categoryId) {
      getsubcategory();
    }
  }, [categoryId]);

  

  return (
    <div className="filterwrapper ">
      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Category</p>
          <IoIosArrowDown />
        </div>
        <div className="scrollsinglefilter">
          {categoryList?.map((ele) => (
            <div
              className="filterHoverlable"
              onClick={() => setcategoryId(ele?.categoryCode)}
            >
              <VscCircleLargeFilled
                size={18}
                color={
                  categoryId == ele?.categoryCode ? "var(--mainColor)" : "#dadada"
                }
              />
              <label className="ms-2">{ele?.categoryName}</label>
            </div>
          ))}
        </div>
      </div>
      {subcategoryloader ? (
        <div className="singlefilterdiv text-center">
          <MiniLoader />
          <span className="mx-2">loading</span>
        </div>
      ) : (
        <>
          {categoryId && subCategoryList?.length > 0 && (
            <div className="singlefilterdiv">
              <div className="filtertitle">
                <p className="fw-bold">Filter by SubCategory</p>
                <IoIosArrowDown />
              </div>
              <div className="scrollsinglefilter">
                {subCategoryList?.map((ele) => (
                  <div
                    className="filterHoverlable"
                    onClick={() => setcategoryId(ele?.subcategoryCode)}
                  >
                    <VscCircleLargeFilled
                      size={18}
                      color={
                        subcategoryId == ele?.subcategoryCode
                          ? "var(--mainColor)"
                          : "#dadada"
                      }
                    />
                    <label className="ms-2">{ele?.subcategoryName}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Units</p>
          <IoIosArrowDown />
        </div>
        <div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="var(--mainColor)" />
            <label className="ms-2">Kg</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Ton</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Gram</label>
          </div>
        </div>
      </div>
      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Units</p>
          <IoIosArrowDown />
        </div>
        <div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="var(--mainColor)" />
            <label className="ms-2">Kg</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Ton</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Gram</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeiwAllFilter;
