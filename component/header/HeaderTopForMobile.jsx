import React from "react";
import logo from "../../public/header/logo1.jpg";
import { IoMenu } from "react-icons/io5";
import Auth from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/auth/authSlice";

const HeaderTopForMobile = () => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(clearUser()); // Action to clear user data in Redux
    router.push("/"); // Redirect to the login page
  };
  return (
    <div className="mobile_Header container">
      <div className="row m-0 align-items-center" style={{ height: "50px" }}>
        <div className="col-1 p-0">
          <div className="dropdown">
            <div data-bs-toggle="dropdown" aria-expanded="false">
              <IoMenu size={20} />
            </div>
            <ul className="dropdown-menu custom-dropdown-menu">
              {user?.profile?.role == 2 && (
                <li className="dropdown-item">Farmers</li>
              )}
              {user?.profile?.role == 3 && (
                <li className="dropdown-item">Buyers</li>
              )}
              {(user?.profile?.role == 2 || user?.profile?.role == 3) && (
                <li className="dropdown-item">Farm Lands</li>
              )}
              <li className="dropdown-item">Transportation</li>
              <li className="dropdown-item">Employee</li>
              <li className="dropdown-item">Vendors</li>
              <li className="dropdown-item">Educational Resources</li>
              <li className="dropdown-item">Customer Care</li>
            </ul>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center p-0">
          <img src={logo.src} alt="logo" className="logoImage" />
          <h6 className="logoImage_title">
            <span className="fs-4">F</span>armers
            <span className="fs-4">M</span>arket
          </h6>
        </div>
        <div className="col-5 p-0">
          <div className="d-flex justify-content-end align-items-center gap-2">
            {/* <button className="login_btn px-3">login / Signup</button> */}
            {user.profile === null ? (
              <Auth />
            ) : (
              <>
                <h6 className="mt-1">{user?.profile?.name}</h6>
                <div
                  className="avtar"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.profile?.name?.substring(0, 1)}
                </div>
                <ul
                  className="dropdown-menu p-0"
                  style={{ right: "0%", width: "300px", top: "10px" }}
                >
                  <p
                    className="cat_list1"
                    onClick={() => router.push("/myAccount")}
                  >
                    My Account
                  </p>
                  <p
                    className="cat_list1"
                    onClick={() =>
                      router.push(
                        user?.profile?.role == 4 || 6
                          ? "/myAccount/CompanyProfile"
                          : "/myAccount/myProfile"
                      )
                    }
                  >
                    My Profile
                  </p>
                  <p
                    className="cat_list1"
                    onClick={() => router.push("/basket")}
                  >
                    My Basket (0) item
                  </p>
                  <p className="cat_list1" onClick={handleLogout}>
                    logout
                  </p>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopForMobile;
