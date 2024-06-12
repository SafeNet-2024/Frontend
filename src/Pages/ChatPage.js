import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../Components/Topbar.js";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "../Css/chatting.css";

const Line = styled.div`
  width: 300px;
  border-top: 2px solid #eee;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#4461f2" : "#e0e0e0"};
  color: ${({ isCurrentUser }) => (isCurrentUser ? "white" : "black")};
  padding: 10px;
  border-radius: 15px;
  max-width: 60%;
  word-wrap: break-word;
`;

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = location.state || {};
  const stompClient = useRef(null);
  const [messages, setMessages] = new useState([]);
  const [inputValue, setInputValue] = new useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [sender, setSender] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 로그인 상태 확인 함수 (여기서는 토큰 유무를 확인)
    const checkLoginStatus = () => {
      return accessToken && refreshToken;
    };

    if (!checkLoginStatus()) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
    }

    // 서버에서 데이터를 가져오는 비동기 함수
    const fetchChatting = async () => {
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
        console.log(res.data);

        // const existingRoom = res.data.find((room) => room.roomId === roomId);
        // if (existingRoom) {
        //   setSender(existingRoom["sender"]);
        // }
        if (res.status === 200 && res.data.length !== 0) {
          if (res.data[0]["roomName"] === res.data[0]["receiver"]) {
            setSender(res.data[0]["sender"]);
          } else {
            setSender(res.data[0]["receiver"]);
          }
          console.log(sender);
          // setSender(chatrooms[0].sender);
          // console.log(sender);
        }
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
  }, [postId, roomId, navigate]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const connect = () => {
    const accessToken = localStorage.getItem("accessToken");

    const socket = new SockJS("http://3.37.120.73:8080/ws-stomp");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      { ACCESS_TOKEN: `Bearer ${accessToken}` },
      () => {
        if (roomId) {
          stompClient.current.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              const newMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            },
            {
              ACCESS_TOKEN: `Bearer ${accessToken}`,
            }
          );
        }
      },
      (error) => {
        console.error("웹소켓 연결 중 에러 발생:", error);
        // reconnect();
      }
    );
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // const reconnect = () => {
  //   setTimeout(() => {
  //     console.log("웹소켓 재연결 시도 중...");
  //     connect();
  //   }, 5000); // 5초 후에 재연결 시도
  // };

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
    };

    if (
      stompClient.current &&
      stompClient.current.connected &&
      inputValue &&
      roomId
    ) {
      const body = { sender: sender, roomId: roomId, message: inputValue };
      stompClient.current.send("/pub/chat/message", {}, JSON.stringify(body));
      setInputValue(""); // 메시지 전송 후 입력값 초기화
    }
  };

  const handleRoomClick = (room) => {
    setRoomId(room.roomId);
    if (room.roomName === room.receiver) {
      setSender(room.sender);
    } else {
      setSender(room.receiver);
    }
    console.log(sender);
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
            <Line></Line>
            <ul>
              {chatrooms.map((room, index) => (
                <li key={index}>
                  <div
                    style={{ fontSize: "17px", fontWeight: "bold" }}
                    onClick={() => handleRoomClick(room)}
                  >
                    {room.roomName}
                  </div>
                  <div style={{ fontSize: "14px" }}> {room.message}</div>
                  <Line></Line>
                  {/* <Link to={`/chat/room/${room.id}`}>{room.name}</Link> */}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-content">
            {(messages || []).map((item, index) => (
              <Message key={index} isCurrentUser={item.sender === sender}>
                <MessageBubble isCurrentUser={item.sender === sender}>
                  {item.message}
                </MessageBubble>
              </Message>
              // <div key={index} className="list-item">
              //   {item.message}
              // </div>
            ))}
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요"
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
