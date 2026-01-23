"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Pagination from "@/component/reusableComponent/Pagination";
import { Image_URL } from "@/helper/common";
import toast from "react-hot-toast";
import { isMobile } from "react-device-detect";

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
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState({});

  const farmServices = (id) => {
    router.push(`/adverts/details/${id}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //** Call the handleSearch function with the search term */
  const handleSearch = () => {
    if (searchTerm.length > 0) {
      ApiCall();
    } else
      toast("Please type in side search Input", {
        icon: "👏",
        style: {
          borderRadius: "1px",
          background: "red",
          color: "#fff",
        },
      });
  };

  const handleCategoryChange = (rentCategoryId) => {
    setSelectedCategory(rentCategoryId);
    setSearchTerm("");
  };

  const ApiCall = () => {
    setLoader(true);
    const FilterData = {
      page: "1",
      searchText: searchTerm,
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryCode,
      rentCategoryId: selectedCategory || slug[0],
    };

    RentProductsServices.getAllRentProductHome(FilterData)
      .then(({ data }) => {
        setproducts(data?.data);
        setmetaData(data?.meta);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.profile?.country, country?.country?.countryId, selectedCategory]);

  useEffect(() => {
    isMobile && setCategoryFilter(false);
    RentServices?.getRentCategory()
      .then(({ data }) => {
        setSelectedCategory(slug[0]);
        setCategoryList(data);
      })
      .catch((e) => console.log(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.profile?.country, country?.country?.countryId]);

  return (
    <div style={{minHeight:"calc(100vh - 100px)"}}>
      <div className="container pt-1">
        <div className="my-md-3 my-2">
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
                          selectedCategory == category?.rentCategoryCode &&
                          "filterSELECTED"
                        } filterHover mb-1 p-1`}
                        onClick={() => {
                          handleCategoryChange(category?.rentCategoryCode);
                          isMobile&&setCategoryFilter(false);
                        }}
                      >
                        {selectedCategory == category?.rentCategoryCode ? (
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
              <h3 className="mobilehome_title">
                Ads For Sale 
              </h3>
              <div className="d-md-flex align-items-center gap-3 cursor d-none">
                <FaThList
                  size={25}
                  onClick={() => setGrid(1)}
                  color={grid ? "#000" : "#ddd"}
                />
                <MdDashboard
                  size={30}
                  onClick={() => setGrid(0)}
                  color={grid ? "#ddd" : "#000"}
                />
              </div>
            </div>
            {Loader ? (
              <div style={{ height: "50vh" }} className="centerAllDiv">
                <MiniLoader />
                <span className="ms-3">Loading...</span>
              </div>
            ) : (
              <div className="row">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`${grid ? "col-md-12" : "col-md-4 col-6"}  p-md-2 p-1`}
                  >
                    <div
                      className="product-card"
                      onClick={() => farmServices(product.rentProductId)}
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
                        <div style={{ width: grid ? "30%" : "100%" }}>
                          <img
                            src={
                              product?.AdsImages?.length > 0
                                ? `${Image_URL}/adsImages/${product?.AdsImages[0]?.url}`
                                : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                            }
                            width="100%"
                            height={isMobile?"100px":"180px"}
                            style={{ backgroundColor: "#dadada" }}
                            alt="images"
                          />
                        </div>
                        <div
                          className="adsCardTitles"
                          style={{ width: grid ? "60%" : "100%" }}
                        >
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
                              : `${product?.description?.substring(0, 100)}...`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  {metaData.totalItems > 30 && (
                    <div className="row">
                      <div className="col-md-7">
                        <Pagination
                          page={page}
                          setPage={setPage}
                          List={products}
                          metaData={metaData}
                          searchShow={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
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
    </div>
  );
};

export default AdvertsCart;
