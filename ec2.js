const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Socket.IO client connected on machine B");
});

app.use("/logs", express.json());

app.post("/logs", (req, res) => {
  const { level, message } = req.body;
  console.log(`[${level}] Log from machine A: ${message}`);
  res.status(200).send("Log received");
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
