import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Topbar from "../Components/Topbar.js";

function ChatPage() {
  const el = "#app";
  const [room_name, setRoomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    findAllRoom();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

  const findAllRoom = () => {
    axios
      .get("/api/rooms")
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  };

  const createRoom = () => {
    if (room_name === "") {
      alert("방 제목을 입력해 주십시요.");
      return;
    } else {
      const params = new URLSearchParams();
      params.append("name", room_name);
      axios
        .post("/chat/room", params)
        .then((response) => {
          alert(response.data.name + "방 개설에 성공하였습니다.");
          setRoomName("");
          findAllRoom();
        })
        .catch((error) => {
          alert("채팅방 개설에 실패하였습니다.");
          console.error("Error creating room:", error);
        });
    }
  };

  const enterRoom = (roomId, roomName) => {
    localStorage.setItem("wschat.roomId", roomId);
    localStorage.setItem("wschat.roomName", roomName);
    window.location.href = "/chat/room/enter/" + roomId;
  };

  // 기존에 채팅방이 있으면 해당 채팅방의 DTO를 반환하는 함수
  const findExistingRoomDTO = (roomId) => {
    const existingRoom = chatrooms.find((room) => room.roomId === roomId);
    if (existingRoom) {
      return {
        roomId: existingRoom.roomId,
        name: existingRoom.name, // 여기에 필요한 다른 속성들을 추가할 수 있습니다.
      };
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <Topbar />
    </div>
  );
}

export default ChatPage;
