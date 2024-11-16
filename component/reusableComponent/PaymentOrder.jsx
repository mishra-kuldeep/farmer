import React, { useEffect, useState } from "react";
import MediumLoader from "./MediumLoader";
import { Modal, Button } from "react-bootstrap";
import OrderService from "@/services/Orderservices";

const PaymentOrder = ({ selectedOrder, totalProductChar, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [fullOrderData, setFullOrderData] = useState(null);

    useEffect(() => {
        if (selectedOrder) {
            setLoading(true);
            // Fetch inspection data for the selected order
            OrderService.getAllorderWithTranspoter(selectedOrder)
                .then(({ data }) => {
                    console.log(data)
                    setFullOrderData(data?.reduce(
                        (acc, detail) => acc + detail.totalTranportCharge,
                        0
                    ));
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching inspection data:", err);
                    setLoading(false);
                });
        }
    }, [selectedOrder]);
    return (
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <MediumLoader />
                ) : fullOrderData ? (
                    <>
                        <p>
                            <strong>Total Product Price:</strong> {totalProductChar}
                        </p>
                        <p>
                            <strong>Total Transport Charge:</strong> {fullOrderData}
                        </p>
                        <p>
                            <strong>Total Order Price :</strong> {Number(totalProductChar) + Number(fullOrderData)}
                        </p>

                    </>
                ) : (
                    <p>No data available</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Pay
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentOrder;
