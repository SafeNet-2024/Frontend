import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: auto;
  height: auto;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;

const Contents = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

function Content() {
  return (
    <>
      <ContentWrapper>
        <Contents>우리 동네 식재료</Contents>
      </ContentWrapper>
    </>
  );
}

export default Content;
