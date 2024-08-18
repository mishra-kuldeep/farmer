import React, { useEffect, useRef, useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Auth = () => {
  const [loginState, setLoginState] = useState(true);
  const auth = useSelector((state) => state.auth)
  const closeButtonRef = useRef(null);
  console.log(auth)

  useEffect(() => {
    if (auth.success) {
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
      setLoginState(true)
      toast.success(auth.message)
    }
  }, [auth.success]); 

  return (
    <>
      <button
        className="login_btn px-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        login / Signup
      </button>

      <div
        className="offcanvas offcanvas-end widthautoforAuth"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div
          className="offcanvas-header"
          style={{ backgroundColor: "var(--mainColor)" }}
        >
          <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel">
          {loginState?"Login":"Register"}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={closeButtonRef}
          ></button>
        </div>
        <div className="offcanvas-body">
          {loginState ? <LoginPage /> : <RegisterPage />}
        <p className="fw-bold text-danger text-center mt-4">{auth.error}</p>
        </div>
        <div className="position-absolute w-100 me-5 cursor" style={{bottom:20}} onClick={()=>setLoginState(!loginState)}>
        <p className="text-center"><u>{loginState?"Create a new account":"Already have an account"}</u></p>
      </div>
      </div>
    </>
  );
};

export default Auth;
