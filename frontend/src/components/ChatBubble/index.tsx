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
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
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
