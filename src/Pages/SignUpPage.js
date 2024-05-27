import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar.js";
import styled from "styled-components";
import SignUp from "../Components/SignUp.js";

const Container = styled.div`
  display: flex;
`;

function SignUpPage() {
  return (
    <Container>
      <Sidebar />
      <SignUp />
    </Container>
  );
}

export default SignUpPage;
