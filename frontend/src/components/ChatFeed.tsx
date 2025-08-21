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
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "rgba(255, 255, 255, 0.02)",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      {groupedMessages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "text.secondary",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              opacity: 0.6,
            }}
          >
            💬
          </Box>
          <Box sx={{ fontSize: "18px", fontWeight: 500 }}>
            Start the conversation
          </Box>
          <Box sx={{ fontSize: "14px", opacity: 0.7 }}>
            Send a message to begin chatting
          </Box>
        </Box>
      ) : (
        groupedMessages.map((messageGroup) => {
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
        })
      )}
    </Box>
  );
};

export default ChatFeed;
