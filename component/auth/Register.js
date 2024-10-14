import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registration } from "@/redux/auth/authSlice";
import MiniLoader from "../reusableComponent/MiniLoader";
import AuthService from "@/services/AuthServices";
import RoleServices from "@/services/RoleServices";

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
    CompanyName:"",
    Country: "",
    Role: null,
  });
  const [RoleList, setRoleList] = useState([]);

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initApi = async () => {
    const R_List = await RoleServices.getRoleList();
    setRoleList(R_List?.data);
  };
  const submitHandler = async () => {
    if (cpawword == values.Password) {
      setLoader(true);
      await dispatch(registration(values));
      setLoader(false);
    }
  };

  useEffect(() => {
    initApi();
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
        <label className="adjustLabel">Category *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          onChange={handleValues}
          name="Role"
        >
          <option value={""}>select</option>
          {RoleList.map((val) => (
            <option value={val?.RoleId}>{val?.RoleName}</option>
          ))}
        </select>
      </div>
      {values.Role == 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">Company Name *</label>
          <input
            type="text"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="CompanyName"
          />
        </div>
      )}
      {values.Role == 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">Company Email *</label>
          <input
            type="email"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="Email"
          />
        </div>
      )}
      <div className="p-2 m20">
        <label className="adjustLabel">
          {values.Role == 4 ? "Contact Person Name" : "Firstname *"}{" "}
        </label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="FirstName"
        />
      </div>
      {values.Role == 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">Mobile No *</label>
          <input
            type="number"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="Phone"
          />
        </div>
      )}
      {values.Role != 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">LastName</label>
          <input
            type="text"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="LastName"
          />
        </div>
      )}
      {values.Role != 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">Email *</label>
          <input
            type="email"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="Email"
          />
        </div>
      )}
      {values.Role != 4 && (
        <div className="p-2 m20">
          <label className="adjustLabel">Mobile No *</label>
          <input
            type="number"
            className="form-control p-2 adjustLabel_input"
            onChange={handleValues}
            name="Phone"
          />
        </div>
      )}

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
