import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CategoryServices from "@/services/CategoryServices";

const AddProductSearch = ({ sendDataToParent,value }) => {
    const [open, setOpen] = useState(false);
    const [queryes, setquery] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        category: "",
        subCategory: "",
        brand: "",
        description: ""
    });

    useEffect(() => {
         if (showAddModal) {
            CategoryServices.getCategory().then(({ data }) => setCategories(data.data));
            CategoryServices.getSubCategory().then(({ data }) => setSubCategories(data.data));
            CategoryServices.getBrand().then(({ data }) => setBrands(data.data));
             setNewProduct(prev => ({ ...prev, productName: queryes }));
         }
    }, [showAddModal]);

    useEffect(() => {
        if (value) {
            setquery(value);
        }
    }, [value]);

    const handleAddProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddNewProduct = async () => {
        try {
            const res = await CategoryServices.addProduct(newProduct);
            if (res.status === 201) {
                // Auto select the new product
                const createdProduct = res.data.newProduct;
                // Fetch full details if needed or construct object
                 // We might need to fetch single product to get joined fields if needed by parent
                 // But typically parent just needs IDs or basic info.
                 // Let's assume we can use the created product directly or fetch it.
                 // Based on existing logic: handlegoSingleProduct(id) fetches details.
                 handlegoSingleProduct(createdProduct.productCode);
                 setShowAddModal(false);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

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

    // useEffect(() => {
    //     handlegoSingleProduct(searchProduct[0]?.productId);
    // }, [searchProduct]);



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
                        <div className="singleProductWrap" key={i}>
                            <div className="searchDeatailwrap">
                                <div onClick={() => handlegoSingleProduct(ele?.productCode)}>
                                    <span className="productNameSearch">
                                        {ele?.productName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                     <div className="singleProductWrap border-top p-2 text-center">
                        <span className="text-primary cursor" onClick={() => setShowAddModal(true)}>
                            Product not found? + Add "{queryes}"
                        </span>
                    </div>
                </div>
            )}

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Master Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="productName" 
                                value={newProduct.productName} 
                                onChange={handleAddProductChange} 
                            />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" value={newProduct.category} onChange={handleAddProductChange}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c._id} value={c.categoryCode}>{c.categoryName}</option>)}
                            </Form.Select>
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Select name="subCategory" value={newProduct.subCategory} onChange={handleAddProductChange}>
                                <option value="">Select Sub Category</option>
                                {subCategories.map(c => <option key={c._id} value={c.subcategoryCode}>{c.subcategoryName}</option>)}
                            </Form.Select>
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Brand</Form.Label>
                             <Form.Select name="brand" value={newProduct.brand} onChange={handleAddProductChange}>
                                <option value="">Select Brand</option>
                                {brands.map(c => <option key={c._id} value={c.brandCode}>{c.brandName}</option>)}
                            </Form.Select>
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="description" 
                                value={newProduct.description} 
                                onChange={handleAddProductChange} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddProductSearch;
