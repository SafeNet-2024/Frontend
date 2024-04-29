import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import goback from "../Assets/goback.png";
import "../Css/enrollContent.css";

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

function EnrollContent() {
  const [activeSection, setActiveSection] = useState("");

  const handleCategoryClick = (section) => {
    if (section !== activeSection) {
      setActiveSection(section);
    }
  };

  // 첨부 버튼 클릭 시
  const handleAttach = () => {};

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
              <input className="input_content" />
              년
              <input className="input_content" />
              월
              <input className="input_content" />일
            </Menu>
            <Menu>
              원가 증빙용 영수증 첨부
              <Button type="button" onClick={handleAttach}>
                첨부
              </Button>
            </Menu>
          </Content>
        </Contents>
      </ContentWrapper>
    </>
  );
}

export default EnrollContent;
