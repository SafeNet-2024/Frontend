import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ex_img from "../Assets/ex_img.png";
import like_red from "../Assets/like_red.png";
import like_empty from "../Assets/like_empty.png";
import close from "../Assets/close.png";

const ContentWrapper = styled.div`
  width: auto;
  height: auto;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;

const Contents = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

const ProductList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap; /* 너비를 넘어가는 경우 다음 줄로 내려가도록 설정 */
`;

const Product = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
  width: 250px;
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
  width: 220px;
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

const Button = styled.button`
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 30px;
  border: none;
  background-color: transparent;
  color: #4461f2;
  font-size: 14px;
  font-weight: bold;
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseBtn = styled.div`
  float: right;
  margin-bottom: 15px;
`;

const ModalContent = styled.div`
  position: absolute;
  width: 700px;
  height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f7fa;
  padding: 20px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ModalImg = styled.img`
  border-radius: 10px;
  width: 350px;
  height: 300px;
`;

const ModalPost = styled.div`
  width: 300px;
  height: 200px;
  background-color: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const Line = styled.div`
  width: 300px;
  border-top: 2px solid #f5f7fa;
  margin-bottom: 10px;
`;

const ChatBtn = styled.button`
  width: 100%;
  background-color: #4461f2;
  border: none;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  border-radius: 5px;
`;

function Content() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // // 서버에서 데이터를 가져오는 비동기 함수
    // const fetchProducts = async () => {
    //   try {
    //     // axios를 사용하여 서버에서 데이터 가져오기
    //     const response = await axios.get("/api/products");
    //     setProducts(response.data); // 가져온 데이터를 state에 저장
    //   } catch (error) {
    //     console.error("데이터를 가져오는 중 에러 발생:", error);
    //   }
    // };

    // 임시 상품 데이터 생성 함수
    const createTempProduct = (id) => ({
      id,
      title: "파 한 단 가져가실 분",
      category: "채소",
      price: 2000,
      capacity: 500,
      date: "2024-05-10",
      post: "너무 많이 사서 싸게 팝니다~",
      src: ex_img,
      liked: false,
    });

    // 상품 데이터를 products에 저장
    setProducts(Array.from({ length: 6 }, (_, index) => createTempProduct()));

    // // 컴포넌트가 마운트되었을 때 데이터를 가져오도록 호출
    // fetchProducts();
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

  // 찜버튼 클릭 시
  const handleLike = (productIndex) => {
    // products 배열을 복제하여 새로운 배열 생성
    const updatedProducts = [...products];
    // 해당 상품의 좋아요 상태를 반전시킴
    updatedProducts[productIndex].liked = !updatedProducts[productIndex].liked;
    // 상품 상태 업데이트
    setProducts(updatedProducts);
  };

  //더보기 버튼 클릭 시
  const handleMore = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  //채팅하기 버튼 클릭 시
  const handleChatting = () => {};

  return (
    <>
      <ContentWrapper>
        <Contents>우리 동네 식재료</Contents>
      </ContentWrapper>
      <ProductList>
        {/* 서버에서 가져온 데이터를 반복하여 각각의 상품을 표시 */}
        {products.map((product, index) => (
          <Product key={product.id}>
            <ProductImage src={product.src} />
            <div>{product.title}</div>
            <div>
              <LikeButton
                className="like_btn"
                type="button"
                onClick={() => handleLike(index)}
              >
                <LikeImg src={product.liked ? like_red : like_empty}></LikeImg>
              </LikeButton>
              <Button
                className="more_btn"
                type="button"
                onClick={() => handleMore(product)}
              >
                더보기
              </Button>
            </div>
          </Product>
        ))}
      </ProductList>
      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <div>
            <CloseBtn onClick={() => setIsModalOpen(false)}>
              <img style={{ width: "18px" }} src={close} />
            </CloseBtn>
          </div>
          <div style={{ display: "flex" }}>
            <ModalImg src={selectedProduct && selectedProduct.src} />
            <div style={{ marginLeft: "15px" }}>
              <ModalPost>
                <div>
                  <h3>{selectedProduct && selectedProduct.title}</h3>
                  <Line />
                  <p>{selectedProduct && selectedProduct.post}</p>
                  <Line />
                  <div
                    className="category_item"
                    style={{ width: "25px", padding: "5px 10px" }}
                  >
                    {selectedProduct && selectedProduct.category}
                  </div>
                  <div style={{ float: "right", fontWeight: "bold" }}>
                    {selectedProduct && selectedProduct.price}원
                  </div>
                </div>
              </ModalPost>
              <ChatBtn onClick={handleChatting}>판매자와 채팅하기</ChatBtn>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Content;
