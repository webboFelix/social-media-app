import React, { useContext, useState } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";
import moment from "moment";
import { ChatContext } from "./ChatContext";
import { useSelector } from "react-redux";
import { unreadNotificationsFunc } from "../../components/utils/unreadNotifications";
const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    userChats,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    allUsers,
  } = useContext(ChatContext);
  const { user } = useSelector((state) => state.authReducer.authData) || {};

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.firstname,
    };
  });

  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <BsChatLeftTextFill
          style={{ fontSize: "2em", color: "var(--orange)" }}
        />
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div variant="primary" className="notifications-header text-white">
            <h3>Notification</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No Notification</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead
                      ? "notification text-white"
                      : "notification not-read text-white"
                  }
                  onClick={() => {
                    markNotificationAsRead(n, userChats, user, notifications);
                    setIsOpen(false);
                  }}
                >
                  <span>{`${n.senderName} send you a new message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
