import React, { useEffect, useState } from "react";
import CategoryServices from "@/services/CategoryServices";

const AddProductSearch = ({ sendDataToParent,value }) => {
    const [open, setOpen] = useState(false);
    const [queryes, setquery] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
console.log(value)

    const handleSearch = (e) => {
        setSingleProduct({});
        sendDataToParent({});
        const query = e.target.value;
        setquery(query);
        if (query.length > 2) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleGetProduct = async (val) => {
        try {
            const searchResult = await CategoryServices.getSearchProducts(val);
            console.log(searchResult)
            setSearchProduct(searchResult?.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setSearchProduct([]);
            setOpen(false);
        }
    };

    const handlegoSingleProduct = async (id) => {
        try {
            const SingleProduct = await CategoryServices.getSingleProduct(id);
            console.log(SingleProduct)
            setSingleProduct(SingleProduct.data);
            sendDataToParent(SingleProduct.data);
            setOpen(false);
            setquery("");
        } catch (error) {
            console.error("Error fetching products:", error);
            setOpen(false);
            setquery("");
        }
    };
 
    useEffect(() => {
        handleGetProduct(queryes || value);
    }, [queryes, value]);

    useEffect(() => {
        handlegoSingleProduct(searchProduct[0]?.productId);
    }, [searchProduct]);



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






    return (
        <div className="w-100 position-relative">
            <form autoComplete="off">
                <input type="text" name="dummy" style={{ display: "none" }} />
                <label className="adjustLabel">Product *</label>
                <input
                    type="search"
                    className="form-control p-2 adjustLabel_input"
                    value={singleProduct?.productName || queryes}
                    onChange={handleSearch}
                    placeholder="Product name ..."
                    name="searchQuery"
                    autoComplete="off"
                />
            </form>
            {open && (
                <div className="search_list_wrapper">
                    <p className="titless">
                        Showing result of <b>"{queryes}"</b>
                    </p>
                    {searchProduct?.map((ele, i) => (
                        <div className="singleProductWrap">
                            <div className="searchDeatailwrap">
                                <div onClick={() => handlegoSingleProduct(ele?.productId)}>
                                    <span className="productNameSearch">
                                        {ele?.productName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddProductSearch;
