import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../Chat/ChatContext";
import { useSelector } from "react-redux";
import ChatBox from "../Chat/ChatBox";
import PotentialChats from "../Chat/PotentialChats";
import UserChat from "../Chat/UserChat";

const Chat = () => {
  const user = useSelector((state) => state.authReducer.authData);

  const { userChats, isChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

  console.log("UserChats", userChats);
  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0" gap={3} pe-3>
            {isChatsLoading && <p>Loading Chats....</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
