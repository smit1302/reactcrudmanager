import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Page.css";
interface Props {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//Checkig the validation of the Email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
//Checking whether Password and Email are entered Properly
//Email=smitjchoksi28@gmail.com Password User@123
  const authenticate = () => {
    if (!email || !password) {
      alert("Enter all the fields");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address");
    } else if (email === "smitjchoksi28@gmail.com" && password === "User@123") {
      navigate("/homePage");
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="title">
      <h1>LoginPage</h1>
      <div className="content">
        <label>Email ID</label> <br></br>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />{" "}
        <br></br>
        <label>Password</label> <br></br>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br></br>
        <button onClick={authenticate}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
