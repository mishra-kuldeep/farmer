"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { Image_URL } from "@/helper/common";
import SaveForLaterServices from "@/services/SaveForLaterServices";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WishList = () => {
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    setLoading(true);
    SaveForLaterServices.getAllWishList()
      .then(({ data }) => {
        console.log(data);
        setWishList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          <span className="mr-3">Loading...</span>
        </div>
      ) : (
        <div>
          {wishList?.map((ele) => {
            return (
              <>
                <div className="row m-0 p-3 mb-4 border rounded">
                  <Link
                    className="col-md-2"
                    href={`/product/${ele?.productDetail?.slug}`}
                  >
                    <img
                      src={`${Image_URL}/products/${ele?.productDetail?.ProductsImages[0]?.url}`}
                      width="100%"
                      height="180px"
                    />
                  </Link>
                  <Link
                    href={`/product/${ele?.productDetail?.slug}`}
                    className="col-md-9"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div>
                      <h6>{ele?.productDetail?.productDtlName}</h6>
                      <h6>{ele?.productDetail?.price}</h6>
                    </div>
                  </Link>
                  <Link href="#" className="col-md-1 centerAllDiv">remove</Link>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
