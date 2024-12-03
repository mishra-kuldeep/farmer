"use client"
import React, { useState, useEffect,useRef } from 'react'
import "../../../component/homepage/section1/section1home.css"
import { Image_URL } from "@/helper/common";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useRouter } from "next/navigation";

import "./viewAll.css"
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

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

    const [saveforlaterId, setsaveforlaterId] = useState("");
    const [Products, setProducts] = useState([]);
    const [savelaterLoader, setSvaeLaterLoader] = useState(false);
    const [wishList, setWishList] = useState([]);
    const [wishFullList, setFullWishList] = useState([]);
    const [loadingInspection, setLoadingInspection] = useState(false)
    const [inspectionData, setInspectionData] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(null);
    const [loading, setLoading] = useState(true);
    const country = useSelector((state) => state.country);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [showFilter, setShowFilter] = useState(true)
    const [showVerifiedModal, setShowVerifiedModal] = useState(false);
    console.log(Products)
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
            setLoading(false)
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
    }
    const closeVerifiedModal = () => {
        setShowVerifiedModal(false);
        setSelectedProduct(null);
        setInspectionData({})

    };
    useEffect(() => {
        if (user?.profile?.country || country?.country?.countryId) {
            initApi();
        }
        saveLaterList();
    }, [user?.profile?.country, country?.country?.countryId]);
    const showHideFunction = () => {
        setShowFilter(!showFilter)
    }
    const scrollContainerRef = useRef(null);
      // Handle the scroll event
  const handleScroll = (e) => {
    console.log("scroll event",scrollContainerRef)
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild.offsetWidth; // Get the width of the first card
      scrollContainerRef.current.scrollBy({
        top: e.deltaY > 0 ? cardWidth : -cardWidth, // Scroll down or up based on the wheel direction
        behavior: "smooth", // Smooth scroll
      });
    }
  };
 
    return (
        <div className='container mt-6'>
            <div className='showHideFilter' onClick={showHideFunction}>
                {showFilter ? <span><BiSolidHide /> Hide Filter</span> : <span><BiSolidShow /> Show Filter</span>}
            </div>
            <div className="row my-4 cartParentRow">
                {showFilter && (
                    <div className="col-md-3  filterContainerHeight">

                        <div className='shopcategoryContainer'>
                            <p className='viewAllFilterheading'>Filter by Category</p>
                            <ul className='viewAllList'>
                                <li>
                                    <div
                                        className={`${selectedCategory == 1 &&
                                            "filterSELECTED"
                                            } filterHover mb-1 p-1`}
                                    //   onClick={() =>
                                    //     handleCategoryChange(category?.VendorServicesMasterId)
                                    //   }
                                    >
                                        {selectedCategory == 0 ? (
                                            <VscCircleLargeFilled
                                                size={22}
                                                color="var(--mainColor)"
                                            />
                                        ) : (
                                            <VscCircleLargeFilled size={22} color="#dadada" />
                                        )}
                                        <label className="ms-2">Price</label>
                                    </div>


                                </li>
                            </ul>
                            <h2></h2>

                        </div>
                    </div>
                )}

                <div className={showFilter ? "col-md-9" : "col-md-12"}>
                    <div className=" viewAllcartRow  bg-light my-2 py-2 gap-4  " ref={scrollContainerRef} 
                    onWheel={handleScroll}
                    
                    style={{
                        overflowX: "auto", // Enable horizontal scrolling
                        overflowY: "hidden", // Hide the vertical scrollbar
                        whiteSpace: "nowrap", // Prevent wrapping of items
                      }}
                    
                    >
                           {loading && <div className="loader">Loading...</div>}
                        {Products.map((ele) => (
                            <div className="viewAllcartCol px-1 " key={ele.productDtlId}>
                                <div className="bestseller_cards">
                                    <div >
                                        <div className="image_div">
                                            <img
                                                src={`${Image_URL}/Products/${ele?.ProductsImages[0]?.url}`}
                                                alt="product image"
                                                onClick={() => router.push(`/product/${ele?.slug}`)}
                                            />
                                        </div>
                                        <h6 className="mt-2 mb-0">{ele.productDtlName}</h6>
                                        {ele?.productInspection && <div class="verified-badge" onClick={() => openVerifiedModal(ele)}>Verified</div>}
                                        <div className="d-flex my-2 justify-content-between kisanNamelocation" onClick={() => router.push(`/product/${ele?.slug}`)}>
                                            <p>
                                                <IoIosPerson size={15} />
                                                <span className="ms-1">{ele.User.FirstName}</span>
                                            </p>
                                            <p>
                                                <MdOutlineLocationOn size={20} />
                                                <span className="ms-1">{ele.User.userInfo.City}</span>
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="rating_wrap">
                                                <p className="centerAllDiv rating">
                                                    <span className="fw-bold">{ele.averageRating}.0</span>
                                                    <FaStar size={10} className="ms-1" />
                                                </p>
                                                <span className="rating_unit">
                                                    {ele.averageRating} Ratings
                                                </span>
                                            </div>
                                            <span className="rating_unit">
                                                {ele?.ProductGrade?.gradeName} grade
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="mt-2 fw-bold fs-6">
                                                ₹{" "}
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
                                                onClick={() => addCartHandler(ele.productDtlId)}
                                            >
                                                Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

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
                            <p><strong>Product Name:</strong> {selectedProduct?.productDtlName}</p>
                            {/* <p><strong>Inspection ID:</strong> {inspectionData.inspectionId}</p> */}
                            <p><strong>Inspection Status:</strong> {inspectionData.inspectionStatus}</p>
                            <p><strong>Compliance Level:</strong> {inspectionData.complianceLevel}</p>
                            <p><strong>Inspected Quantity:</strong> {inspectionData.inspectedQuantity}</p>
                            <p><strong>Inspection Date:</strong> {inspectionData.inspectionDate}</p>
                            {/* <p><strong>Issues Found:</strong> {inspectionData.issuesFound}</p> */}
                            <p><strong>Next Inspection Due:</strong> {inspectionData.nextInspectionDue}</p>
                            <p><strong>Remarks:</strong> {inspectionData.remarks}</p>
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
    )
}

export default Page