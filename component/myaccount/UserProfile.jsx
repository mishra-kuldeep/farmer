import { Image_URL } from "@/helper/common";
import AuthService from "@/services/AuthServices";
import React, { useEffect, useRef, useState } from "react";
import noImge from "../../public/header/noimage.jpg";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";

const UserProfile = () => {
  const user = useSelector((state) => state.auth);
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
      formData.append("FirstName", profileData.FirstName);
      formData.append("Role", profileData.Role);
      formData.append("CountryID",profileData.CountryID)
      formData.append("Profile", file);

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
        if (mergedUserInfo.Profile) {
          setimageurl(`${Image_URL}/profiles/${mergedUserInfo.Profile}`);
        }
      });
    }
  }, [user?.profile?.id]);
  return (
    <div>
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
    </div>
  );
};

export default UserProfile;
