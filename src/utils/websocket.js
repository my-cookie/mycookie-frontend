import { useState, useRef, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const [myroom, setMyroom] = useState("");
  const [room, setRoom] = useState("");
  const [currentroom, setCurrentroom] = useState("");
  const [connect, setConnect] = useState(false);
  const [msg, setMsg] = useState("");
  const [send, setSend] = useState(false);

  const onChange = (e) => {
    setRoom(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setConnect(true);
    setMyroom(room);
    setCurrentroom(room);
  };

  const client = useRef("");

  useEffect(() => {
    if (connect == true && currentroom !== undefined) {
      client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server
      // client.current = new W3CWebSocket("ws:///ws/" + roomname + "/"); //gets room_name from the state and connects to the backend server
      console.log("connected");

      if (send === false) {
        client.current.onopen = function () {
          console.log("WebSocket Client Connected");
          client.current.onmessage = function (e) {
            console.log("메시지와따", e);
            const data = JSON.parse(e.data);

            setMsg(data.msg_id, data.receiver_uuid);
          };
        };
      }

      if (send === true) {
        client.current.onopen = function () {
          client.current.send(
            JSON.stringify({
              type: "chat_message",
              msg_id: 6,
              receiver_uuid: "b55791a195ae46fe9baea0d3d2799508",
            })
          );
          setCurrentroom(myroom);
          setSend(false);
        };
      }
    }
  }, [currentroom]);

  const sendMsg = () => {
    setCurrentroom("b55791a195ae46fe9baea0d3d2799508");
    setSend(true);
  };
  return (
    <div>
      <p>채팅룸:{room}</p>
      <form onSubmit={onSubmit}>
        <input input type="text" onChange={onChange} value={room} />
        <button>입력</button>
      </form>
      <button onClick={sendMsg}></button>
      <p>{msg}</p>
    </div>
  );
}

export default App;
