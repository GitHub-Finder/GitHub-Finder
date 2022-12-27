import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Chat() {
  const socket = io.connect("http://localhost:3001");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const sendMessage = () => {
    socket.emit("send_message", { message: input });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data.message]);
    });
  }, [socket]);
  return (
    <div>
      <div>
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={sendMessage}>Send Message</button>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </div>
    </div>
  );
}

export default Chat;
