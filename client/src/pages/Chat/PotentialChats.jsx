import { useContext } from "react";
import { useSelector } from "react-redux";
import { ChatContext } from "./ChatContext";
import Notification from "./Notification";

const PotentialChats = () => {
  const { user } = useSelector((state) => state.authReducer.authData) || {};

  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  console.log("potentialChats", potentialChats);

  return (
    <div className="d-flex justify-content-between">
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                <img
                  src={
                    u.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER + u.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "defaultProfile.png"
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <strong>{u.firstname}</strong>
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
      <Notification />
    </div>
  );
};

export default PotentialChats;
