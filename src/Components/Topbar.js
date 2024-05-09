import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import chatting from "../Assets/chatting.png";

const TopBarWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #4461f2;
  align-items: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2),
    0 4px 4px rgba(0, 0, 0, 0.2), 0 8px 8px rgba(0, 0, 0, 0.2);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const LogoText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;

const ButtonsWrapper = styled.div`
  margin-left: auto; /* 버튼을 오른쪽 끝으로 이동 */
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  border: none;
  display: inline-block;
  padding: 10px 15px;
  margin-right: 15px;
  border-radius: 50px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.10);
  transition: 0.25s;
  background-color: aliceblue;
  color: #4461F2;
  display: flex;
  align-items: center;
}
`;

const ImgButton = styled.img`
  width: 20px;
  height: 20px;
`;

function Topbar() {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
  };

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogout = () => {
    // 여기에 로그아웃에 대한 동작을 추가하세요
    // axios.get(`/api/users/logout`).then((response) => {
    //   if (response.data.success) {
    //     navigate("/login");
    //   } else {
    //     alert("로그아웃에 실패했습니다");
    //   }
    // });
    alert("로그아웃하였습니다.");
    navigate("/login");
  };

  // 마이페이지 버튼 클릭 시 실행될 함수
  const handleMyPage = () => {
    // 여기에 마이페이지로 이동하는 동작을 추가하세요
    console.log("마이페이지로 이동합니다.");
    navigate("/mypage");
  };

  // 채팅 버튼 클릭 시 실행될 함수
  const handleChatting = () => {
    // 여기에 채팅페이지로 이동하는 동작을 추가하세요
    console.log("채팅페이지로 이동합니다.");
    navigate("/chatting");
  };

  return (
    <TopBarWrapper>
      <LogoWrapper onClick={handleLogo}>
        <Logo src={logo}></Logo>
        <LogoText>GROSHARE</LogoText>
      </LogoWrapper>
      <ButtonsWrapper>
        <Button type="button" onClick={handleChatting}>
          <ImgButton src={chatting}></ImgButton>
        </Button>
        <Button type="button" onClick={handleLogout}>
          로그아웃
        </Button>
        <Button type="button" onClick={handleMyPage}>
          마이페이지
        </Button>
      </ButtonsWrapper>
    </TopBarWrapper>
  );
}

export default Topbar;
