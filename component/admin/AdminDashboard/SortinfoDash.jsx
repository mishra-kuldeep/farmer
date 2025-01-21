import React from "react";
import "./sortinfodash.css";
import { FaUsers } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";

const SortinfoDash = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-secondary">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3 p-0 m-0">
          <div>
            <label className="adjustLabel"> From Date</label>
            <input
              type="date"
              name="FirstName"
              className="form-control adjustLabel_input shadow-none p-2"
            />
          </div>
          <div>
              <label className="adjustLabel"> To Date</label>
              <input
                type="date"
                name="FirstName"
                className="form-control adjustLabel_input shadow-none p-2"
              />
          </div>
        </div>
      </div>
      <hr className="text-secondary" />
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="dahAdmimcard">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-secondary">User</h3>
              <div className="iconswrapadmin">
                <FaUsers size={30} color="#fff" />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Farmer </h6>
                <h6 className="text-dark w-25"> : 2000</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Buyers </h6>
                <h6 className="text-dark w-25"> : 1000</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Transporters </h6>
                <h6 className="text-dark w-25"> : 200</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dahAdmimcard">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-secondary">Orders</h3>
              <div className="iconswrapadmin">
                <IoBagHandleSharp size={30} color="#fff" />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Total Orders </h6>
                <h6 className="text-dark w-25"> : 1000</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Total Amounts </h6>
                <h6 className="text-dark w-25"> : 200</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Avg Orders Values </h6>
                <h6 className="text-dark w-25"> : 2000</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dahAdmimcard">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-secondary">Ads</h3>
              <div className="iconswrapadmin">
                <FaHeadset size={30} color="#fff" />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Advertisments </h6>
                <h6 className="text-dark w-25"> : 1000</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Total Amounts </h6>
                <h6 className="text-dark w-25"> : 200</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Avg Orders Values </h6>
                <h6 className="text-dark w-25"> : 2000</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dahAdmimcard">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-secondary">Venders</h3>
              <div className="iconswrapadmin">
                <FaHeadset size={30} color="#fff" />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">Total VenderServices </h6>
                <h6 className="text-dark w-25"> : 1000</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">cold storage </h6>
                <h6 className="text-dark w-25"> : 200</h6>
              </div>
              <div className="d-flex justify-content-between mb-2 w-100">
                <h6 className="text-secondary w-75">cold storage </h6>
                <h6 className="text-dark w-25"> : 2000</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-secondary" />
    </>
  );
};

export default SortinfoDash;
