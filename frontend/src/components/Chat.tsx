import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions, type RootState } from "../store/store";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.messages);

  const handleSendMessage = (message: string) => {
    dispatch(
      messagesActions.addMessage({
        id: crypto.randomUUID(),
        text: message,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  return (
    <Stack direction="column" spacing={2} height="100vh" p={2}>
      <ChatFeed messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Stack>
  );
};

export default Chat;
