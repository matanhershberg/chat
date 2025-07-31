import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import type { Message } from "../models/messages";
import type { RootState } from "../store/store";
import ChatBubble from "./ChatBubble";

interface ChatFeedProps {
  messages: Message[];
}

const ChatFeed: React.FC<ChatFeedProps> = ({ messages }) => {
  const currentUser = useSelector((state: RootState) => state.user.name);

  return (
    <Box
      flex={1}
      overflow="auto"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {messages.map((message, index) => {
        const isOwnMessage = message.username === currentUser;
        const previousMessage = index > 0 ? messages[index - 1] : null;
        const showUsername =
          !isOwnMessage &&
          (!previousMessage || previousMessage.username !== message.username);

        return (
          <ChatBubble
            key={message.id}
            message={message}
            isOwnMessage={isOwnMessage}
            showUsername={showUsername}
          />
        );
      })}
    </Box>
  );
};

export default ChatFeed;
