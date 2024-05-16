// import { useEffect } from 'react';
import useMessageStore from "../Hooks/useMessageStore";

export default function Room() {
  const messageStore = useMessageStore();

  const { socket, connected, messageToSend, messageLogs } = messageStore;

  socket.onmessage = (event) => {
    const messageReceived = event.data;
    messageStore.receiveMessage(messageReceived);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    messageStore.sendMessage({ status: "SEND" });
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    messageStore.changeInput(value);
  };

  if (!connected) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message-to-send">메시지 입력</label>
        <input type="text" value={messageToSend} onChange={handleChangeInput} />
        <button type="submit">전송</button>
      </form>
      <ul>
        {messageLogs.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
