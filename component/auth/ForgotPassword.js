import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import MiniLoader from "../reusableComponent/MiniLoader";
import OtpInput from "react-otp-input";
import ForgotPasswordServices from "@/services/ForgotPasswordServices";
import toast from "react-hot-toast";
//  forget password section start --------
const ForgotPassword = ({ setchangepass }) => {
  // State variables for managing component state
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [newpassForm, setNewPassForm] = useState(false);
  const [newpassword, setNewpassword] = useState('');
  const [cnewpassword, setCNewpassword] = useState('');


  // Handler for requesting OTP
  const getOTPhandler = () => {
    setLoader(true);
     // Validation: Check if email is provided
    if (!email) {
      toast("Email is required", {
        icon: "😟",
        style: {
          borderRadius: "5px",
          background: "red",
          color: "#fff",
        },
      });
      setLoader(false);
      return;
    } else
      ForgotPasswordServices.forgotPassword({ email: email })
        .then(({ data }) => {
          if (data?.susses == true) {
            setShow(true);// Show OTP input form
            toast("OTP send sussesfully! at your Email", {
              icon: "✅",
              style: {
                borderRadius: "5px",
                background: "green",
                color: "#fff",
              },
            });
          }
        }).catch((e) => {
          console.log(e);
          toast("invalid Email! Please check Now", {
            icon: "😟",
            style: {
              borderRadius: "5px",
              background: "red",
              color: "#fff",
            },
          });
        }).finally(() => {
          setLoader(false); // Stop the loader after the operation
        });
  };

// Handler for verifying OTP
  const verifyHandeler = () => {
    setLoader(true);
    ForgotPasswordServices.verifyOTP({ email: email, otp: otp })
      .then(({ data }) => {
        if (data?.susses == true) {
          setNewPassForm(true);// Show new password form
          toast("OTP verify sussesfully! Please Enter New Password", {
            icon: "✅",
            style: {
              borderRadius: "5px",
              background: "green",
              color: "#fff",
            },
          });
        }
      }).catch((e) => {
        console.log(e);
        toast("invalid OTP Number! Please Recheck Now", {
          icon: "😟",
          style: {
            borderRadius: "5px",
            background: "red",
            color: "#fff",
          },
        });
      }).finally(() => {
        setLoader(false); // Stop the loader after the operation
      });

  };
 // Handler for changing password
  const changepasHandeler = () => {
    if (newpassword.length < 6) {
      toast("Your Password should be 6 Character ", {
        icon: "😟",
        style: {
          borderRadius: "5px",
          background: "red",
          color: "#fff",
        },
      });
      return;
    } else if (newpassword != cnewpassword) {
      toast("Your New Password & Confirm not match!! Please fill Try again", {
        icon: "😟",
        style: {
          borderRadius: "5px",
          background: "red",
          color: "#fff",
        },
      });
      return;
    } else {
      setLoader(true);
      ForgotPasswordServices.changePassword({ email: email, newPassword: newpassword })
        .then(({ data }) => {
          if (data?.susses == true) {
            setchangepass(false);// Close password change flow
            toast("Password change sussesfully! Please login", {
              icon: "✅",
              style: {
                borderRadius: "5px",
                background: "green",
                color: "#fff",
              },
            });
            setLoader(false);
          }
        }).catch((e) => {
          console.log(e);
          toast("Password change failed! Please Try again", {
            icon: "😟",
            style: {
              borderRadius: "5px",
              background: "red",
              color: "#fff",
            },
          });
        }).finally(() => {
          setLoader(false); // Stop the loader after the operation
        });
    }
  };

  return (
    <div style={{ height: "70vh" }}>
      <div className="text-center">
        <img src={logo.src} alt="logo" className="shadow mb-3 loginlogo" />
      </div>
      {!show ? (
        <>
          {/* Email input form */}
          <div className="p-2 m20">
            <label className="adjustLabel">Email *</label>
            <input
              type="email *"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="p-2 text-center mt-4">
            <button
              className="login_btn"
              onClick={getOTPhandler}
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
             {/* // OTP verification form */}
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
         {/* // New password form */}
          <div className="p-2 m20">
            <label className="adjustLabel">New Password *</label>
            <input
              type="email"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setNewpassword(e.target.value)}
              name="email"
            />
          </div>
          <div className="p-2 m20">
            <label className="adjustLabel">Confirm Password *</label>
            <input
              type="email"
              className="form-control adjustLabel_input p-2"
              onChange={(e) => setCNewpassword(e.target.value)}
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
