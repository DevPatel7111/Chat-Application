const User = require("../Models/usermodel")

exports.getUserForSidebar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id

        const filterUser = await User.find({
            _id:{$ne:loggedInUserId}
        }).select("-password")
        res.status(200).json(filterUser)


    }
    catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
