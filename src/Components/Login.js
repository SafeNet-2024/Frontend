import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../Css/login.css";

const Container = styled.div`
  display: flex;
`;

const SignUpBtn = styled.button`
  float: right;
  margin-right: 100px;
  margin-top: 20px;
  font-weight: bold;
  border: none;
  color: #4461f2;
  background-color: #ffffff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 17px;
  font-weight: bold;
  line-height: 18px;
  letter-spacing: -0.2px;
  filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 2px 1px);
`;

const LoginWrapper = styled.div`
  width: 400px;
  height: 500px;
`;

function Login() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        useremail,
        password,
      });
      // 로그인이 성공한 경우에 대한 처리
      const user = res.data;
      const jwtToken = user.token;
      const { result, errorCause } = res.data;

      // 토큰 저장
      sessionStorage.setItem("userToken", jwtToken);
      console.log(res.data);
      onLoginSuccess();
    } catch (error) {
      // 로그인이 실패한 경우에 대한 처리
      console.error("로그인 실패:", error);
    }
  };

  const onLoginSuccess = () => {
    navigate("/"); // 로그인 성공 시 대시보드 페이지로 이동
  };

  return (
    <Container>
      <div>
        <SignUpBtn>회원가입</SignUpBtn>
      </div>
      <LoginWrapper>
        <div
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            width: "400px",
            marginTop: "50px",
          }}
        >
          Login With GROSHARE
        </div>
        <div
          style={{
            fontSize: "17px",
            fontWeight: "normal",
            width: "400px",
            color: "gray",
            marginTop: "30px",
          }}
        >
          GROSHARE은 1인 가구를 위한 식재료 쉐어 마켓입니다. 여러분은 남은
          식재료를 자유롭게 사고 팔 수 있습니다!
        </div>
        <form style={{ marginTop: "50px" }}>
          <div className="login_div">
            <div className="login_input_div">
              <input
                name="Id"
                className="login_id"
                type="text"
                placeholder="이메일을 입력해주세요"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>

            <div className="login_input_div">
              <input
                name="Pwd"
                className="login_pwd"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label>
                <input type="checkbox" className="save_id" value="id" />
                이메일 저장
              </label>
              <input
                type="button"
                className="find_id_pwd"
                value="아이디/비밀번호 찾기"
              />
            </div>

            <div className="submit_div">
              <div>
                <input type="button" value="로그인" onClick={handleLogin} />
              </div>
            </div>
          </div>
        </form>
      </LoginWrapper>
    </Container>
  );
}

export default Login;
