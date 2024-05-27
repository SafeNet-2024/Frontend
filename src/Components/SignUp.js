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

const LoginBtn = styled.button`
  float: right;
  margin-left: 500px;
  margin-top: 150px;
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

function SignUp() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState("");
  const [certcode, setCertcode] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [rightcode, setRightcode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleSignin = () => {
    navigate("/login");
  };

  const handleSendCode = async () => {
    try {
      if (useremail.trim() === "") {
        alert("이메일을 입력해주세요");
      } else {
        const res = await axios.post("/api/auth/sendCode", {
          email: useremail,
        });
        if (res.status === 200) {
          // const user = res.data;
          // const accessToken = user.token;
          console.log(res.data);
          alert("인증번호를 발송하였습니다");
          setRightcode(res.data["authenticationCode"]);
        }
      }
    } catch (error) {
      console.error("인증번호 발송 실패:", error);
    }
  };

  const handleCheckCode = () => {
    if (certcode === "") {
      alert("인증번호를 입력해주세요");
    }
    if (certcode === rightcode) {
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const handleSignUp = async () => {
    try {
      if (
        useremail.trim() &&
        password.trim() &&
        nickname.trim() &&
        phonenum.trim() &&
        rightcode.trim() &&
        rightcode === certcode
      ) {
        if (password.length < 8 || password.length > 16) {
          alert("비밀번호는 8자에서 16자 사이여야 합니다.");
          return;
        }
        if (nickname.length < 2) {
          alert("닉네임은 두 글자 이상이어야 합니다.");
          return;
        }
        const res = await axios.post("/api/auth/signup", {
          id: useremail,
          password: password,
          name: nickname,
          phoneNumber: phonenum,
        });
        // 회원가입이 성공한 경우에 대한 처리
        if (res.status === 200) {
          // const user = res.data;
          // const accessToken = user.token;
          console.log(res.data);
          alert(res.data["result"]);
          navigate("/login"); //로그인 페이지로 다시 이동
        } else if (res.status === 404) {
          alert("이미 가입된 이메일입니다");
        }
      } else {
        alert("입력 항목을 다시 확인해주세요");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <Container>
      <div>
        <LoginBtn onClick={handleSignin}>로그인</LoginBtn>
      </div>
      <LoginWrapper>
        <div
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            width: "800px",
            marginTop: "30px",
          }}
        >
          SignUp
        </div>
        <form style={{ marginTop: "50px" }}>
          <div className="login_div">
            <div style={{ display: "flex" }}>
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
              <div className="btn_div">
                <input
                  type="button"
                  value="인증번호 발송"
                  onClick={handleSendCode}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="login_input_div">
                <input
                  name="Certcode"
                  className="login_pwd"
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={certcode}
                  onChange={(e) => setCertcode(e.target.value)}
                />
              </div>
              <div className="btn_div">
                <input
                  type="button"
                  value="인증번호 확인"
                  onClick={handleCheckCode}
                />
              </div>
            </div>
            {codeError && (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "3px",
                  marginLeft: "20px",
                }}
              >
                인증번호가 올바르지 않습니다.
              </div>
            )}

            <div className="login_input_div">
              <input
                name="Pwd"
                className="login_pwd"
                type="password"
                placeholder="비밀번호를 입력해주세요 (8~16자)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login_input_div">
              <input
                name="Nickname"
                className="login_pwd"
                type="text"
                placeholder="닉네임을 입력해주세요 (최소 두 글자)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="login_input_div">
              <input
                name="Phonenum"
                className="login_pwd"
                type="text"
                placeholder="전화번호를 입력해주세요"
                value={phonenum}
                onChange={(e) => setPhonenum(e.target.value)}
              />
            </div>

            <div className="submit_div">
              <input type="button" value="회원가입" onClick={handleSignUp} />
            </div>
          </div>
        </form>
      </LoginWrapper>
    </Container>
  );
}

export default SignUp;
