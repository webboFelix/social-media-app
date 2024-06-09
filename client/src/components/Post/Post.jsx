import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ChatContext } from "../../pages/Chat/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import Comments from "../comment/Comment";
import PostDetail from "../comment/PostDetail";

const Post = ({ data, chat }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const { onlineUsers } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { posts, loading } = useSelector((state) => state.postReducer);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log("posts", posts);
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const isOnline = onlineUsers?.some(
    (user) => user?._id !== recipientUser?._id
  );

  return (
    <div className="Post">
      <div className="userDet">
        <div>
          <span
            style={{
              width: "0.3em",
              height: "0.3em",
              backgroundColor: "#51e200",
            }}
          ></span>

          <img
            src={
              data.profile
                ? serverPublic + data.profile
                : serverPublic + "defaultProfile.png"
            }
            alt="Profile"
          />
        </div>

        <div>
          <p>
            <strong style={{ fontSize: "1em" }}>{data.postUserName}...</strong>
            <br />
            <span
              style={{
                fontWeight: "200",
                fontStyle: "italic",
                fontSize: "0.8em",
              }}
            >
              #!/@{data.email}
            </span>
          </p>
        </div>
      </div>
      <hr style={{ backgroundColor: "black", width: "100%", height: "2px" }} />
      <span>
        <b>{data.desc}</b>
      </span>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />{" "}
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
      </div>
      <PostDetail />
    </div>
  );
};

export default Post;
