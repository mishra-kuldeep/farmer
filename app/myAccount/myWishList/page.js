"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { Image_URL } from "@/helper/common";
import SaveForLaterServices from "@/services/SaveForLaterServices";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Lottie from 'react-lottie';



const WishList = () => {
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [btnLoading, setbtnLoading] = useState(false);
  const [romoveID, setRomoveID] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('../../../public/nowishlist.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    setLoading(true);
    SaveForLaterServices.getAllWishList()
      .then(({ data }) => {
        console.log(data)
        setWishList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const hendleRemove = (id) => {
    setRomoveID(id);
    setbtnLoading(true);
    SaveForLaterServices.removeForLater(id)
      .then(({ data }) => {
        console.log(data);
        setWishList(wishList.filter((ele) => ele?.SaveForLaterId !== id));
        setbtnLoading(false);
        setRomoveID(null);
        toast('remove successfully', {
          style: {
            borderRadius: "5px",
            background: "green",
            color: "#fff",
          },
        });

      })
      .catch((err) => {
        console.log(err);
        setbtnLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          <span className="mr-3">Loading...</span>
        </div>
      ) : (
        <div>
          {
            wishList?.length === 0 ? (

              <div style={{ height: "80vh" }} className="centerAllDiv">
                <Lottie options={defaultOptions} height={400} width={400} />
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
                            alt="image"
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
                        {btnLoading && (romoveID == ele?.SaveForLaterId) ?
                          (
                            <div className="col-md-1 centerAllDiv">
                              <MiniLoader />
                            </div>
                          )
                          : (<div className="col-md-1 centerAllDiv"
                            onClick={() => hendleRemove(ele?.SaveForLaterId)}>
                            <RiDeleteBin5Fill size={25} color="red" />
                          </div>)}
                      </div>
                    </>
                  );
                })}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default WishList;
