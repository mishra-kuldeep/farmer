import React, { useEffect, useState } from "react";
import "./search.css";
import "../../homepage/section1/section1home.css";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { useRouter } from "next/navigation";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import { Image_URL } from "@/helper/common";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart, updateCart } from "@/redux/cart/cartSlice";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import MiniLoader from "../MiniLoader";
const Search = () => {
  const [open, setOpen] = useState(false);
  const [queryes, setquery] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const query = e.target.value;
    setquery(query);
    if (query.length > 2) {
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
        category: "",
        subCategory: "",
        brand: "",
        countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
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
                src={`${Image_URL}/products/${ele.ProductsImages[0]?.url}`}
                alt="image"
                className="searchImagesss"
              />
              <div className="searchDeatailwrap">
                <div onClick={() => handlegoSingleProduct(ele?.slug)}>
                  <span className="productNameSearch">
                    {ele?.productDtlName}
                  </span>
                </div>
                <div>
                  <span className="searchDeatailUnit">
                    <span>Stock</span> -
                    {ele?.quantity} {ele?.ProductUnit?.unitName}
                  </span>
                </div>
                <div>
                  <span className="searchDeatailprice">
                    {ele?.country?.currencySymbol}
                    {ele.price}
                  </span>
                  /
                  <span className="searchDeatailprice">
                    {ele?.ProductUnit?.unitName}
                  </span>
                </div>
                <div>
                  <span className="searchDeatailOfer">
                    {ele.discountType === "fixed" &&
                      ele?.country?.currencySymbol}
                    {ele.discount}
                    {ele.discountType === "percentage" && "%"} OFF
                  </span>
                </div>
                <div>
                  {cart?.cart?.find(
                    (item) => item.productDtlId === ele.productDtlId
                  ) ? (
                    <button className="searchDeatailaddBtn d-flex justify-content-around ">
                      <div
                        className="minus"
                        onClick={() => decreaseQuantity(ele.productDtlId)}
                      >
                        {loadingProductId === ele.productDtlId &&
                        loadingAction === "decrement" ? (
                          <MiniLoader />
                        ) : (
                          <FaMinus size={12} />
                        )}
                      </div>
                      <div className="fw-bold">
                        {
                          cart?.cart?.find(
                            (item) => item.productDtlId === ele.productDtlId
                          )?.quantity
                        }
                      </div>
                      <div
                        className="plus"
                        onClick={() => increaseQuantity(ele.productDtlId)}
                      >
                        {loadingProductId === ele.productDtlId &&
                        loadingAction === "increment" ? (
                          <MiniLoader />
                        ) : (
                          <FaPlus size={12} />
                        )}
                      </div>
                    </button>
                  ) : (
                    <button
                      className="searchDeatailaddBtn"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Add"
                      onClick={() => addCartHandler(ele.productDtlId)}
                    >
                      Add
                    </button>
                  )}
                  {/* <button className="searchDeatailaddBtn">Add</button> */}
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
