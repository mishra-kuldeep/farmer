"use client";
import AuthService from "@/services/AuthServices";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import stylesss from "./UsersListForAdmin.module.css"; // Import the CSS module
import { Image_URL } from "@/helper/common";

const UsersListForAdmin = () => {
  const [role, setRole] = useState("All");
  const [userList, setUserList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // To track the open accordion

  useEffect(() => {
    AuthService.AllUserProfileAdmin(role)
      .then(({ data }) => {
        setUserList(data?.userProfile);
      })
      .catch((err) => console.log(err));
  }, [role]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between open and close
  };

  return (
  <>
  <div className="col-md-4 mb-3">
        <label className="adjustLabel">Sub Category *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="subCategory"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="All" >All</option>
          <option value={2}>Farmers</option>
          <option value={3}>Buyers</option>
          <option value={4}>Transportation</option>
          <option value={5}>Employee</option>
          <option value={6}>Vendors</option>
          <option value={7}>Educational Resources</option>
          <option value={8}>Customer Care</option>
        </select>

      </div>
    <div className={stylesss.accordion}>
      {userList?.map((ele, i) => (
        <div className={stylesss["accordion-item"]} key={i} style={{display:ele.Role==1&&"none"}}>
          <h2
            className={stylesss["accordion-header"]}
            onClick={() => toggleAccordion(i)}
          >
            <button type="button">
              <span>
                {i + 1}. {ele.FirstName} {ele.LastName}
              </span>
              <IoIosArrowDown
                className={`${stylesss["accordion-button-icon"]} ${
                  openIndex === i ? stylesss.active : ""
                }`}
              />
            </button>
          </h2>
          <div
            className={`${stylesss["accordion-collapse"]} ${
              openIndex === i ? stylesss.show : ""
            }`}
          >
            <div className={stylesss["accordion-body"]}>
              <div className="d-flex gap-3">
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                    backgroundColor: "#ddd",
                    padding:"5px"
                  }}
                >
                  <img
                    src={`${Image_URL}/Profiles/${ele?.userInfo?.Profile}`}
                    alt="image"
                    width="100%"
                    height="100%"
                  />
                </div>
                <table className="table  p-0">
                  <tbody>
                    <tr>
                      <td className="text-secondary p-0 m-0">Email</td>
                      <td className="text-secondary p-0 m-0">: {ele?.Email}</td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Phone</td>
                      <td className="text-secondary p-0 m-0">: {ele?.Phone}</td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">CountryID</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.CountryID}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Dob</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.Dob}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Gender</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.Gender}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Address1</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.Address1}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Address2</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.Address2}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">City</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.City}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">State</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.State}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-secondary p-0 m-0">Zip</td>
                      <td className="text-secondary p-0 m-0">
                        : {ele?.userInfo?.Zip}
                      </td>
                    </tr>

                    {/* Profile   IdImage   AdharNo                              */}
                  </tbody>
                </table>
              </div>
              {/* Add other user details here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default UsersListForAdmin;
