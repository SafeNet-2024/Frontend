import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Topbar from "../Components/Topbar.js";

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인 함수 (여기서는 토큰 유무를 확인)
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      return accessToken && refreshToken;
    };

    if (!checkLoginStatus()) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
    }
  }, [navigate]);

  return (
    <>
      <Topbar />
    </>
  );
}

export default MyPage;
