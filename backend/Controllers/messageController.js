// const Conversation = require("../Models/conversation");
const Conversation = require("../Models/conversation");
const Message = require("../Models/Messagemodel");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("Request Body:", req.body);
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    let conversation = await Conversation.findOne({
      participates: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      console.log("Creating new conversation...");
      conversation = await Conversation.create({
        participates: [senderId, receiverId],
      });
      console.log("New Conversation:", conversation);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    console.log("New Message:", newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // console.log("Conversation before saving:", conversation);

    await Promise.all([conversation.save(), newMessage.save()]);

    console.log("Conversation after saving:", conversation);
    console.log("New Message after saving:", newMessage);

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "server error" });
  }
};

//module.exports = sendMessage;

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participates: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
