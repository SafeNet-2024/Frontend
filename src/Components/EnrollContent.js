import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import goback from "../Assets/goback.png";
import down from "../Assets/down.png";
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
}
`;

function EnrollContent() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [nowDate, setNowDate] = useState("날짜");
  const [dateValue, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();

  const handleCategoryClick = (section) => {
    if (section !== activeSection) {
      setActiveSection(section);
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

  // 첨부 버튼 클릭 시
  const handleAttach = () => {};

  // 등록 버튼 클릭 시
  const handleEnroll = () => {
    navigate("/");
  };

  return (
    <>
      <ContentWrapper>
        <GoBack src={goback} />
        <Contents>
          <Content>
            <input
              className="input_title"
              type="input"
              placeholder="제목을 입력하세요"
            />
          </Content>
          <Content>
            <Menu>
              카테고리 선택
              <div>
                <ul id="categoryList">
                  {["육류", "채소", "어패류", "과일"].map((category, index) => (
                    <li
                      key={index}
                      onClick={() => handleCategoryClick(`section${index + 1}`)}
                    >
                      <a
                        className={`category_item ${
                          activeSection === `section${index + 1}`
                            ? "active"
                            : ""
                        }`}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Menu>
            <Menu>
              가격
              <input className="input_content" />원
            </Menu>
            <Menu>
              용량
              <input className="input_content" />g
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
              <Button type="button" onClick={handleAttach}>
                첨부
              </Button>
            </Menu>
          </Content>
          <EnrollButton type="button" onClick={handleEnroll}>
            등록
          </EnrollButton>
        </Contents>
      </ContentWrapper>
    </>
  );
}

export default EnrollContent;
