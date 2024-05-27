import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 25%;
  height: 100vh;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #4461f2;
  color: white;
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  padding-top: 70px;
`;

const BottomWrapper = styled.div`
  width: 100%;
  height: 100vh;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #4461f2;
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 300px;
`;

function Sidebar() {
  return (
    <SidebarWrapper>
      GROSHARE
      <BottomWrapper>
        Share, Don't Waste:
        <div>Give Your</div>
        <div> Groceries New Life!</div>
      </BottomWrapper>
    </SidebarWrapper>
  );
}

export default Sidebar;
