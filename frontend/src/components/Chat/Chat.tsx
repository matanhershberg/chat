import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../../store/messages";
import { type RootState } from "../../store/store";
import { generateTestMessagesWithDelay } from "../../utils/testMessages";
import websocket from "../../websocket";
import ChatContainer from "./ChatContainer";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import MainChatArea from "./MainChatArea";
import UsersSidebar from "./UsersSidebar";

const Chat: React.FC = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSendMessage = (message: string) => {
    if (user.name === undefined) {
      throw new Error("User name is not set");
    }

    // Check if this is a test command
    if (message.trim().startsWith("/test")) {
      const parts = message.trim().split(/\s+/);
      const count = parseInt(parts[1]) || 20; // Default to 20 messages
      const delayMs = parseInt(parts[2]) || 0; // Default to 0ms delay

      // Generate and display test messages with delay
      generateTestMessagesWithDelay(user.name, count, delayMs, (message) => {
        dispatch(messagesActions.addMessage(message));
      });
      return;
    }

    // Normal message handling
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
