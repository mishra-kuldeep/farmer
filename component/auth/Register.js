import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "@/redux/auth/authSlice";
import MiniLoader from "../reusableComponent/MiniLoader";
import AuthService from "@/services/AuthServices";
import RoleServices from "@/services/RoleServices";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [countryies, setCountry] = useState([]);
  const [cpawword, setCpawword] = useState("");
  const [loader, setLoader] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Mobile: "",
    Password: "",
    CompanyName: "",
    CountryID: "",
    Role: null,
  });
  const [RoleList, setRoleList] = useState([]);
  const phonecode = countryies?.find(
    (val) =>
      val?.countryId == values?.CountryID 
  )?.phoneCode;
  const phoneLength = countryies?.find(
    (val) =>
      val?.countryId == values?.CountryID 
  )?.phoneLength;
console.log(phoneLength)
  useEffect(()=>{
    if(country?.country?.countryId&&countryies?.length>0){
      setValues((prev) => ({
        ...prev,
        ["CountryID"]: country?.country?.countryId,
      }));
    }
  },[country?.country?.countryId,countryies?.length>0])
console.log(countryies)
  const handleValues = (e) => {
    let { name, value } = e.target;
    // if(name =="Phone"){
    //   value = `${phonecode}-${value}`
    // }
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initApi = async () => {
    try {
      const R_List = await RoleServices.getRoleListActive();
      setRoleList(R_List?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = async () => {

    if(phoneLength!= values.Mobile?.length){
      toast("invalid phone number", {
        icon: "😢",
        style: {
          borderRadius: "10px",
          background: "red",
          color: "#fff",
        }
      })
      return
    }
    if (cpawword == values.Password) {
      setLoader(true);
      values.Phone = `${phonecode}-${values.Mobile}`;
      // delete values.Mobile;
      await dispatch(registration(values));
      setLoader(false);
    }else toast("Password and confirm password is not same", {
      icon: "😢",
      style: {
        borderRadius: "10px",
        background: "red",
        color: "#fff",
      }
    })
  };

  useEffect(() => {
    initApi();
    AuthService.getCountryList()
      .then(({ data }) => {
        console.log(data)
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
      {(values.Role == 3 ||
        values.Role == 4 ||
        values.Role == 6 ||
        values.Role == 9) && (
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
      {(values.Role == 3 ||
        values.Role == 4 ||
        values.Role == 6 ||
        values.Role == 9) && (
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
          {values.Role == 3 ||
          values.Role == 4 ||
          values.Role == 6 ||
          values.Role == 9
            ? "Contact Person Name"
            : "Firstname *"}{" "}
        </label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="FirstName"
        />
      </div>

      {values.Role != 3 &&
        values.Role != 4 &&
        values.Role != 6 &&
        values.Role != 9 && (
          <div className="p-2 m20">
            <label className="adjustLabel">LastName*</label>
            <input
              type="text"
              className="form-control p-2 adjustLabel_input"
              onChange={handleValues}
              name="LastName"
            />
          </div>
        )}
      <div className="p-2 m20">
        <label className="adjustLabel">Country *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          onChange={handleValues}
          name="CountryID"
          value={values?.CountryID}
        >
          <option value={""}></option>
          {countryies?.map((val) => (
            <option value={val?.countryId}>{val?.countryName}</option>
          ))}
        </select>
      </div>
      {values.Role != 3 &&
        values.Role != 4 &&
        values.Role != 6 &&
        values.Role != 9 && (
          <div className="p-2 m20" style={{ position: "relative" }}>
            <label className="adjustLabel" style={{ marginLeft: "30px" }}>
              Mobile No *
            </label>
            <input
              type="text"
              id="phone"
              name="Mobile"
              value={values.Mobile}
              maxLength={phoneLength}
              onChange={handleValues}
              className="form-control adjustLabel_input shadow-none"
              style={{ padding: `9px ${phonecode?.length * 16}px ` }}
            />
            <span
              style={{
                position: "absolute",
                left: "0px",
                // right:"350px",
                top: "23px",
                backgroundColor: "#dadada",
                borderRadius: "5px 0px 0px 5px",
              }}
              className="fw-bold text-secondary p-2"
            >
              {phonecode}
            </span>
          </div>
        )}
      {(values.Role == 3 ||
        values.Role == 4 ||
        values.Role == 6 ||
        values.Role == 9) && (
        <div className="p-2 m20" style={{ position: "relative" }}>
          <label className="adjustLabel" style={{ marginLeft: "30px" }}>
            Mobile No *
          </label>
          <input
            type="text"
            id="phone"
            name="Mobile"
            value={values.Mobile}
            onChange={handleValues}
            min={2}
            maxLength={phoneLength}
            required={true}
            className="form-control adjustLabel_input shadow-none"
            style={{ padding: `9px ${phonecode?.length * 16}px ` }}
          />

          <span
            style={{
              position: "absolute",
              left: "-2px",
              // right:"350px",
              top: "24px",
              backgroundColor: "#dadada",
              borderRadius: "5px 0px 0px 5px",
            }}
            className="fw-bold text-secondary p-2"
          >
            {phonecode}
          </span>
        </div>
      )}
      {values.Role != 3 &&
        values.Role != 4 &&
        values.Role != 6 &&
        values.Role != 9 && (
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
      <div className="p-2 m20 position-relative">
        <label className="adjustLabel">Password *</label>
        <input
          type={secure ? "password" : "text"}
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Password"
        />
        {secure ? (
          <IoIosEyeOff
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure(!secure)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        ) : (
          <IoMdEye
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure(!secure)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        )}
      </div>
      <div className="p-2 m20 position-relative">
        <label className="adjustLabel">Confirm Password *</label>
        <input
          type={secure2 ? "password" : "text"}
          className="form-control p-2 adjustLabel_input"
          onChange={(e) => setCpawword(e.target.value)}
          name="Password"
        />
        {secure2 ? (
          <IoIosEyeOff
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure2(!secure2)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        ) : (
          <IoMdEye
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure2(!secure2)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        )}
      </div>
      {/* {cpawword !== values.Password && cpawword.length > 0 && (
        <p className="error_input_text ms-3">
          Password and confirm password is not same
        </p>
      )} */}
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
