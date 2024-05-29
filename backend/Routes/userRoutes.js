const express = require("express")
const router = express.Router();
const protectedRoutes = require("../Middleware/protectedRoutes");
const { getUserForSidebar } = require("../Controllers/userController");


router.get("/",protectedRoutes,getUserForSidebar);

module.exports = router;