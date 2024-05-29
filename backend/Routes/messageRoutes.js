
const express = require('express')
const sendMessage = require("../Controllers/messageController")
const protectedRoutes = require("../Middleware/protectedRoutes");
// const getMessage = require('../Controllers/messageController');
const router = express.Router();
// const getMessage = require("../Controllers/authcontroller");
// const sendMessage = require("../Controllers/messageController")
const messageController = require('../Controllers/messageController');
router.post("/send/:id",protectedRoutes,messageController.sendMessage);
router.get("/:id",protectedRoutes,messageController.getMessage);
module.exports = router;