import React, { useState } from "react";
import "./Register.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [eye, seteye] = useState(false);
  const [data, setdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const show = () => {
    seteye(!eye);
  };

  const handelchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handelsubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(data));
    setdata({
      fullname: "",
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="Formcenter">
        <form onSubmit={handelsubmit}>
          <p className="logo">Food Delivery</p>
          <input
            type="text"
            placeholder="UserName"
            required
            value={data.fullname}
            name="fullname"
            onChange={handelchange}
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={data.email}
            onChange={handelchange}
          />

          <input
            type={eye ? "text" : "password"}
            placeholder="Password"
            required
            value={data.password}
            onChange={handelchange}
            name="password"
          />

          {eye ? (
            <p className="login " onClick={show}>
              Hide Password
            </p>
          ) : (
            <p className="login" onClick={show}>
              Show Password
            </p>
          )}

          <button className="create-account">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Register;
