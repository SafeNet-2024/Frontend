import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../Css/login.css";

const Container = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignUpBtn = styled.button`
  float: right;
  margin-left: 500px;
  margin-top: 50px;
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
  margin-left: 400px;
`;

function Login() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      if (useremail.trim() === "") {
        alert("이메일을 입력해주세요.");
      } else if (password.trim() === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        const res = await axios.post("/api/auth/login", {
          id: useremail,
          password: password,
        });
        // 로그인이 성공한 경우에 대한 처리
        if (res.status === 200) {
          // const user = res.data;
          // const accessToken = user.token;
          console.log(res.data);

          // 토큰 저장
          localStorage.setItem("accessToken", res.data["accessToken"]);
          localStorage.setItem("refreshToken", res.data["refreshToken"]);
          navigate("/"); // 로그인 성공 시 대시보드 페이지로 이동
        }
      }
    } catch (error) {
      // 로그인이 실패한 경우에 대한 처리
      console.error("로그인 실패:", error);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <Container>
      <div>
        <SignUpBtn onClick={handleSignUp}>회원가입</SignUpBtn>
      </div>
      <LoginWrapper>
        <div
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            width: "800px",
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
              <input type="button" value="로그인" onClick={handleLogin} />
            </div>
          </div>
        </form>
      </LoginWrapper>
    </Container>
  );
}

export default Login;
