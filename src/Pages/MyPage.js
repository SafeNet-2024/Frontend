import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Topbar from "../Components/Topbar.js";
import like_red from "../Assets/like_red.png";
import like_empty from "../Assets/like_empty.png";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #4461f2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SidebarItem = styled.div`
  width: 100%;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  text-align: center;
  margin: 10px 0;
  background-color: ${(props) => (props.selected ? "#3550d1" : "#4461f2")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3550d1;
  }
`;

const Content = styled.div`
  flex: 1;
  background-color: #f5f7fa;
  padding: 20px;
`;

const ProductList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap; /* 너비를 넘어가는 경우 다음 줄로 내려가도록 설정 */
`;

const Product = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
  width: 220px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f5f7fa;
  color: #717171;
  font-size: 15px;
  font-weight: bold;
  border: 0.5px solid #eee;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  margin-top: 5px;
  width: 200px;
  height: 120px;
`;

const LikeButton = styled.button`
  border: none;
  float: left;
`;

const LikeImg = styled.img`
  width: 25px;
  border: none;
  background-color: none;
`;

function MyPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("liked"); // 'liked' 또는 'posts' 상태를 가짐
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const headers = {
    ACCESS_TOKEN: `Bearer ${accessToken}`,
    REFRESH_TOKEN: refreshToken,
  };

  useEffect(() => {
    // 로그인 상태 확인 함수 (여기서는 토큰 유무를 확인)
    const checkLoginStatus = () => {
      return accessToken && refreshToken;
    };

    if (!checkLoginStatus()) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
    }

    const fetchMyList = async () => {
      try {
        // axios를 사용하여 서버에서 데이터 가져오기
        const response = await axios.get(
          `http://3.37.120.73:8080/api/v2/mypage/liked-posts`,
          { headers: headers }
        );
        console.log(response);
        if (response.data !== "등록된 찜이 없습니다.") {
          setProducts(response.data); // 가져온 데이터를 state에 저장
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      }
    };

    const fetchMyPosts = async () => {
      try {
        const response = await axios.get(
          `http://3.37.120.73:8080/api/v2/mypage/my-posts`,
          { headers: headers }
        );
        setMyPosts(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      }
    };

    if (checkLoginStatus()) {
      fetchMyList();
      fetchMyPosts();
    }
  }, [navigate]);

  return (
    <>
      <Topbar />
      <PageContainer>
        <Sidebar>
          <SidebarItem
            onClick={() => setSelectedTab("liked")}
            selected={selectedTab === "liked"}
          >
            내 찜목록
          </SidebarItem>
          <SidebarItem
            onClick={() => setSelectedTab("posts")}
            selected={selectedTab === "posts"}
          >
            내 게시물
          </SidebarItem>
        </Sidebar>
        <Content>
          {selectedTab === "liked" && (
            <ProductList>
              {(products || []).map((product) => (
                <Product key={product.postId}>
                  <ProductImage src={product.productImageUrl} />
                  <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    {product.title}
                  </div>
                  <div>
                    <LikeButton className="like_btn" type="button">
                      {" "}
                      {!product.mine && (
                        <LikeImg
                          src={
                            product.likedByCurrentUser ? like_red : like_empty
                          }
                          alt="like"
                        />
                      )}
                    </LikeButton>
                  </div>
                </Product>
              ))}
            </ProductList>
          )}
          {selectedTab === "posts" && (
            <ProductList>
              {(myPosts || []).map((post) => (
                <Product key={post.postId}>
                  <ProductImage src={post.productImageUrl} />
                  <div style={{ marginBottom: "10px", marginTop: "5px" }}>
                    {post.title}
                  </div>
                </Product>
              ))}
            </ProductList>
          )}
        </Content>
      </PageContainer>
    </>
  );
}

export default MyPage;
