"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./adsCategory.css";
import "../adverts/[...slug]/adverts.css";
import RentServices from "@/services/RentService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Image_URL } from "@/helper/common";

const Page = () => {
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const goNextPage = (id) => {
    router.push(`/adverts/${id}`);
  };

  useEffect(() => {
    RentServices?.getRentCategory()
      .then(({ data }) => {
        setCategoryList(data);
        setFilteredCategoryList(data);
      })
      .catch((e) => console.log(e));
  }, [user?.profile?.country, country?.country?.countryId]);

  const handleSearch = () => {
    const searchCat = categoryList.filter((val) =>
      val?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategoryList(searchCat);
  };
  const viewAll = () => {};
  const categoryimg = [
    "https://www.farmersmarket.ie/media/gpzhgfut/istock-91580444.jpg?anchor=center&mode=crop&width=250&height=225&rnd=132931996245270000",
    "https://www.farmersmarket.ie/media/t40nlet2/thompson-dairy-farm-7727.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906087644530000",
    "https://www.farmersmarket.ie/media/4zslqhgn/page-3_.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132836312616970000",
    "https://www.farmersmarket.ie/media/no1bibzu/land-3.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906087516570000",
    "https://www.farmersmarket.ie/media/fwvfbblx/ballingarde-land-ariel.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132839746492070000",
    "https://www.farmersmarket.ie/media/kobfaext/ifj-shanballymore-11.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906089152770000",
    "https://www.farmersmarket.ie/media/bmrdoyhq/amazone-spreader-zav-2021-deutz-3-1.jpg?anchor=center&mode=crop&width=250&height=225&rnd=132931105464570000",
  ];

  return (
    <div className="container pt-md-3 pt-1 px-1">
      <div className="search_wrapper mb-md-3 mb-1">
        <input
          type="text"
          placeholder="Search categories..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button onClick={handleSearch}>
          <FaSearch color="#fff" />
        </button>
      </div>
      <div className="rounded py-3 p-1" style={{ border: "4px solid #ddd" }}>
        <div className="d-flex justify-content-between mb-3 px-3">
          <h5 className="mobilehome_title">All categories</h5>
          <p onClick={viewAll} className="mobilehome_title">
            <u>View all categories</u>
          </p>
        </div>

        <div className="adsCatogryWrapper">
          {filteredCategoryList.length > 0 ? (
            filteredCategoryList.map((category, index) => (
              <div
                className="adsCategory"
                key={index}
                onClick={() => goNextPage(category?.rentCategoryId)}
              >
                <div className="imageWrapperAdd">
                  <img
                    src={
                      category.url !== "default_url"
                        ? `${Image_URL}/CatImage/${category?.url}`
                        : categoryimg[index % categoryimg.length]
                    }
                    alt={category?.name}
                  />
                </div>
                <h6>
                  <u>{category?.name}</u>
                </h6>
              </div>
            ))
          ) : (
            <p className="text-center">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
