import useMessageStore from "../Hooks/useMessageStore";

export default function RoomList() {
  const messageStore = useMessageStore();

  const { socket, connected, currentRoomIndex, roomIndices } = messageStore;

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      messageStore.disconnect(currentRoomIndex);
    }
    messageStore.connect(newRoomIndex);
  };

  const handleClickQuitRoom = async () => {
    messageStore.disconnect(currentRoomIndex);
  };

  socket.onopen = () => {
    messageStore.sendMessage({ status: "CONNECTED" });
  };

  return (
    <div>
      <ul>
        {roomIndices.map((roomIndex) => (
          <li key={roomIndex}>
            <button
              type="button"
              onClick={() =>
                handleClickEnterRoom({
                  previousRoomIndex: currentRoomIndex,
                  newRoomIndex: roomIndex,
                })
              }
            >
              채팅방 {roomIndex}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => handleClickQuitRoom()}>
        연결 종료
      </button>
    </div>
  );
}
