import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/searchbar.css";

function Searchbar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // 엔터 키를 눌렀을 때 이벤트 처리
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchValue.trim() !== "") {
        // 엔터 키가 눌렸을 때의 동작 수행
        console.log(searchValue, "를 검색합니다.");
        // 예시: 원하는 페이지로 이동
        //navigate("/search-results");
      } else {
        alert("검색어를 입력해주세요.");
      }
    }
  };

  return (
    <div className="searchContainer">
      <input
        className="searchbar"
        type="search"
        placeholder="원하는 식재료 검색"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
}

export default Searchbar;
