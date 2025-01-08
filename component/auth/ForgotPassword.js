import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import MiniLoader from "../reusableComponent/MiniLoader";
import OtpInput from "react-otp-input";

const ForgotPassword = ({ setchangepass }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [newpassForm, setNewPassForm] = useState(false);

  const getotphandler = () => {
    setShow(true);
    // setLoader(true);
  };

  const verifyHandeler = () => {
    setNewPassForm(true);
  };

  const changepasHandeler = () => {
    setchangepass(false);
  };

  return (
    <div style={{ height: "70vh" }}>
      <div className="text-center">
        <img src={logo.src} alt="logo" className="shadow mb-3 loginlogo" />
      </div>
      {!show ? (
        <>
          <div className="p-2 m20">
            <label className="adjustLabel">Email *</label>
            <input
              type="email"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="p-2 text-center mt-4">
            <button
              className="login_btn"
              onClick={getotphandler}
              disabled={loader}
            >
              {loader && <MiniLoader />}
              Get OTP
            </button>
          </div>
        </>
      ) : (
        <>
          {!newpassForm && (
            <>
              <div className="d-flex align-items-center flex-column mt-4">
                <h6 className="mb-3">Enter Verification code</h6>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  inputStyle={{
                    padding: "5px",
                    width: "50px",
                    outlineColor: "var(--mainColor)",
                    border: "3px solid #ddd",
                  }}
                  className="form-control adjustLabel_input"
                  renderInput={(props) => <input className=" p-2" {...props} />}
                />
              </div>
              <div className="p-2 text-center mt-4">
                <button
                  className="login_btn"
                  onClick={verifyHandeler}
                  disabled={loader}
                >
                  {loader && <MiniLoader />}
                  Verify OTP
                </button>
              </div>
            </>
          )}
        </>
      )}

      {newpassForm && (
        <>
          <div className="p-2 m20">
            <label className="adjustLabel">New Password *</label>
            <input
              type="email"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="p-2 m20">
            <label className="adjustLabel">Confirm Password *</label>
            <input
              type="email"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="p-2 text-center mt-4">
            <button
              className="login_btn"
              onClick={changepasHandeler}
              disabled={loader}
            >
              {loader && <MiniLoader />}
              Change Password
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
