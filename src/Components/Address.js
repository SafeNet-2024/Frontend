import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../Css/login.css";
import DaumPostcode from "react-daum-postcode";

const Container = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginWrapper = styled.div`
  margin-left: 300px;
`;

function Address() {
  const navigate = useNavigate();
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      const headers = {
        ACCESS_TOKEN: `Bearer ${accessToken}`,
        REFRESH_TOKEN: refreshToken,
      };

      if (address.trim() && postcode.trim()) {
        const res = await axios.patch(
          "http://3.37.120.73:8080/api/auth/address",
          { address: address },
          { headers: headers }
        );
        // 회원가입이 성공한 경우에 대한 처리
        if (res.status === 200) {
          alert("주소설정에 성공하였습니다");
          navigate("/login");
        }
      } else {
        alert("주소를 다시 확인해주세요");
      }
    } catch (error) {
      console.error("주소설정 실패:", error);
      alert("주소설정에 실패하였습니다.");
    }
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(data);
      console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
      setAddress(data.address);
      setPostcode(data.zonecode);
      //   setAddress2(data)
      setOpenPostcode(false);
    },
  };

  return (
    <Container>
      <LoginWrapper>
        <div
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            width: "800px",
            marginBottom: "50px",
          }}
        >
          Address
        </div>
        <div className="login_div">
          <div className="login_input_div">
            <input
              className="postcode_input"
              type="text"
              value={postcode}
              readOnly
            />
            <button className="address_btn" onClick={handle.clickButton}>
              주소 찾기
            </button>
          </div>
          <div className="login_input_div">
            <input
              className="address_input"
              type="text"
              value={address}
              readOnly
            />
          </div>
          {openPostcode && (
            <DaumPostcode
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )}
          <div className="save_btn">
            <input type="button" value="주소 저장하기" onClick={handleSave} />
          </div>
        </div>
      </LoginWrapper>
    </Container>
  );
}

export default Address;
