import Box from "@mui/material/Box";
import type { Message } from "../../models/messages";
import MessageBubble from "./MessageBubble";
import MessageContent from "./MessageContent";
import MessageTimestamp from "./MessageTimestamp";

interface ChatBubbleProps {
  messages: Message[];
  isOwnMessage: boolean;
  showUsername?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  messages,
  isOwnMessage,
  showUsername = true,
}) => {
  const lastMessage = messages[messages.length - 1];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOwnMessage ? "flex-end" : "flex-start",
        mb: 2,
        animation: "fadeInUp 0.3s ease-out",
        "@keyframes fadeInUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <MessageBubble isOwnMessage={isOwnMessage}>
          <MessageContent
            messages={messages}
            isOwnMessage={isOwnMessage}
            showUsername={showUsername}
          />
        </MessageBubble>
        <MessageTimestamp message={lastMessage} isOwnMessage={isOwnMessage} />
      </Box>
    </Box>
  );
};

export default ChatBubble;
