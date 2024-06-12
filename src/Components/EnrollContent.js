import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import goback from "../Assets/goback.png";
import down from "../Assets/down.png";
import upload_img from "../Assets/upload_img.png";
import "../Css/enrollContent.css";
import "react-calendar/dist/Calendar.css";

const ContentWrapper = styled.div`
  width: auto;
  height: auto;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 30px 40px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  border: 1px solid #eee;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  background-color: #eff1fb;
`;

const GoBack = styled.img`
  width: 40px;
  height: 40px;
`;

const Menu = styled.div`
  padding: 15px;
  font-size: 15px;
`;

const Button = styled.button`
  position: relative;
  border: none;
  display: inline-block;
  padding: 5px 7px;
  margin-left: 10px;
  border-radius: 50px;
  border: 2px solid #4461F2;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.10);
  transition: 0.25s;
  color: #4461F2;
  background-color: #ffffff;
}
`;

const Label = styled.label`
  display: inline-block;
  padding: 5px 8px;
  background-position: center;
  border: 2px solid #4461f2;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  transition: 0.25s;
  color: #4461f2;
  background-color: #ffffff;
`;

const CalendarContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

const DropdownButton = styled.button`
  width: 200px;
  height: 43px;
  border: 2px solid #4461f2;
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-image: url(${down});
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const EnrollButton = styled.button`
  position: relative;
  width: 80px;
  border: none;
  margin: 0 auto;
  display: block;
  padding: 7px 10px;
  border-radius: 50px;
  border: 2px solid #4461F2;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.15);
  transition: 0.25s;
  color: #ffffff;
  background-color: #4461F2;
  opacity: ${(props) =>
    props.disabled ? "0.5" : "1"}; /* 비활성화 시 반투명 */
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : "pointer"}; /* 비활성화 시 커서 변경 */
}
`;

const ReceiptMessage = styled.p`
  color: ${(props) => (props.isValid ? "green" : "red")};
  font-size: 12px;
`;

function EnrollContent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 제목
  const [category, setCategory] = useState(""); // 카테고리
  const [price, setPrice] = useState(0); // 가격
  const [capacity, setCapacity] = useState(0); // 용량
  const [post, setPost] = useState(""); //글내용

  const [uploadImgFile, setUploadImgFile] = useState(null); // 상품 이미지
  const [uploadReceiptFile, setUploadReceiptFile] = useState(null); // 영수증 이미지
  const [uploadImgUrl, setUploadImgUrl] = useState(""); // 상품 이미지
  const [uploadReceiptUrl, setUploadReceiptUrl] = useState(""); // 영수증 이미지

  const [activeSection, setActiveSection] = useState("");
  const [nowDate, setNowDate] = useState("날짜");
  const [dateValue, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isReceiptValid, setIsReceiptValid] = useState(false); // 영수증 유효 여부
  const today = new Date();

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

    const isButtonDisabled = !(
      title.trim() &&
      category &&
      !isNaN(price) &&
      price > 0 &&
      !isNaN(capacity) &&
      capacity > 0 &&
      post.trim() &&
      nowDate !== "날짜" &&
      uploadImgFile &&
      uploadReceiptFile
    );
    setIsButtonDisabled(isButtonDisabled);
  }, [
    title,
    category,
    price,
    capacity,
    post,
    nowDate,
    uploadImgFile,
    uploadReceiptFile,
    navigate,
  ]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCategoryClick = (section) => {
    if (section !== activeSection) {
      setActiveSection(section);
      setCategory(section);
      console.log(section, "카테고리");
    }
  };

  const handleToggelCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
    setIsOpen(false);
    setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
  };

  const handleImgUpload = (e) => {
    const { files } = e.target;
    if (files.length === 0) {
      setUploadImgFile(null);
      setUploadImgUrl("");
      return;
    }
    const uploadFile = files[0];
    setUploadImgFile(uploadFile);
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  const handleReceiptUpload = async (e) => {
    const { files } = e.target;
    if (files.length === 0) {
      setUploadReceiptFile(null);
      setUploadReceiptUrl("");
      return;
    }
    const uploadFile = files[0];
    setUploadReceiptFile(uploadFile);
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadReceiptUrl(reader.result);
    };

    try {
      const formData = new FormData();
      formData.append("receiptImage", uploadReceiptFile);
      console.log(formData);
      const res = await axios.post(
        "https://f4mib4dy0b.execute-api.ap-northeast-2.amazonaws.com/api/v1/posts/receipt",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.status === 200) {
        if (res.data["is_receipt"]) {
          alert("영수증이 맞습니다");
          setIsReceiptValid(true);
        } else {
          setIsReceiptValid(false);
          alert("영수증이 아닙니다");
        }
        console.log(res);
      }
    } catch (error) {
      alert(error.data || "영수증 등록에 실패했습니다");
      console.error("영수증 등록 실패:", error);
    }
  };

  // 등록 버튼 클릭 시
  const handleEnroll = async () => {
    const formData = new FormData();
    const data = {
      category: category,
      title: title,
      cost: Number(price),
      count: Number(capacity),
      buyDate: nowDate,
      contents: post,
    };

    formData.append("post", JSON.stringify(data));
    formData.append("receiptImage", uploadReceiptFile);
    formData.append("productImage", uploadImgFile);

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const headers = {
      "Content-Type": "multipart/form-data",
      ACCESS_TOKEN: `Bearer ${accessToken}`,
      REFRESH_TOKEN: refreshToken,
    };

    try {
      const res = await axios.post(
        "http://3.37.120.73:8080/api/v3/posts",
        formData,
        {
          headers: headers,
        }
      );
      if (res.status === 201) {
        alert("게시글이 등록되었습니다");
        console.log(res);
        navigate("/");
      }
    } catch (error) {
      alert(error.data || "게시글 등록에 실패했습니다");
      console.error("상품 등록 실패:", error);
    }

    // axios
    //   .post("/api/product", body)
    //   .then((response) => {
    //     if (response.data.success) {
    //       alert("상품 등록에 성공했습니다.");
    //       navigate("/"); // 메인 페이지로 이동
    //     } else {
    //       alert("상품 등록에 실패했습니다.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("상품 등록 오류: ", error);
    //   });

    // navigate("/"); // 메인 페이지로 이동
  };

  return (
    <>
      <ContentWrapper>
        <GoBack src={goback} onClick={handleGoBack} />
        <Contents>
          <Content>
            <input
              className="input_title"
              type="input"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Content>
          <Content>
            <Menu>
              카테고리 선택
              <div>
                <ul id="categoryList">
                  {["육류", "채소", "어패류", "과일"].map(
                    (categoryItem, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(categoryItem)}
                      >
                        <a
                          className={`category_item ${
                            category === categoryItem ? "active" : ""
                          }`}
                        >
                          {categoryItem}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Menu>
            <Menu>
              가격
              <input
                className="input_content"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              원
            </Menu>
            <Menu>
              용량
              <input
                className="input_content"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              개
            </Menu>
            <Menu>
              구매 일자
              <CalendarContainer>
                <DropdownButton onClick={handleToggelCalendar}>
                  {nowDate}
                </DropdownButton>
                <CalendarWrapper isOpen={isOpen}>
                  <Calendar
                    onChange={handleDateChange}
                    value={dateValue}
                    formatDay={(locale, date) => moment(date).format("DD")}
                    maxDate={today}
                  ></Calendar>
                </CalendarWrapper>
              </CalendarContainer>
            </Menu>
            <Menu>
              원가 증빙용 영수증 첨부
              <div style={{ marginTop: "15px" }}>
                <img
                  style={{ width: "90px", height: "90px" }}
                  src={uploadReceiptUrl}
                  img="img"
                />
              </div>
              {isReceiptValid !== null && (
                <ReceiptMessage isValid={isReceiptValid}>
                  {isReceiptValid ? "영수증이 맞습니다" : "영수증이 아닙니다"}
                </ReceiptMessage>
              )}
              <Label>
                첨부
                <input
                  style={{ marginLeft: "10px", display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                />
              </Label>
            </Menu>
            <Menu>
              상품 이미지 업로드
              <div style={{ marginTop: "15px" }}>
                <img
                  style={{ width: "200px", height: "150px" }}
                  src={uploadImgUrl}
                  img="img"
                />
              </div>
              <Label>
                업로드
                <input
                  style={{ marginLeft: "10px", display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={handleImgUpload}
                />
              </Label>
            </Menu>
          </Content>
          <Content>
            <textarea
              className="input_post"
              type="text-area"
              placeholder="내용"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </Content>
          <EnrollButton
            type="submit"
            onClick={handleEnroll}
            disabled={isButtonDisabled}
          >
            등록
          </EnrollButton>
        </Contents>
      </ContentWrapper>
    </>
  );
}

export default EnrollContent;
