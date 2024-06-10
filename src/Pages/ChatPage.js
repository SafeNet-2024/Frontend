import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, json, useLocation } from "react-router-dom";
import Topbar from "../Components/Topbar.js";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "../Css/chatting.css";

function ChatPage() {
  const location = useLocation();
  const { postId } = location.state || {};
  const stompClient = useRef(null);
  const [messages, setMessages] = new useState([]);
  const [inputValue, setInputValue] = new useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [sender, setSender] = useState("");

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수
    const fetchChatting = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const headers = {
        ACCESS_TOKEN: `Bearer ${accessToken}`,
        REFRESH_TOKEN: refreshToken,
      };

      if (postId) {
        try {
          // 채팅방 생성 or 기존 채팅방 불러오기
          const response = await axios.post(
            `http://3.37.120.73:8080/api/v2/posts/${Number(postId)}/rooms`,
            null,
            { headers: headers }
          );
          setRoomId(response.data["roomId"]);
          console.log(response);
        } catch (error) {
          console.error("데이터를 가져오는 중 에러 발생:", error);
        }
      }

      try {
        // 채팅방 리스트 불러오기
        const res = await axios.get("http://3.37.120.73:8080/api/v2/rooms", {
          headers: headers,
        });
        setChatrooms(res.data); // 채팅방 리스트 상태 업데이트

        const existingRoom = res.data.find((room) => room.roomId === roomId);
        if (existingRoom) {
          setSender(existingRoom["sender"]);
        }
        console.log(res.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      }

      if (roomId) {
        try {
          // 채팅방 메세지 불러오기
          const res2 = await axios.get(
            `http://3.37.120.73:8080/api/rooms/${roomId}/message`,
            { headers: headers }
          );
          setMessages(res2.data);
          console.log(res2);
        } catch (error) {
          console.error("데이터를 가져오는 중 에러 발생:", error);
        }
      }
    };

    fetchChatting();
    connect();

    return () => disconnect();
  }, [postId, roomId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const connect = () => {
    const socket = new SockJS("http://3.37.120.73:8080/ws-stomp");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // useEffect(() => {
  //   connect();
  //   fetchMessages();
  //   return () => disconnect();
  // }, []);

  const sendMessage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const headers = {
      ACCESS_TOKEN: `Bearer ${accessToken}`,
      REFRESH_TOKEN: refreshToken,
    };

    if (stompClient.current && stompClient.current.connected && inputValue) {
      const body = { sender: sender, roomId: roomId, message: inputValue };
      stompClient.current.send(
        "/pub/chat/message",
        headers,
        JSON.stringify(body)
      );
      setInputValue(""); // 메시지 전송 후 입력값 초기화
    }
  };
  // const el = "#app";
  // const [room_name, setRoomName] = useState("");
  // const [chatrooms, setChatrooms] = useState([]);

  // useEffect(() => {
  //   findAllRoom();
  // }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

  // const findAllRoom = () => {
  //   axios
  //     .get("/api/rooms")
  //     .then((response) => {
  //       setChatrooms(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching chat rooms:", error);
  //     });
  // };

  // const createRoom = () => {
  //   if (room_name === "") {
  //     alert("방 제목을 입력해 주십시요.");
  //     return;
  //   } else {
  //     const params = new URLSearchParams();
  //     params.append("name", room_name);
  //     axios
  //       .post("/chat/room", params)
  //       .then((response) => {
  //         alert(response.data.name + "방 개설에 성공하였습니다.");
  //         setRoomName("");
  //         findAllRoom();
  //       })
  //       .catch((error) => {
  //         alert("채팅방 개설에 실패하였습니다.");
  //         console.error("Error creating room:", error);
  //       });
  //   }
  // };

  // const enterRoom = (roomId, roomName) => {
  //   localStorage.setItem("wschat.roomId", roomId);
  //   localStorage.setItem("wschat.roomName", roomName);
  //   window.location.href = "/chat/room/enter/" + roomId;
  // };

  // // 기존에 채팅방이 있으면 해당 채팅방의 DTO를 반환하는 함수
  // const findExistingRoomDTO = (roomId) => {
  //   const existingRoom = chatrooms.find((room) => room.roomId === roomId);
  //   if (existingRoom) {
  //     return {
  //       roomId: existingRoom.roomId,
  //       name: existingRoom.name, // 여기에 필요한 다른 속성들을 추가할 수 있습니다.
  //     };
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <>
      <Topbar />
      <div className="container">
        <div className="chat-container">
          <div className="chatroom-list">
            <h2>Chat Rooms</h2>
            <ul>
              {chatrooms.map((room, index) => (
                <li key={index}>
                  {room.receiver}
                  <Link to={`/chat/room/${room.id}`}>{room.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-content">
            {(messages || []).map((item, index) => (
              <div key={index} className="list-item">
                {item.message}
              </div>
            ))}
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={sendMessage}>전송</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
