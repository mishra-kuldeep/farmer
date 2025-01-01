"use client";
import React, { useEffect, useRef, useState } from "react";
import "./section1home.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { isMobile } from "react-device-detect";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { addToCart, deleteCart, updateCart } from "@/redux/cart/cartSlice";
import toast from "react-hot-toast";
import SaveForLaterServices from "@/services/SaveForLaterServices";
import { Modal, Button } from "react-bootstrap";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import MediumLoader from "@/component/reusableComponent/MediumLoader";


const Section1Home = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const [Products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [saveforlaterId, setsaveforlaterId] = useState("");
  const [savelaterLoader, setSvaeLaterLoader] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const [wishFullList, setFullWishList] = useState([]);
  const [loadingInspection, setLoadingInspection] = useState(false);
  const [inspectionData, setInspectionData] = useState({});
  const country = useSelector((state) => state.country);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initApi = async () => {
    try {
      const searchResult = await ProductsDtlServices.getProductsDtl({
        page: 1,
        search: "",
        countryId: user?.profile?.country
          ? user?.profile?.country
          : country?.country?.countryId,
      });
      setProducts(searchResult?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };
console.log(country)
  const saveLaterList = () => {
    SaveForLaterServices.getAllWishList()
      .then(({ data }) => {
        setWishList(data?.map((ele) => ele?.productDtlId));
        setFullWishList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user?.profile?.country || country?.country?.countryId) {
      initApi();
    }
    saveLaterList();
  }, [user?.profile?.country, country?.country?.countryId]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      console.log(containerWidth)
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= isMobile
          ? (containerWidth * 66.5) / 100
          : (containerWidth * 50) / 100;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += isMobile
          ? (containerWidth * 66.5) / 100
          : (containerWidth * 50) / 100;
      }
    }
  };
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
    ProductFarmerServices.getProductInspection(product.productDtlId)
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
  return (
    <div className="container">
      <div className="bestSellerWrapper p-md-3 p-0">
        <div className="headerbestSeller p-2">
          <h5 className="mobilehome_title">Best Sellers</h5>
          <div className="arrowBtn_bestSeller">
            <p
              className="Show_More_bestSeller"
              onClick={() => router.push("/ViewAll/Product")}
            >
              Show More
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("left")}
            >
              <IoIosArrowBack />
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("right")}
            >
              <IoIosArrowForward />
            </p>
          </div>
        </div>
        <div
          className="bestseller_cards_wrap overflowscrollhidden row m-0"
          ref={scrollContainerRef}
        >
          {Products.map((ele) => (
            <div className="col-md-3 col-8 px-2 " key={ele.productDtlId}>
              <div className="bestseller_cards">
                <div>
                  <div className="image_div">
                    <img
                      src={`${Image_URL}/Products/${ele.ProductsImages[0]?.url}`}
                      alt="product image"
                      onClick={() => router.push(`/product/${ele.slug}`)}
                    />
                  </div>
                  <h6 className="mt-2 mb-0">{ele.productDtlName}</h6>
                  {ele.productInspection && (
                    <div
                      className="verified-badge"
                      onClick={() => openVerifiedModal(ele)}
                    >
                      Verified
                    </div>
                  )}
                  <div
                    className="d-flex my-2 justify-content-between kisanNamelocation"
                    onClick={() => router.push(`/product/${ele.slug}`)}
                  >
                    <p>
                      <IoIosPerson className="kisanNamelocationIcon" />
                      <span className="ms-1">{ele?.User?.FirstName}</span>
                    </p>
                    <p>
                      <MdOutlineLocationOn className="kisanNamelocationIcon" />
                      <span className="ms-1">{ele?.User?.userInfo?.City}</span>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="rating_wrap">
                      <p className="centerAllDiv rating">
                        <span className="fw-bold">
                          {ele?.averageRating?.toFixed(1)}
                        </span>
                        <FaStar size={10} className="ms-1" />
                      </p>
                      <span className="rating_unit">
                        {ele.numberOfRatings} Ratings
                      </span>
                    </div>
                    <span className="rating_unit">
                      {ele?.ProductGrade?.gradeName} grade
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mt-2 fw-bold fs-6">
                      {ele?.country?.currencySymbol}{" "}
                      {ele.discountType == "percentage"
                        ? ele.price - (ele.price * ele.discount) / 100
                        : ele.price - ele.discount}
                      /{ele?.ProductUnit?.unitName}
                      {ele.discount !== 0 && (
                        <sub className="ms-1">
                          <del className="text-secondary fw-light">
                            ₹{ele.price}/{ele?.ProductUnit?.unitName}
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
                    {savelaterLoader && ele.productDtlId === saveforlaterId ? (
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
                      disabled={!ele?.available}
                      onClick={() => addCartHandler(ele.productDtlId)}
                    >
                      {ele?.available ? "Add" : "out of stock"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
                <strong>Product Name:</strong> {selectedProduct?.productDtlName}
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
  );
};

export default Section1Home;
