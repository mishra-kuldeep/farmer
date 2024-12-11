"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./vender.css";
import { IoIosCall } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";

import { useSelector } from "react-redux";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import "../../adverts/[...slug]/adverts.css";
import { FaSearch } from "react-icons/fa";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import Pagination from "@/component/reusableComponent/Pagination";
import { Image_URL } from "@/helper/common";

const Page = () => {
  const router = useRouter();
  const country = useSelector((state) => state.country);
  const { slug } = useParams();
  const [VendorList, setVendorList] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [currencySymbol, seetcurrencySymbol] = useState("₹");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categorryFilter, setCategoryFilter] = useState(true);
  const [location, setLocation] = useState("");
  const user = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState({});

  const handleCategoryChange = (vendorId) => {
    setSelectedCategory(vendorId);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = () => {
    apiCallservice();
  };

  const Navigate = (serviceId) => {
    router.push(`/vender/detail/${serviceId}`);
  };

  const initApi = () => {
    setLoader(true);
    vendorMasterServices
      .getAllactiveVendor(1)
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((err) => console.log(err));
  };

  const apiCallservice = () => {
    setLoader(true);
    const data = {
      status: "Approved",
      slug: selectedCategory,
      page: 1,
      pageSize: 10,
      location:location,
      searchText: searchTerm,
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
    };

    if (data.countryId) {
      vendorMasterServices
        .getAllVendorServices(data)
        .then(({ data }) => {
          setLoader(false);
          setVendorList(data?.data);
          setmetaData(data?.meta);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setVendorList([]);
        });
    }
  };

  useEffect(() => {
    apiCallservice();
  }, [
    user?.profile?.country,
    country?.country?.countryId,
    location,
    selectedCategory,
  ]);

  useEffect(() => {
    setSelectedCategory(slug);
    initApi();
  }, [user?.profile?.country, country?.country?.countryId]);
 
  console.log(VendorList);
  
  return (
    <>
      <div>
        <div className="container">
          <div className=" py-1">
            <div className="search_wrapper my-4">
              <input
                type="text"
                placeholder="Search by service name..."
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
                  <div>
                    <input
                      className="locationInput"
                      type="text"
                      value={location}
                      onChange={handleLocation}
                      placeholder="Search by Pincode..."
                    />
                  </div>
                  <div
                    className="d-flex justify-content-between cursor"
                    onClick={() => setCategoryFilter(!categorryFilter)}
                  >
                    <h6 className="my-2">Category</h6>
                    <span>{categorryFilter ? "-" : "+"}</span>
                  </div>
                  {categorryFilter && (
                    <div className="px-2">
                      {category.map((category, index) => {
                        return (
                          <div
                            key={index}
                            className={`${
                              selectedCategory ==
                                category?.VendorServicesMasterId &&
                              "filterSELECTED"
                            } filterHover mb-1 p-1`}
                            onClick={() =>
                              handleCategoryChange(
                                category?.VendorServicesMasterId
                              )
                            }
                          >
                            {selectedCategory ==
                            category?.VendorServicesMasterId ? (
                              <VscCircleLargeFilled
                                size={22}
                                color="var(--mainColor)"
                              />
                            ) : (
                              <VscCircleLargeFilled size={22} color="#dadada" />
                            )}
                            <label className="ms-2">{category?.type}</label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between">
                <h3 className="my-2"> Ads for Booking Services</h3>
              </div>
              {Loader ? (
                <div style={{ height: "40vh" }} className="centerAllDiv">
                  <MiniLoader />
                  <span className="mr-3">Loading...</span>
                </div>
              ) : (
                <div className="row">
                  {VendorList?.map((item, i) => (
                    <div
                      className="col-md-4"
                      onClick={() => Navigate(item?.serviceId)}
                      key={i}
                    >
                      <div className="servicevendercard">
                        <img
                          src= {item?.AdsImages?.length>0?`${Image_URL}/adsImages/${item?.AdsImages[0]?.url}`:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                          style={{ backgroundColor: "#dadada" }}
                          width="100%"
                          height="150px"
                        />
                        <div className="p-2">
                          <h5 className="my-2">{item?.serviceName}</h5>
                          <h6 style={{ fontSize: "13px" }}>
                            Price - {currencySymbol} {item?.cost}
                          </h6>
                          <h6 style={{ fontSize: "13px" }}>
                            Capacity - {item?.capacity}{" "}
                            {item?.ProductUnit?.unitName}
                          </h6>
                          <h6 style={{ fontSize: "13px" }}>
                            Duration - {item?.duration}
                          </h6>
                          <p
                            style={{
                              color: "grey",
                              fontSize: "12px",
                              margin: "10px 0px 10px 0px",
                              // cursor:""
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title={item?.description}
                          >
                            {item?.description?.length < 100
                              ? item?.description
                              : `${item?.description?.substring(0, 100)}...`}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p style={{ fontSize: "12px" }}>
                            Company Name <br />
                            {item?.User?.userInfo?.CompanyName}
                          </p>
                          <p className="venderservicephone">
                            <IoIosCall size={15} /> {item?.User?.Phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {metaData.totalItems > 30 && (
                <div className="row">
                  <div className="col-md-7">
                    <Pagination
                      page={page}
                      setPage={setPage}
                      List={VendorList}
                      metaData={metaData}
                      searchShow={false}
                    />
                  </div>
                </div>
              )}
                 {VendorList.length <= 0 && !Loader && (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
