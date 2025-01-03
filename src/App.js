import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import LoginPage from "./Pages/LoginPage.js";
import MyPage from "./Pages/MyPage.js";
import ChatPage from "./Pages/ChatPage.js";
import EnrollPage from "./Pages/EnrollPage.js";
import SignUpPage from "./Pages/SignUpPage.js";
import LocationPage from "./Pages/LocationPage.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/address" element={<LocationPage />} />
      <Route path="/enroll" element={<EnrollPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/chatting" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
