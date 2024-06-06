import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar.js";
import styled from "styled-components";
import SignUp from "../Components/SignUp.js";
import Address from "../Components/Address.js";

const Container = styled.div`
  display: flex;
`;

function LocationPage() {
  return (
    <Container>
      <Sidebar />
      <Address />
    </Container>
  );
}

export default LocationPage;
