import React from "react";
import {Link} from 'react-router-dom';
import Topbar from "../Components/Topbar.js";
import Searchbar from "../Components/Searchbar.js";
import Enroll from "../Components/Enroll.js";
import Content from "../Components/Content.js";

function HomePage() {
    return (
        <>
        <Topbar />
        <Searchbar />
        <Content />
        <Enroll />
        </>
    );
}

export default HomePage;