const express = require('express');
const authRoutes = require('./Routes/approutes');
const dbconnect = require('./dbcongig/dbconnect');
const messageRoutes = require('./Routes/messageRoutes');
const userRoutes = require("./Routes/userRoutes")
const cookieParser = require('cookie-parser');
// const app = express();
const dotenv = require('dotenv');
const { app,server } = require('./socket/socket');

dotenv.config();

const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/Message", messageRoutes);
app.use("/api/user", userRoutes);


server.listen(port, () => {
    dbconnect(); 
    console.log(`Running at port ${port}`);
});
