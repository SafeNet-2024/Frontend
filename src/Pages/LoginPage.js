import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar.js";
import Login from "../Components/Login.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function LoginPage() {
  return (
    <Container>
      <Sidebar />
      <Login />
    </Container>
  );
}

export default LoginPage;
