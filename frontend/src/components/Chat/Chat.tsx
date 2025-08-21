import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import websocket from "../../websocket";
import ChatContainer from "./ChatContainer";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import MainChatArea from "./MainChatArea";
import UsersSidebar from "./UsersSidebar";

const Chat: React.FC = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const user = useSelector((state: RootState) => state.user);

  const handleSendMessage = (message: string) => {
    if (user.name === undefined) {
      throw new Error("User name is not set");
    }

    websocket.emit({
      type: "chat",
      payload: {
        id: crypto.randomUUID(),
        text: message,
        username: user.name,
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <ChatContainer>
      <MainChatArea>
        <ChatHeader />
        <ChatContent messages={messages} onSendMessage={handleSendMessage} />
      </MainChatArea>
      <UsersSidebar />
    </ChatContainer>
  );
};

export default Chat;
