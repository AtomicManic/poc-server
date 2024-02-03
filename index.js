require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Setup Express routes
app.post("/event", (req, res) => {
  const data = req.body;
  io.emit("dataIn", data); // Emitting data to all connected clients
  res.status(200).json({ message: "Data received and emitted" });
});

// Listen to the port
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your needs for production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
