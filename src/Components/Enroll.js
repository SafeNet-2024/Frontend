import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plus from "../Assets/plus.png";

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  float: right;
`;

const Button = styled.button`
  position: relative;
  border: none;
  display: inline-block;
  padding: 15px 20px;
  margin-right: 50px;
  border-radius: 50px;
  border: 2px solid #4461F2;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.10);
  transition: 0.25s;
  background-color: aliceblue;
  color: #4461F2;
  display: flex;
  align-items: center;
}
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 2px;
`;

function Enroll() {
  const navigate = useNavigate();

  // 상품 등록 버튼 클릭 시 이동하는 함수
  const handleEnrollClick = () => {
    // 예시: 상품 등록 페이지로 이동
    navigate("/enroll");
  };

  return (
    <ButtonsWrapper>
      <Button type="button" onClick={handleEnrollClick}>
        <Img src={plus}></Img>상품등록
      </Button>
    </ButtonsWrapper>
  );
}

export default Enroll;
