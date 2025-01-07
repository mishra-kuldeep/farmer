import React, { useEffect, useRef, useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [loginState, setLoginState] = useState(true);
  const auth = useSelector((state) => state.auth);
  const closeButtonRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (auth?.success) {
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
      setLoginState(true);
      if (auth?.success && auth?.message) {
        toast(auth?.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        if (auth?.message == "Login successfully" && auth?.isAdmin) {
          router.push("/admin");
        }
      }
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
        className="offcanvas offcanvas-end widthautoforAuth regiDiv"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        
      >
        <div
          className="offcanvas-header"
          style={{ backgroundColor: "var(--mainColor)" }}
        >
          <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel">
            {loginState ? "Login" : "Register"}
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
        <p className="fw-bold text-danger text-center">{auth.error}</p>
        {loginState ? <LoginPage /> : <RegisterPage />}
        <div
          className="w-100 cursor"
         
        >
          <p className="text-center bg-light p-2">
            <u  onClick={() => setLoginState(!loginState)}>
              <span>{loginState ? "Create a new account" : "Already have an account"}</span>
            </u>
          </p>
        </div>
        </div>
      
      </div>
    </>
  );
};

export default Auth;
