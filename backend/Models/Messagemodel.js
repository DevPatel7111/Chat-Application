const mongoose = require("mongoose");

const messageScheme = new mongoose.Schema(
  {
    senderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requied: true,
    },
    message:{
      type: String,
      requied: true,
    },
  },{timestamps: true,});
const Message = mongoose.model("Message", messageScheme);
module.exports = Message;
