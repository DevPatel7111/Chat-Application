const jwt = require("jsonwebtoken");
const User = require("../Models/usermodel");
require('dotenv').config();

const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized - No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        console.log("Decoded userId:", decoded.userId);

        const user = await User.findById(decoded.userId).select("-password");
        console.log("Found user:", user);

        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = protectedRoutes;
