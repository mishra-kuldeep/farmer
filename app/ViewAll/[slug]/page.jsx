"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../../../component/homepage/section1/section1home.css";
import { Image_URL } from "@/helper/common";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useRouter } from "next/navigation";

import "./viewAll.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteCart, updateCart } from "@/redux/cart/cartSlice";
import toast from "react-hot-toast";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import SaveForLaterServices from "@/services/SaveForLaterServices";
import { FiHeart } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";
import MediumLoader from "@/component/reusableComponent/MediumLoader";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { IoMdHeart } from "react-icons/io";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import VeiwAllFilter from "@/component/homepage/veiwAllFilter/VeiwAllFilter";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subcategotyId = searchParams.get("subcategotyId");
  const categotyId = searchParams.get("categotyId");

  console.log("categotyId = ", categotyId);
  console.log("subcategotyId = ", subcategotyId);
  const [page, setPage] = useState(1); // Page number for API call

  const [saveforlaterId, setsaveforlaterId] = useState("");
  const [Products, setProducts] = useState([]);
  const [savelaterLoader, setSvaeLaterLoader] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [wishFullList, setFullWishList] = useState([]);
  const [loadingInspection, setLoadingInspection] = useState(false);
  const [inspectionData, setInspectionData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const country = useSelector((state) => state.country);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const initApi = async () => {
    setLoading(true)
    try {
      const searchResult = await ProductsDtlServices.getProductsDtl({
        page: page,
        search: "",
        category: categotyId == null ? "" : categotyId,
        subCategory: subcategotyId == null ? "" : subcategotyId,
        brand: "",
        countryId: user?.profile?.country
          ? user?.profile?.country
          : country?.country?.countryId,
      });
      setProducts((prevProducts) => [...prevProducts, ...searchResult?.data?.data||[]]);
      // setProducts(searchResult?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };
  const saveLaterList = () => {
    SaveForLaterServices.getAllWishList()
      .then(({ data }) => {
        setWishList(data?.map((ele) => ele?.productDtlId));
        setFullWishList(data);
      })
      .catch((err) => console.log(err));
  };
  // Function to handle scroll event
  const handleWheel = useCallback((event) => {
    // Check if the user is scrolling down
    if (event.deltaY > 0 && !loading) {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
        setPage((prevPage) => prevPage + 1); // Increment page when reaching bottom
      }
    }
  }, [loading]);
  // Add product to cart
  const addCartHandler = (id) => {
    if (!user?.isLoggedIn) {
      toast("Please login to add products to the cart!", {
        icon: "😢",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
    } else {
      const cartObj = {
        buyerId: user?.profile?.id,
        productDtlId: id,
        quantity: 1,
      };
      dispatch(addToCart(cartObj));
    }
  };
  // Update product quantity in the cart
  const updateCartQuantity = (productDtlId, newQuantity, action) => {
    const cartItem = cart?.cart?.find(
      (item) => item.productDtlId === productDtlId
    );
    if (cartItem) {
      const updatedCart = {
        buyerId: user?.profile?.id,
        quantity: newQuantity,
        productDtlId,
      };
      setLoadingProductId(productDtlId);
      setLoadingAction(action);
      dispatch(
        updateCart({ cartId: cartItem.cartId, data: updatedCart })
      ).finally(() => {
        setLoadingProductId(null);
        setLoadingAction(null);
      });
    }
  };
  // Handle quantity increase
  const increaseQuantity = (id) => {
    const cartItem = cart?.cart?.find((item) => item.productDtlId === id);
    if (cartItem) {
      updateCartQuantity(id, cartItem.quantity + 1, "increment");
    }
  };
  // Handle quantity decrease
  const decreaseQuantity = (id) => {
    const cartItem = cart?.cart?.find((item) => item.productDtlId === id);
    if (cartItem && cartItem.quantity > 1) {
      updateCartQuantity(id, cartItem.quantity - 1, "decrement");
    } else if (cartItem.quantity == 1) {
      dispatch(deleteCart(cartItem?.cartId));
    }
  };
  const saveforLater = (productDtlId) => {
    if (!user?.isLoggedIn) {
      toast("Please login to wishlist this product", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "red",
          color: "#fff",
        },
      });
      return;
    }
    setsaveforlaterId(productDtlId);
    if (productDtlId) {
      if (wishList?.includes(productDtlId)) {
        const obj = wishFullList.find(
          (ele) => ele.productDtlId == productDtlId
        );
        setSvaeLaterLoader(true);
        SaveForLaterServices.removeForLater(obj?.SaveForLaterId)
          .then(({ data }) => {
            setWishList(wishList.filter((ele) => ele != productDtlId));
            setFullWishList(
              wishFullList.filter((ele) => ele.productDtlId != productDtlId)
            );
            setSvaeLaterLoader(false);
            toast(data?.message, {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "green",
                color: "#fff",
              },
            });
          })
          .catch((err) => {
            console.log(err);
            setSvaeLaterLoader(false);
          });
      } else {
        setSvaeLaterLoader(true);
        SaveForLaterServices.saveForLater({
          userId: user?.profile?.id,
          productDtlId: productDtlId,
        })
          .then(({ data }) => {
            data?.savedProduct?.productDtlId &&
              setWishList((pre) => [...pre, data?.savedProduct?.productDtlId]);
            data?.savedProduct &&
              setFullWishList((pre) => [...pre, data?.savedProduct]);
            setSvaeLaterLoader(false);
            toast(data?.message, {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "green",
                color: "#fff",
              },
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const openVerifiedModal = (product) => {
    setSelectedProduct(product);
    setShowVerifiedModal(true);
    setLoadingInspection(true);
    ProductFarmerServices?.getProductInspection(product?.productDtlId)
      .then(({ data }) => {
        setInspectionData(data);
        setLoadingInspection(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingInspection(false);
      });
  };
  const closeVerifiedModal = () => {
    setShowVerifiedModal(false);
    setSelectedProduct(null);
    setInspectionData({});
  };
  useEffect(() => {
    if (user?.profile?.country || country?.country?.countryId) {
      initApi();
    }
    saveLaterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.profile?.country,
    country?.country?.countryId,
    categotyId,
    subcategotyId,
    page,
  ]);

  const showHideFunction = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div  onWheel={handleWheel}>
      <div
        style={{
          position: "sticky",
          top: "57px",
          zIndex: 100,
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center py-1">
          <div className="showHideFilter " onClick={showHideFunction}>
            {showFilter ? (
              <span>
                <BiSolidHide /> Hide Filter
              </span>
            ) : (
              <span>
                <BiSolidShow /> Show Filter
              </span>
            )}
          </div>
          <div className="d-flex gap-3 align-items-center">
            <button className="paginationbtnarrowdisable">
              <IoIosArrowBack className="" />
            </button>
            Page (1/3)
            <button className="paginationbtnarrow">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-1">
        <div className="row my-2 cartParentRow">
          {showFilter && (
            <div className="col-md-3  filterContainerHeight">
              <VeiwAllFilter />
            </div>
          )}

          <div className={showFilter ? "col-md-9" : "col-md-12"}>
            <div
              className=" viewAllcartRow py-3 gap-2"
              style={{
                overflowX: "auto", // Enable horizontal scrolling
                overflowY: "hidden", // Hide the vertical scrollbar
                whiteSpace: "nowrap", // Prevent wrapping of items
                backgroundColor: "#dadada",
              }}
            >
             
              {Products.map((ele,i) => (
                <div
                  className="viewAllcartCol px-1 mb-2"
                  key={i}
                >
                  <div className="bestseller_cards">
                    <div>
                      <div className="image_div">
                        <img
                          src={`${Image_URL}/products/${ele?.ProductsImages[0]?.url}`}
                          alt="product image"
                          onClick={() => router.push(`/product/${ele?.slug}`)}
                        />
                      </div>
                      <h6 className="mt-2 mb-0">{ele.productDtlName}</h6>
                      {ele?.productInspection && (
                        <div
                          class="verified-badge"
                          onClick={() => openVerifiedModal(ele)}
                        >
                          Verified
                        </div>
                      )}
                      <div
                        className="d-flex my-2 justify-content-between kisanNamelocation"
                        onClick={() => router.push(`/product/${ele?.slug}`)}
                      >
                        <p>
                          <IoIosPerson size={15} />
                          <span className="ms-1">{ele?.User?.FirstName}</span>
                        </p>
                        <p>
                          <MdOutlineLocationOn size={20} />
                          <span className="ms-1">
                            {ele?.User?.userInfo?.City}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="rating_wrap">
                          <p className="centerAllDiv rating">
                            <span className="fw-bold">
                              {ele?.averageRating}.0
                            </span>
                            <FaStar size={10} className="ms-1" />
                          </p>
                          <span className="rating_unit">
                            {ele?.averageRating} Ratings
                          </span>
                        </div>
                        <span className="rating_unit">
                          {ele?.ProductGrade?.gradeName} grade
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mt-2 fw-bold fs-6">
                          {ele?.country?.currencySymbol}{" "}
                          {ele?.discountType == "percentage"
                            ? ele?.price - (ele?.price * ele?.discount) / 100
                            : ele?.price - ele?.discount}
                          /{ele?.ProductUnit?.unitName}
                          {ele.discount !== 0 && (
                            <sub className="ms-1">
                              <del className="text-secondary fw-light">
                                {ele?.country?.currencySymbol}
                                {ele.price}/{ele?.ProductUnit?.unitName}
                              </del>
                            </sub>
                          )}
                        </h5>
                        <p className="rating_unit">
                          {ele?.quantity} {ele?.ProductUnit?.unitName}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="bookmark_btn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Save for Later"
                        onClick={() => saveforLater(ele.productDtlId)}
                      >
                        {savelaterLoader &&
                        ele.productDtlId === saveforlaterId ? (
                          <MiniLoader />
                        ) : wishList.includes(ele.productDtlId) ? (
                          <IoMdHeart size={20} color="red" />
                        ) : (
                          <FiHeart size={20} color="grey" />
                        )}
                      </button>
                      {cart?.cart?.find(
                        (item) => item.productDtlId === ele.productDtlId
                      ) ? (
                        <button className="quantitywrap p-0">
                          <span
                            className="minus"
                            onClick={() => decreaseQuantity(ele.productDtlId)}
                          >
                            {loadingProductId === ele.productDtlId &&
                            loadingAction === "decrement" ? (
                              <MiniLoader />
                            ) : (
                              <FaMinus size={15} />
                            )}
                          </span>
                          <span>
                            {
                              cart?.cart?.find(
                                (item) => item.productDtlId === ele.productDtlId
                              )?.quantity
                            }
                          </span>
                          <span
                            className="plus"
                            onClick={() => increaseQuantity(ele.productDtlId)}
                          >
                            {loadingProductId === ele.productDtlId &&
                            loadingAction === "increment" ? (
                              <MiniLoader />
                            ) : (
                              <FaPlus size={15} />
                            )}
                          </span>
                        </button>
                      ) : (
                        <button
                          className="addtoCart_btn"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Add to Cart"
                          onClick={() => addCartHandler(ele.productDtlId)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
               {loading && <div className="loader">Loading...</div>}
            </div>
          </div>
        </div>

        <Modal show={showVerifiedModal} onHide={closeVerifiedModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Product Inspection Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loadingInspection && <MediumLoader />}
            {!loadingInspection && inspectionData && (
              <>
                <p>
                  <strong>Product Name:</strong>{" "}
                  {selectedProduct?.productDtlName}
                </p>
                {/* <p><strong>Inspection ID:</strong> {inspectionData.inspectionId}</p> */}
                <p>
                  <strong>Inspection Status:</strong>{" "}
                  {inspectionData.inspectionStatus}
                </p>
                <p>
                  <strong>Compliance Level:</strong>{" "}
                  {inspectionData.complianceLevel}
                </p>
                <p>
                  <strong>Inspected Quantity:</strong>{" "}
                  {inspectionData.inspectedQuantity}
                </p>
                <p>
                  <strong>Inspection Date:</strong>{" "}
                  {inspectionData.inspectionDate}
                </p>
                {/* <p><strong>Issues Found:</strong> {inspectionData.issuesFound}</p> */}
                <p>
                  <strong>Next Inspection Due:</strong>{" "}
                  {inspectionData.nextInspectionDue}
                </p>
                <p>
                  <strong>Remarks:</strong> {inspectionData.remarks}
                </p>
                {/* <p><strong>Resolution Date:</strong> {inspectionData.resolutionDate}</p> */}

                {/* Download PDF if available */}
                {inspectionData.url && (
                  <Button
                    variant="primary"
                    href={`${Image_URL}/inspection/${inspectionData.url}`}
                    src={`${Image_URL}/inspection/${inspectionData.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeVerifiedModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
