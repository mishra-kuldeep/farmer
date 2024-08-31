"use client";
import React, { useEffect, useRef, useState } from "react";
import "./accountpage.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import { VscLocation } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import noImge from "../../public/header/noImage.jpg";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Image_URL } from "@/helper/common";

const AccountLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [imageurl, setimageurl] = useState(noImge.src);
  const [profileData, setProfileData] = useState({});
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setimageurl(imageUrl); // Update the image URL in your state or props
      const formData = new FormData();
      formData.append('FirstName', profileData.FirstName);
      formData.append('Role', profileData.Role);
      formData.append('Profile', file);

      AuthService.updateUserProfile(formData)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (user?.profile?.id) {
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        const mergedUserInfo = {
          ...data.userProfile,
          ...data.userProfile.userInfo,
        };
        // Removing the nested userInfo property
        delete mergedUserInfo.userInfo;
        setProfileData(mergedUserInfo);
        // setimageurl(
        //   mergedUserInfo.Profile ? mergedUserInfo.Profile : noImge.src
        // );
        setimageurl(`${Image_URL}/${mergedUserInfo.Profile}`)
      });
    }
  }, [user?.profile?.id]);

  useEffect(() => {
    if (profileData.Profile) {
      console.log(profileData);
    }
  }, [profileData.Profile]);

  console.log(profileData);
  return (
    <>
      <div className="container pt-md-4">
        <div className="row ">
          <div className="col-md-3">
            <div className="accountsidebar">
              <h2> My Account</h2>
              <hr />
              <div className="d-flex justify-content-center">
                <div className="imageUrlStyle my-3">
                  <img src={imageurl} alt="profile" className="imageUrlStyle" />
                  <MdEdit className="imageEditIcon" onClick={handleIconClick} />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    name="Profile"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div
                className="accListSide"
                onClick={() => router.push("/myAccount/myProfile")}
              >
                <CgProfile size={22} /> <h6>My Profile</h6>
              </div>
              <div
                className="accListSide"
                onClick={() => router.push("/myAccount/myOrder")}
              >
                <HiOutlineShoppingBag size={22} /> <h6>My Order</h6>
              </div>
              <div className="accListSide">
                <VscLocation size={25} /> <h6>My Address Location</h6>
              </div>
              <div className="accListSide">
                <AiOutlineSetting size={22} /> <h6>Account Setting</h6>
              </div>
            </div>
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
