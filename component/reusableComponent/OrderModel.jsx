import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../../app/product/[...slug]/productPage.css";
import ConfirmModel from "./ConfirmModel";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import toast from "react-hot-toast";
import { Image_URL } from "@/helper/common";
import IconButton from "./IconButton";
import { useSelector } from "react-redux";

const OrderModal = ({
    modalData,
    setActionPerformed,
}) => {
    const imageContainerRef = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [actionType, setActionType] = useState("");
    const [ImageList, setImageList] = useState("");
    const [loading, setloading] = useState(false);
    const [Index, setIndex] = useState(0);
    const user = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const onConfirmHandeler = () => {
        if (actionType == "approve") {
            setloading(true);
            ProductFarmerServices.approveProductsFarmer(modalData?.productDtlId)
                .then(({ data }) => {
                    setloading(false);
                    setConfirm(false);
                    setActionPerformed(true);
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
                    setConfirm(false);
                });
        }
        if (actionType == "reject") {
            setloading(true);
            ProductFarmerServices.rejectProductsFarmer(modalData?.productDtlId)
                .then(({ data }) => {
                    toast(data?.message, {
                        icon: "👏",
                        style: {
                            borderRadius: "10px",
                            background: "green",
                            color: "#fff",
                        },
                    });
                    setloading(false);
                    setConfirm(false);
                    setActionPerformed(true);
                })
                .catch((err) => {
                    console.log(err);
                    setConfirm(false);
                });
        }
    };
    const onCancelHandeler = () => {
        setConfirm(false);
    };



    useEffect(() => {
        setImageList([])
        if (modalData?.productDtlId) {
            ProductFarmerServices.getAllImage(modalData?.productDtlId).then(
                ({ data }) => {
                    setImageList(data?.images);
                }
            );
        }
    }, [modalData?.productDtlId]);

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Verify Product
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="row ">
                                            <div className="cardBasket">
                                                <div className="col-md-4 text-center">
                                                    Items ({cart.isLoading ? <MiniLoader /> : cart?.cart?.length} item)
                                                </div>
                                                <div className="col-md-4 text-center">
                                                    Quantity
                                                </div>

                                                <div className="col-md-4 text-center">
                                                    Sub-total
                                                </div>
                                            </div>
                                        </div>
                                        {cart.isLoading && <MiniLoader />}
                                        <div className="productlistWrapper">
                                            {
                                                cart?.cart?.map((val) => (
                                                    <div className="cardBasket" key={val.productDtlId}>
                                                        <img src={`${Image_URL}/Products/${val?.productDetail?.ProductsImages[0].url}`} alt="image" />
                                                        <div className="cartBaketDetail row">
                                                            <div className="col-md-6">
                                                                <h6>{val?.productDetail?.productDtlName}</h6>
                                                                <h6>₹ {val?.productDetail?.price}</h6>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    {cart?.cart?.find(
                                                                        (item) => item.productDtlId === val.productDtlId
                                                                    ) ? (
                                                                        <div className="quantitywrap">
                                                                            <span className="minus" onClick={() => decreaseQuantity(val.productDtlId)}>
                                                                                {loadingProductId === val.productDtlId &&
                                                                                    loadingAction === "decrement" ? (
                                                                                    <MiniLoader />
                                                                                ) : (
                                                                                    <FaMinus size={15} />
                                                                                )}
                                                                            </span>
                                                                            <span>
                                                                                {cart?.cart?.find(
                                                                                    (item) => item.productDtlId === val.productDtlId
                                                                                )?.quantity}
                                                                            </span>
                                                                            <span className="plus" onClick={() => increaseQuantity(val.productDtlId)}>
                                                                                {loadingProductId === val.productDtlId &&
                                                                                    loadingAction === "increment" ? (
                                                                                    <MiniLoader />
                                                                                ) : (
                                                                                    <FaPlus size={15} />
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            className="addtoCart_btn"
                                                                            onClick={() => addCartHandler(val.productDtlId)}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <h6>Saved: ₹{val?.productDetail?.discountType === "fixed" ? val?.productDetail?.discount * val?.quantity
                                                                    : ((val?.productDetail?.price * val?.productDetail?.discount) / 100) * val?.quantity}</h6>
                                                                <h6>₹ {val?.productDetail?.price * val?.quantity -
                                                                    (val?.productDetail?.discountType === "fixed"
                                                                        ? val?.productDetail?.discount * val?.quantity
                                                                        : ((val?.productDetail?.price * val?.productDetail?.discount) / 100) * val?.quantity)}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="detailWrapper border p-3 rounded shadow">
                                            <h5 className="mb-4">Price Details</h5>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td>Price ({cart?.cart?.length} items)</td>
                                                        {/* <td>₹{totalPrice}</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>Discount</td>
                                                        {/* <td>− ₹{totalDiscount}</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery Charges</td>
                                                        {/* <td>₹{deliveryCharges > 0 ? deliveryCharges : "Free"}</td> */}
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Total Amount</strong></td>
                                                        {/* <td><strong>₹{finalTotal + deliveryCharges}</strong></td> */}
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{ textAlign: 'right' }}>
                                                            {/* <span style={{ color: 'green' }}>You will save ₹{totalDiscount} on this order</span> */}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* <button
                                                    className="CheckoutBtn w-100 mt-3"
                                                    onClick={handleCheckout}
                                                    disabled={isCheckingOut}
                                                >
                                                    {isCheckingOut ? <MiniLoader /> : "Checkout"}
                                                </button> */}
                                            {/* <button className="CheckoutBtn w-100 mt-3">Checkout</button> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer justify-content-around">
                            <button
                                type="button"
                                className="btn btn-success w-25"
                                onClick={() => {
                                    setConfirm(true);
                                    setMessage(
                                        "Are you sure to approve this product succesfully!"
                                    );
                                    setActionType("approve");
                                }}
                            >
                                Approve it
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger w-25"
                                onClick={() => {
                                    setConfirm(true);
                                    setMessage(
                                        "Are you sure to reject this product succesfully!"
                                    );
                                    setActionType("reject");
                                }}
                            >
                                Reject it
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModel
                show={confirm}
                onConfirm={onConfirmHandeler}
                onCancel={onCancelHandeler}
                message={message}
                loading={loading}
            />
        </>
    );
};

export default OrderModal;
