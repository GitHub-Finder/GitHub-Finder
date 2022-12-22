const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const serverio = http.createServer(app);
const cors = require("cors");

app.use(cors());

const io = new Server(serverio, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

serverio.listen(3001, () => {
  console.log("Server is running");
});
