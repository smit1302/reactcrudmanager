import React from "react";
import "./Page.css";
//import ProductPage from "./ProductPage";
import { useNavigate } from "react-router";
interface Props {}

const HomePage = (props: Props) =>{
    const navigate = useNavigate();
    const goToproductPage =() =>{
        navigate("/productPage");
    };
    return (
    <div className="title">
    <h1>HomePage</h1>
    <h3>This is my Home Page and for further details visit my Product Page</h3>
    <button onClick={goToproductPage}> Product Page </button>
    </div>
    );
}

export default HomePage;