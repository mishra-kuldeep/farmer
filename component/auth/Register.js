import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registration } from "@/redux/auth/authSlice";
import MiniLoader from "../reusableComponent/MiniLoader";
import AuthService from "@/services/AuthServices";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [countryies, setCountry] = useState([]);
  const [cpawword, setCpawword] = useState("");
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Password: "",
    Country: "",
    Role: null,
  });

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    if (cpawword == values.Password) {
      setLoader(true);
      await dispatch(registration(values));
      setLoader(false);
    }
  };

  useEffect(() => {
    AuthService.getCountryList()
      .then(({ data }) => {
        setCountry(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="text-center">
        {/* <img
          src={logo.src}
          alt="logo"
          className="shadow mb-2"
          style={{ height: "100px", width: "100px", borderRadius: "50%" }}
        /> */}
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Firstname *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="FirstName"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">LastName</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="LastName"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Email *</label>
        <input
          type="email"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Email"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Mobile No *</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Phone"
        />
      </div>
     
      <div className="p-2 m20">
        <label className="adjustLabel">Country *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          onChange={handleValues}
          name="Country"
        >
          <option value={""}></option>
          {countryies?.map((val) => (
            <option value={val?.countryId}>{val?.countryName}</option>
          ))}
        </select>
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Role *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          onChange={handleValues}
          name="Role"
        >
          <option value={""}></option>
          <option value={2}>Farmers</option>
          <option value={3}>Buyers</option>
          <option value={4}>Transportation</option>
          <option value={5}>Employee</option>
          <option value={6}>Vendors</option>
          <option value={7}>Educational Resources</option>
          <option value={8}>Customer Care</option>
        </select>
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Password *</label>
        <input
          type="password"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Password"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Confirm Password *</label>
        <input
          type="password"
          className="form-control p-2 adjustLabel_input"
          onChange={(e) => setCpawword(e.target.value)}
          name="Password"
        />
      </div>
      {cpawword !== values.Password && cpawword.length > 0 && (
        <p className="error_input_text">
          Paword and confirm password is not same
        </p>
      )}
      <div className="p-2 text-center mt-2 ">
        <button className="login_btn" onClick={submitHandler} disabled={loader}>
          {loader && <MiniLoader />}
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
