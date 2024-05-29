const path = require("path");
const express = require("express");
const authRoutes = require("./Routes/approutes");
const dbconnect = require("./dbcongig/dbconnect");
const messageRoutes = require("./Routes/messageRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
// const app = express();
const dotenv = require("dotenv");
const { app, server } = require("./socket/socket");

// dotenv.config();
// const __dirname = path.resolve();

// const port = process.env.PORT;

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/Message", messageRoutes);
// app.use("/api/user", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(port, () => {
//   dbconnect();
//   console.log(`Running at port ${port}`);
// });

dotenv.config();

__dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/Message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  dbconnect();
	console.log(`Server Running on port ${PORT}`);
});