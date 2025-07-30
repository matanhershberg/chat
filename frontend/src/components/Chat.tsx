import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import websocket from "../websocket";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";

const Chat = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);

  const handleSendMessage = (message: string) => {
    websocket.emit({
      id: crypto.randomUUID(),
      text: message,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <Stack direction="column" spacing={2} height="100vh" p={2}>
      <ChatFeed messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Stack>
  );
};

export default Chat;
