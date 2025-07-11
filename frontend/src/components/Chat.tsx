import Stack from "@mui/material/Stack";
import { useState } from "react";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((messages) => [...messages, message]);
  };

  return (
    <Stack direction="column" spacing={2} height="100vh" p={2}>
      <ChatFeed messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Stack>
  );
};

export default Chat;
