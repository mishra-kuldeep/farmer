"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import "./adverts.css";
// Sample usage
const products = [
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: false,
    isForSale: true,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: true,
    isForSale: false,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: true,
    isForSale: true,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: true,
    isForSale: true,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: true,
    isForSale: true,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  {
    rentProductId: "3",
    rentCategoryId: 15,
    title: "NEW 2500G Red rock slurry tanker for sale",
    UserId: "21",
    description: "New 2500G red rock slurry tanker for sale...",
    isAvailable: true,
    phone: "7307161742",
    isForRent: true,
    isForSale: true,
    otherDetails:
      '{"Location":"Louth","Make":"Redrock","Private seller or dealer?":"Dealer","VAT receipt":"Excluding VAT","Price":"Price on request"}',
    adminReview: "Pending",
    rentCategory: {
      rentCategoryId: 15,
      name: "Slurry equipment",
      description:
        "The most common type of slurry pump is the centrifugal pump...",
    },
  },
  // Add more products as necessary
];
const AdvertsCart = () => {
  const [grid, setGrid] = useState(0);

  const [categorryFilter,setCategoryFilter] = useState(true)

  const farmServices = () => {

  }
  return (
    <div className="container pt-1">
      <div className="my-3">
        <div className="search_wrapper">
          <input type="text" placeholder="Search Ads..." />
          <button>
            <FaSearch color="#fff" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
            <div className="p-2 border rounded">
                <h6>Filter</h6>
                <hr className="m-0 my-2 p-0"/>
                <div>
                    <div className="d-flex justify-content-between cursor" onClick={()=>setCategoryFilter(!categorryFilter)}><h6>Category</h6><span>{categorryFilter?"-":"+"}</span></div>
                  {categorryFilter&&  <div className='px-3'>
                        <div><input type="checkbox"/> category 1</div>
                        <div><input type="checkbox"/> category 1</div>
                        <div><input type="checkbox"/> category 1</div>
                    </div>}


                </div>
            </div>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between">
            <h3>Ads For Sale in Ireland</h3>
            <div className="d-flex align-items-center gap-3">
              <FaThList size={25} onClick={() => setGrid(1)} />
              <MdDashboard size={30} onClick={() => setGrid(0)} />
            </div>
          </div>

          <div className="row m-0">
            {products.map((product) => (
              <div className={`${grid ? "col-md-12" : "col-md-4"}  mb-2 p-2`}>
                <div
                  key={product.rentProductId}
                  className="product-card"
                  onClick={farmServices}
                >
                  <div className="rentstatus ">
                  {product.isForSale && (
                      <span className="plotsale" data-status="isForSale">
                        For Sale
                      </span>
                    )}
                    {product.isForRent && (
                      <span className="plotsale" data-status="isForRent">
                        For Rent
                      </span>
                    )}
                  
                  </div>
                  <div className={`${grid && "d-flex"}`}>
                    <div style={{ width: grid ? "40%" : "100%" }}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                        width="100%"
                        style={{ backgroundColor: "#dadada" }}
                      />
                    </div>
                    <div className="p-2">
                      <h6>{product.title}</h6>
                      <p className="my-2">
                       Category: <span className="text-secondary">{product.rentCategory.name}</span>
                      </p>
                      <p className="text-secondary">{product.description}</p>
                    
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    // <div className="adverts-cart">
    //   {products.map((product) => (
    //     <div key={product.rentProductId} className="product-card">
    //       <h3>{product.title}</h3>
    //       <p>{product.description}</p>
    //       <p><strong>Category:</strong> {product.rentCategory.name}</p>
    //       <p><strong>Phone:</strong> {product.phone}</p>
    //       <p><strong>Status:</strong> {product.isAvailable ? "Available" : "Not Available"}</p>
    //       <p><strong>For Rent:</strong> {product.isForRent ? "Yes" : "No"}</p>
    //       <p><strong>For Sale:</strong> {product.isForSale ? "Yes" : "No"}</p>
    //       <div className="other-details">
    //         <h4>Other Details:</h4>
    //         {Object.entries(JSON.parse(product.otherDetails)).map(([key, value]) => (
    //           <p key={key}><strong>{key}:</strong> {value}</p>
    //         ))}
    //       </div>
    //       <p><strong>Admin Review:</strong> {product.adminReview}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default AdvertsCart;
