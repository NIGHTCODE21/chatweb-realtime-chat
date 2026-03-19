import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";
import { Message as MessageType } from "../types";
import Message from "../components/Message";
import Input from "../components/Input";

const Chat = () => {
  const { name } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join", name);

    socket.on("message", (msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off();
    };
  }, [name]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", input);
      setInput("");
    }
  };

  const nextUser = () => {
    setMessages([]);
    socket.emit("next");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Anonymous Chat</h2>

      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
        {messages.map((msg, i) => (
          <Message key={i} user={msg.user} text={msg.text} />
        ))}
      </div>

      <Input
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        nextUser={nextUser}
      />
    </div>
  );
};

export default Chat;
