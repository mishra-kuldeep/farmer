import React, { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";

const Auth = () => {
  const [loginState, setLoginState] = useState(true);
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
          ></button>
        </div>
        <div className="offcanvas-body">
          {loginState ? <LoginPage /> : <RegisterPage />}
        </div>
        <div className="position-absolute w-100 me-5 cursor" style={{bottom:20}} onClick={()=>setLoginState(!loginState)}>
        <p className="text-center"><u>{loginState?"Create a new account":"Already have an account"}</u></p>
      </div>
      </div>
    </>
  );
};

export default Auth;
