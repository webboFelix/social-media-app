import { useContext, useEffect, useRef, useState } from "react";
import { Stack, Button } from "react-bootstrap";
//import moment from "moment";
import { format } from "timeago.js";

import InputEmoji from "react-input-emoji";
import { BsSendFill, BsLink45Deg, BsPaperclip } from "react-icons/bs";
import { ChatContext } from "./ChatContext";
import { useSelector } from "react-redux";
import { useFetchRecipientUser } from "../../components/hooks/useFetchRecipient";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFetchLatestMessage } from "../../components/hooks/useFetchLatestMessage";

const ChatBox = () => {
  const { user } = useSelector((state) => state.authReducer.authData) || {};

  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Tap to start a conversation ....
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chats ....</p>
    );
  //^  handle send link
  const handleSendLink = () => {
    const link = prompt("Enter the link to share:");
    if (link) {
      sendTextMessage(link, user, currentChat._id, setTextMessage);
    }
  };

  //^ handle send file

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <img
          src={
            recipientUser?.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER +
                recipientUser.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />{" "}
        <strong style={{ color: "white" }}>{recipientUser?.firstname}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id ? "message own" : "message "
              }`}
              ref={scroll}
            >
              <span>{message.text}</span>
              <span
                style={{ color: "var(--cardColor)" }}
                className="message-footer"
              >
                {format(message.createdAt)}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <Button variant="outline-primary" onClick={handleSendLink}>
          <BsLink45Deg />
        </Button>

        <Button variant="outline-secondary" as="label">
          <BsPaperclip />
          <input type="file" hidden />
        </Button>

        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223 0.2 "
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <BsSendFill />
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
