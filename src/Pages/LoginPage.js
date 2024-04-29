import React from "react";
import {Link} from 'react-router-dom';
import Sidebar from "../Components/Sidebar.js";
import Login from "../Components/Login.js";

function LoginPage() {
    return (
        <>
        <Sidebar />
        <Login />
        </>
    );
}

export default LoginPage;