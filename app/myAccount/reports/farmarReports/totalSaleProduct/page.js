"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "@/component/reusableComponent/Pagination";
import { useRouter } from "next/navigation";
import "../../../../admin/addProduct/addProduct.css"
import ReportsServices from "@/services/ReportServices";

const Page = () => {
    const router = useRouter();
    const [SaleProductList, setSaleProductList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [metaData, setMetaData] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const tableRef = useRef();

 
    useEffect(() => {
        ReportsServices.totalSaleProductWise(page, searchText)
            .then(({ data }) => {
                console.log(data)
                setSaleProductList(data?.data);
                setMetaData(data?.meta);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchText]);

    return (
        <div>
            <Pagination
                page={page}
                setPage={setPage}
                searchText={searchText}
                setSearchText={setSearchText}
                List={SaleProductList}
                metaData={metaData}
                searchShow={true}
            />
            <div className="d-flex gap-4 mb-3 ms-3" style={{ marginTop: "-40px" }}>
                <div className="d-flex gap-2">
                    <h4 style={{ color: "grey", }}>Total Sale Product</h4>
                </div>
            </div>
            <div className="w-100">
                <div className="w-100 overflow-auto">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>SrNo</th>
                                <th>product</th>
                                <th className="text-center">Total Quantity</th>
                                <th className="text-center">Total Sale price</th>
                                {/* <th className="text-center">Action</th> */}
                            </tr>
                        </thead>
                        {SaleProductList?.length > 0 && (
                            <tbody>
                                {SaleProductList?.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item['productDetail.productDtlName']}</td>
                                            <td
                                                className="text-center"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title={item?.totalQuantity}
                                            >
                                                {item?.totalQuantity}{"/"}{item['productDetail.ProductUnit.unitName']}
                                            </td>
                                            <td className="text-center" style={{ backgroundColor: "transparent" }}>
                                                {item?.totalRevenue}
                                            </td>
                                            {/* <td className="text-center">
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <IconButton>
                                                        <FaRegEdit color="green" size={20} />
                                                    </IconButton>
                                                </div>
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;
