import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";

let socket;

function Chat() {

  const { user } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket = socketIO(ENDPOINT);

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("sendMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

  }, []);

  const sendMessage = () => {

    socket.emit("message", {
      message,
      id: socket.id
    });

    setMessage("");

  };

  return (

    <div>

      <h2>Chat Room</h2>

      {messages.map((item, i) => (
        <div key={i}>
          {item.user}: {item.message}
        </div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

    </div>

  );
}

export default Chat;