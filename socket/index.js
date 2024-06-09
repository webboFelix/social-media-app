const { Server } = require("socket.io");

dotenv.config();

const client_use = process.env.client;

const io = new Server({ cors: `${client_use}` });

let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  //&  listen to a connection
  socket.on("addNewUser", (userId) => {
    if (userId) {
      const userExists = onlineUsers.some((user) => user.userId === userId);
      if (!userExists) {
        onlineUsers.push({
          userId: userId,
          socketId: socket.id,
        });
      }
      console.log("onlineUsers", onlineUsers);

      // Emit the updated list of online users to all clients
      io.emit("getOnlineUsers", onlineUsers);
    } else {
      console.error("Received null or undefined userId");
    }
  });
  //& ====== add message =====
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("receive-message", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    // remove user from active users
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", onlineUsers);
    // send all active users to all users
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(8800);
