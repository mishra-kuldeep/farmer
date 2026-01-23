"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./productPage.css";
import { FaHome, FaStar, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SellerContactServices from "@/services/SellerContactServices";
import WhyProducthoose from "@/component/productCompo/WhyProducthoose";
import AboutTheProduct from "@/component/productCompo/AboutTheProduct";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { MdProductionQuantityLimits } from "react-icons/md";
import ProductRating from "@/component/productCompo/ProductRating";

const Product = () => {
  const user = useSelector((state) => state.auth);
  // const cart = useSelector((state) => state.cart); // Removed cart
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [index, setIndex] = useState(0);
  
  // Contact State
  const [loadingContact, setLoadingContact] = useState({ mobile: false, email: false });
  const [contactInfo, setContactInfo] = useState({ mobile: null, email: null });
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  // const dispatch = useDispatch(); // Not needed if no cart actions? User might need it? 
  // keeping dispatch just in case or removing if unused
  
  // Fetch product details
  const handleGetProduct = async () => {
    try {
      const singleProductResult =
        await ProductsDtlServices.getsingleProductsDtl(slug);
      setSingleProduct(singleProductResult?.data?.singleproduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      setSingleProduct({});
    }
  };

  const handleShowContact = (type) => {
    if (!user?.isLoggedIn) {
      toast("Please login to view contact details!", {
        icon: "🔒",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
      return;
    }
    
    // Check if already fetched
    if (type === 'Mobile' && contactInfo.mobile) return;
    if (type === 'Email' && contactInfo.email) return;

    setLoadingContact(prev => ({ ...prev, [type.toLowerCase()]: true }));

    SellerContactServices.getSellerContact({
      sellerId: singleProduct?.User?.UserCode,
      type: type 
    }).then(({ data }) => {
        if (data?.success) {
            setContactInfo(prev => ({ ...prev, [type.toLowerCase()]: data.contact }));
            if (type === 'Mobile') setShowWhatsapp(true);
        } else {
             toast("Could not fetch details", { icon: "❌" });
        }
    }).catch(err => {
        if (err?.response?.status === 403) {
             toast("This contact info is private.", { icon: "🔒" });
        } else {
             toast("Error fetching details", { icon: "❌" });
        }
    }).finally(() => {
        setLoadingContact(prev => ({ ...prev, [type.toLowerCase()]: false }));
    });
  };

  const openWhatsapp = async () => {
    if (!user?.isLoggedIn) {
      toast("Please login to chat!", {
        icon: "🔒",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
      return;
    }

    let mobile = contactInfo.mobile;

    if (!mobile) {
        setLoadingContact(prev => ({ ...prev, mobile: true }));
        try {
            const { data } = await SellerContactServices.getSellerContact({ 
                sellerId: singleProduct?.User?.UserCode, 
                type: 'Mobile' 
            });
            
            if (data?.success) {
                mobile = data.contact;
                setContactInfo(prev => ({ ...prev, mobile: data.contact }));
                setShowWhatsapp(true);
            } else {
                 toast("Could not fetch contact for chat.", { icon: "❌" });
                 return;
            }
        } catch (err) {
            if (err?.response?.status === 403) {
                 toast("This contact info is private.", { icon: "🔒" });
            } else {
                 toast("Error fetching details", { icon: "❌" });
            }
            return;
        } finally {
            setLoadingContact(prev => ({ ...prev, mobile: false }));
        }
    }

    if (mobile) {
        const cleanNumber = mobile.replace(/\D/g, ''); 
        const message = `Hi, I am interested in your product: ${singleProduct?.productDtlName}`;
        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  useEffect(() => {
    handleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className="container">
      <div className="w-100 overflow-auto">
        <div className="product_categories_navigation">
          <FaHome />
          <span className="cursor">Home</span>
          <span>/</span>
          <span className="cursor">{singleProduct?.productDtlName}</span>

        </div>
      </div>

      <div className="product_basic_detail">
        <div
          className="scrollThumbStyle px-md-2 singleproductImagesss"
        >
          <div className="product_imageList">
            {singleProduct?.ProductsImages?.map((image, i) => (
              <img
                src={`${Image_URL}/products/${image?.url}`}
                alt="image"
                key={i}
                onClick={() => setIndex(i)}
                className={index === i ? "cursor imageborderedGreen" : "cursor"}
              />
            ))}
          </div>
        </div>
        <div className="product_singleImage">
          {singleProduct?.ProductsImages?.length > 0 && (
            <img
              src={`${Image_URL}/products/${singleProduct?.ProductsImages[index]?.url}`}
              alt="image"
            />
          )}
        </div>
        <div className="product_details">
          <h3 className="mb-3">{singleProduct?.productDtlName}</h3>
          <div style={{margin:"-15px 0 0 2px",color:"gray",fontSize:"16px"}}>{singleProduct?.Brand}</div>

          <div className="rating_wrap">
            <p className="centerAllDiv rating">
              <span className="fw-bold">
                {singleProduct?.averageRating?.toFixed(1)}
              </span>
              <FaStar size={10} className="ms-1" />
            </p>
            <span className="rating_unit">
              {singleProduct.numberOfRatings} Ratings
            </span>
          </div>
          <p className="mb-3">
            MRP:{" "}
            <del>
            {singleProduct.country?.currencySymbol}{singleProduct?.price}.00/{singleProduct?.ProductUnit?.unitName}
            </del>
          </p>
          <h6 className="fw-bold  mb-3">
            Price: {singleProduct.country?.currencySymbol}{" "}
            {singleProduct.discountType == "percentage"
              ? singleProduct.price -
                (singleProduct.price * singleProduct.discount) / 100
              : singleProduct.price - singleProduct.discount}
            /{singleProduct?.ProductUnit?.unitName}
            {/* <sub>(₹{singleProduct?.price}/{singleProduct?.ProductUnit?.unitName})</sub> */}
          </h6>
          {singleProduct?.discount > 0 && (
            <h6 className="fw-bold text-success">
              You Save : {singleProduct?.discountType === "fixed" && "₹"}
              {singleProduct?.discount}
              {singleProduct?.discountType === "percentage" && "%"} OFF
            </h6>
          )}
          <p className="text-secondary mb-3">(inclusive of all taxes)</p>
          <p>
            <IoIosPerson size={15} />
            <span className="fw-bold">{singleProduct?.User?.FirstName}</span>
          </p>
          <p>
            <MdOutlineLocationOn size={20} />
            {singleProduct?.User?.userInfo?.City}
          </p>
          <p>
            <MdProductionQuantityLimits size={20} />
            {singleProduct?.quantity} {singleProduct?.ProductUnit?.unitName}
          </p>
          <p>{singleProduct?.ProductGrade?.gradeName} Grade</p>

          <div className="d-flex flex-wrap gap-2 w-100 mt-3 d-none d-md-flex">
                 {!contactInfo.mobile ? (
                    <button 
                        className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => handleShowContact('Mobile')}
                        disabled={loadingContact.mobile}
                    >
                        {loadingContact.mobile ? <MiniLoader /> : <FaPhoneAlt />}
                        Show Mobile
                    </button>
                 ) : (
                    <div className="flex-grow-1 p-2 border rounded d-flex align-items-center justify-content-center gap-2 bg-light text-success fw-bold">
                        <FaPhoneAlt /> {contactInfo.mobile}
                    </div>
                 )}
                 
                 {/* WhatsApp */}
                 <button 
                    className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={openWhatsapp}
                    disabled={loadingContact.mobile}
                 >
                    {loadingContact.mobile ? <MiniLoader /> : <FaWhatsapp size={20} />} Chat
                 </button>

                 {/* Email Contact */}
                 {!contactInfo.email ? (
                    <button 
                         className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                         onClick={() => handleShowContact('Email')}
                         disabled={loadingContact.email}
                    >
                        {loadingContact.email ? <MiniLoader /> : <MdEmail />}
                        Show Email
                    </button>
                 ) : (
                    <div className="flex-grow-1 p-2 border rounded d-flex align-items-center justify-content-center gap-2 bg-light text-primary fw-bold">
                        <MdEmail /> {contactInfo.email}
                    </div>
                 )}
           </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 p-2 bg-white shadow-lg addandlaterbuttonfixed d-block d-md-none" style={{zIndex: 1000}}>
         <div className="d-flex gap-2 w-100">
             {!contactInfo.mobile ? (
                <button 
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleShowContact('Mobile')}
                    disabled={loadingContact.mobile}
                >
                    {loadingContact.mobile ? <MiniLoader /> : <FaPhoneAlt />} Show Mobile
                </button>
             ) : (
                 <div className="w-100 p-2 border rounded d-flex align-items-center justify-content-center gap-2 bg-light text-success fw-bold">
                    <FaPhoneAlt /> {contactInfo.mobile}
                 </div>
             )}
             {(contactInfo.mobile || showWhatsapp) && (
                 <button 
                    className="btn btn-success w-50 d-flex align-items-center justify-content-center gap-2"
                    onClick={openWhatsapp}
                 >
                    <FaWhatsapp />
                 </button>
             )}
         </div>
         <div className="w-100">
            {!contactInfo.email ? (
                <button 
                     className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                     onClick={() => handleShowContact('Email')}
                     disabled={loadingContact.email}
                >
                    {loadingContact.email ? <MiniLoader /> : <MdEmail />} Show Email
                </button>
            ) : (
                 <div className="w-100 p-2 border rounded d-flex align-items-center justify-content-center gap-2 bg-light text-primary fw-bold">
                    <MdEmail /> {contactInfo.email}
                 </div>
            )}
         </div>
      </div>

         <AboutTheProduct about={singleProduct?.productDtl} />
               <hr />
      <ProductRating data={singleProduct} />
      <h6 className="mt-3">{slug[1]}</h6>
   
      {/* <WhyProducthoose /> */}

    </div>
  );
};

export default Product;
