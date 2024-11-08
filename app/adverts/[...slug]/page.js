"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./adverts.css";
import { useSelector } from "react-redux";
import RentProductsServices from "@/services/RentProductServices";
import { useParams } from "next/navigation";
import RentServices from "@/services/RentService";
import { VscCircleLarge } from "react-icons/vsc";
import { VscCircleLargeFilled } from "react-icons/vsc";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { IconBase } from "react-icons";
import IconButton from "@/component/reusableComponent/IconButton";

const AdvertsCart = () => {
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country);
  const { slug } = useParams();
  const [grid, setGrid] = useState(0);
  const [products, setproducts] = useState([]);
  const [categorryFilter, setCategoryFilter] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [Loader, setLoader] = useState(false);
  const farmServices = () => {};

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //** Call the handleSearch function with the search term */
  const handleSearch = () => {
    ApiCall();
  };

  const handleCategoryChange = (rentCategoryId) => {
    setSelectedCategory(rentCategoryId);
    setSearchTerm("")
  };

  const ApiCall = () => {
    setLoader(true);
    const FilterData = {
      page: "1",
      searchText: searchTerm,
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
      rentCategoryId: selectedCategory || slug[0],
    };
    console.log(FilterData);
    RentProductsServices.getAllRentProductHome(FilterData)
      .then(({ data }) => {
        setproducts(data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  useEffect(() => {
    if (user?.profile?.country || country?.country?.countryId) {
      ApiCall();
    }
  }, [user?.profile?.country, country?.country?.countryId, selectedCategory]);

  useEffect(() => {
    RentServices?.getRentCategory()
      .then(({ data }) => {
        setSelectedCategory(slug[0]);
        setCategoryList(data);
      })
      .catch((e) => console.log(e));
  }, [user?.profile?.country, country?.country?.countryId]);

  return (
    <>
      <div className="container pt-1">
        <div className="my-3">
          <div className="search_wrapper">
            <input
              type="text"
              placeholder="Search Ads..."
              onChange={handleInputChange}
              value={searchTerm}
            />
            <button onClick={handleSearch}>
              <FaSearch color="#fff" />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="filterSection">
              <h6>Filter</h6>
              <hr className="m-0 my-2 p-0" />
              <div>
                <div
                  className="d-flex justify-content-between cursor"
                  onClick={() => setCategoryFilter(!categorryFilter)}
                >
                  <h6>Category</h6>
                  <span>{categorryFilter ? "-" : "+"}</span>
                </div>
                {categorryFilter && (
                  <div className="px-2">
                    {categoryList.map((category, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedCategory == category?.rentCategoryId &&
                          "filterSELECTED"
                        } filterHover mb-1 p-1`}
                        onClick={() =>
                          handleCategoryChange(category?.rentCategoryId)
                        }
                      >
                        {selectedCategory == category?.rentCategoryId ? (
                          <VscCircleLargeFilled
                            size={22}
                            color="var(--mainColor)"
                          />
                        ) : (
                          <VscCircleLargeFilled size={22} color="#dadada" />
                        )}
                        <label className="ms-2">{category?.name}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="d-flex justify-content-between">
              <h3>
                Ads For Sale in{" "}
                {user?.profile?.countryName || country?.country?.countryName}
              </h3>
              <div className="d-flex align-items-center gap-3 cursor ">
                <FaThList size={25} onClick={() => setGrid(1)} color={grid?"#000":"#ddd"}/>
                <MdDashboard size={30} onClick={() => setGrid(0)} color={grid?"#ddd":"#000"} />
              </div>
            </div>
            {Loader ? (
              <div style={{height:"50vh"}} className="centerAllDiv">
                <MiniLoader />
                <span className="ms-3">Loading...</span>
              </div>
            ) : (
              <div className="row m-0">
                {products.map((product) => (
                  <div
                    className={`${grid ? "col-md-12" : "col-md-4"}  mb-2 p-2`}
                  >
                    <div
                      key={product.rentProductId}
                      className="product-card"
                      onClick={farmServices}
                    >
                      <div className="rentstatus ">
                        {product.isForSale && (
                          <span className="plotsale" data-status="isForSale">
                            For Sale
                          </span>
                        )}
                        {product.isForRent && (
                          <span className="plotsale" data-status="isForRent">
                            For Rent
                          </span>
                        )}
                      </div>
                      <div className={`${grid && "d-flex"}`}>
                        <div style={{ width: grid ? "40%" : "100%" }}>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                            width="100%"
                            height="200px"
                            style={{ backgroundColor: "#dadada" }}
                          />
                        </div>
                        <div className="p-2">
                          <h6>{product.title}</h6>
                          <p className="my-2">
                            Category:{" "}
                            <span className="text-secondary">
                              {product.rentCategory.name}
                            </span>
                          </p>
                          <p
                            className="text-secondary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title={product?.description}
                          >
                            {product?.description?.length < 100
                              ? product?.description
                              : `${product?.description?.substring(
                                  0,
                                   100
                                )}...`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {products.length <= 0 && !Loader && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      fontSize: "18px",
                      color: "#666",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      marginTop: "20px",
                    }}
                  >
                    <p style={{ marginBottom: "10px" }}>
                      Sorry, there are no listings for this category.
                    </p>
                    <p style={{ marginBottom: "10px" }}>
                      Please try another search or click here to see the latest
                      ads.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertsCart;
