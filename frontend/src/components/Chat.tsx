import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import websocket from "../websocket";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";

const Chat = () => {
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
    <Stack direction="column" spacing={2} height="100vh" p={2}>
      <ChatFeed messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Stack>
  );
};

export default Chat;
