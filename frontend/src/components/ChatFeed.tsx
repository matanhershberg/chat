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

  // Helper function to get hour:minute from timestamp
  const getTimeKey = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  // Group consecutive messages from the same user with the same hour:minute
  const groupedMessages: Message[][] = [];

  for (let i = 0; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousMessage = i > 0 ? messages[i - 1] : null;

    // Start a new group if:
    // 1. First message
    // 2. Different user
    // 3. Different hour:minute
    if (
      !previousMessage ||
      previousMessage.username !== currentMessage.username ||
      getTimeKey(previousMessage.timestamp) !==
        getTimeKey(currentMessage.timestamp)
    ) {
      groupedMessages.push([currentMessage]);
    } else {
      // Add to the last group
      groupedMessages[groupedMessages.length - 1].push(currentMessage);
    }
  }

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
      {groupedMessages.map((messageGroup) => {
        const firstMessage = messageGroup[0];
        const isOwnMessage = firstMessage.username === currentUser;

        // Show username for every bubble from other users
        const showUsername = !isOwnMessage;

        return (
          <ChatBubble
            key={firstMessage.id}
            messages={messageGroup}
            isOwnMessage={isOwnMessage}
            showUsername={showUsername}
          />
        );
      })}
    </Box>
  );
};

export default ChatFeed;
