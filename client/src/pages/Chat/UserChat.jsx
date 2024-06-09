import React, { useContext, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
//import moment from "moment";
import { useFetchRecipientUser } from "../../components/hooks/useFetchRecipient";
import { unreadNotificationsFunc } from "../../components/utils/unreadNotifications";
import { useFetchLatestMessage } from "../../components/hooks/useFetchLatestMessage";
import { ChatContext } from "./ChatContext";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequests";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat);

  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };
  //^ ==== fetching chat header

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
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
        </div>
        <div className="text-content">
          <div className="name">{`${recipientUser?.firstname} ${recipientUser?.lastname}`}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">{format(latestMessage?.createdAt)}</div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications.length
            : ""}
        </div>
        <span className={isOnline ? "user-online " : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
