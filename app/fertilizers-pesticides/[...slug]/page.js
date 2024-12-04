"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../vender/[...slug]/vender.css";
import { IoIosCall } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";
import { useSelector } from "react-redux";
import FertilizersPesticideServices from "@/services/FertilizersPesticideServices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { FaSearch } from "react-icons/fa";
import "../../adverts/[...slug]/adverts.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import Pagination from "@/component/reusableComponent/Pagination";
import { Image_URL } from "@/helper/common";

const catFilter = [
  {
    id: 1,
    title: "Distributors(Bulk orders)",
    goesTo: "/fertilizers-pesticides/1",
    // status: user?.profile?.role == 4 || 3,
  },
  {
    id: 2,
    title: "Dealers(Small Orders)",
    goesTo: "/fertilizers-pesticides/2",
    // status: user?.profile?.role == 4 || 3,
  },
  {
    id: 3,
    title: "Retailer",
    goesTo: "/fertilizers-pesticides/3",
    // status: user?.profile?.role == 4 || 3,
  },
];
const Page = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [categorryFilter, setCategoryFilter] = useState(true);
  const country = useSelector((state) => state.country);
  const { slug } = useParams();
  const [FertilizersPesticidesList, setFertilizersPesticidesList] = useState(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [Loader, setLoader] = useState(false);
  const [currencySymbol, seetcurrencySymbol] = useState("₹");
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState({});
  const user = useSelector((state) => state.auth);

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
  };
  const handleSearch = () => {
    fertilizer();
  };
  const handleSearchInputChange = (e) => {
    setsearchTerm(e.target.value);
  };

  const changeRouterPage = (id) => {
    router.push(`/fertilizers-pesticides/detail/${id}`);
  };

  const fertilizer = () => {
   
    const data = {
      status: "Approved",
      slug: selectedCategory,
      page: page,
      pageSize: 30,
      searchText: searchTerm,
      location: location,
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
    };
    if (data.countryId) {
      setLoader(true);
      FertilizersPesticideServices.getAllFertilizersPesticide(data)
        .then(({ data }) => {
          setFertilizersPesticidesList(data.data);
          setmetaData(data.meta);
          setLoader(false);

        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    fertilizer();
  }, [
    user?.profile?.country,
    country?.country?.countryId,
    location,
    selectedCategory,
  ]);

  useEffect(() => {
    setSelectedCategory(slug);
  }, [user?.profile?.country, country?.country?.countryId]);

  return (
    <>
      <div>
        <div className="container">
          <div className=" py-1">
            <div className="search_wrapper my-4">
              <input
                type="text"
                placeholder="Search by fertilizer-pesticide name..."
                onChange={handleSearchInputChange}
                value={searchTerm}
              />
              <button onClick={handleSearch}>
                <FaSearch color="#fff" />
              </button>
            </div>
          </div>
          <div className="row ">
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
                      placeholder="Search by pin/Postal Code..."
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
                      {catFilter?.map((category, index) => {
                        return (
                          <div
                            key={index}
                            className={`${
                              selectedCategory == category?.id &&
                              "filterSELECTED"
                            } filterHover mb-1 p-1`}
                            onClick={() => handleCategoryChange(category?.id)}
                          >
                            {selectedCategory == category?.id ? (
                              <VscCircleLargeFilled
                                size={22}
                                color="var(--mainColor)"
                              />
                            ) : (
                              <VscCircleLargeFilled size={22} color="#dadada" />
                            )}
                            <label className="ms-2">{category?.title}</label>
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
                <h3 className="my-2"> Ads For Fertilizers & Pesticides </h3>
              </div>
              {Loader ? (
                <div style={{ height: "40vh" }} className="centerAllDiv">
                  <MiniLoader />
                  <span className="mr-3">Loading...</span>
                </div>
              ) : (
                <>
                  <div className="row">
                    {FertilizersPesticidesList?.map((item, i) => {
                      return (
                        <div
                          className="col-md-4 mt-4"
                          key={i}
                          onClick={() =>
                            changeRouterPage(item?.serviceId)
                          }
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
                                }}
                              >
                                {item?.description}
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
                      );
                    })}
                    {metaData.totalItems > 30 && (
                      <div className="row">
                        <div className="col-md-7">
                          <Pagination
                            page={page}
                            setPage={setPage}
                            List={FertilizersPesticidesList}
                            metaData={metaData}
                            searchShow={false}
                          />
                        </div>
                      </div>
                    )}
                    {FertilizersPesticidesList.length == 0 && !Loader && (
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
                          Please try another search or click here to see the
                          latest ads.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
