import React, { useEffect, useState } from "react";
import "./search.css";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { useRouter } from "next/navigation";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import { Image_URL } from "@/helper/common";
const Search = () => {
  const [open, setOpen] = useState(false);
  const [queryes, setquery] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const router = useRouter();

  const handleSearch = (e) => {
    const query = e.target.value;
    setquery(query);
    if (query.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
      // setquery('');
    }
  };

  const handleGetProduct = async (val) => {
    try {
      const searchResult = await ProductsDtlServices.getProductsDtl({
        page: 1,
        search: val,
      });
      setSearchProduct(searchResult?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchProduct([]);
      setOpen(false);
    }
  };

  const handlegoSingleProduct = (slug) => {
    router.push(`/product/${slug}`);
    setOpen(false);
    setquery("");
  };

  useEffect(() => {
    handleGetProduct(queryes);
  }, [queryes]);

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
      setquery("");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-100 position-relative">
      <input
        type="search"
        className="form-control"
        value={queryes}
        onChange={handleSearch}
        placeholder="Search for Products ..."
      />
      {open && (
        <div className="search_list_wrapper">
          <p className="titless">
            Showing result of <b>"{queryes}"</b>
          </p>
          {searchProduct?.map((ele, i) => (
            <div className="singleProductWrap">
              <img
                src={`${Image_URL}/Products/${ele.ProductsImages[0].url}`}
                alt="image"
                className="searchImagesss"
              />
              <div className="searchDeatailwrap">
                <div
                  onClick={() => handlegoSingleProduct(ele?.slug)}
                >
                  <span className="productNameSearch">{ele?.productDtlName}</span>
                </div>
                <div><span className="searchDeatailUnit">1 {ele.unit}</span></div>
                <div><span className="searchDeatailprice">₹{ele.price}</span></div>
                <div>
                 <span className="searchDeatailOfer"> {ele.discountType === "fixed" && "₹"}
                  {ele.discount}
                  {ele.discountType === "percentage" && "%"} OFF</span>
                </div>
                <div>
                  <button className="searchDeatailaddBtn">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
