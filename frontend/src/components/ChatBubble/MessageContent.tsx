import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Message } from "../../models/messages";

interface MessageContentProps {
  messages: Message[];
  isOwnMessage: boolean;
  showUsername?: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({
  messages,
  isOwnMessage,
  showUsername = true,
}) => {
  const firstMessage = messages[0];

  return (
    <Box>
      {showUsername && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 1,
            fontWeight: 600,
            color: isOwnMessage ? "rgba(255, 255, 255, 0.9)" : "primary.main",
            fontSize: "0.75rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {firstMessage.username}
        </Typography>
      )}

      {messages.map((message, index) => (
        <Typography
          key={message.id}
          variant="body2"
          sx={{
            lineHeight: 1.5,
            mb: index < messages.length - 1 ? 1 : 0,
            wordBreak: "break-word",
            fontSize: "0.875rem",
            fontWeight: 400,
          }}
        >
          {message.text}
        </Typography>
      ))}
    </Box>
  );
};

export default MessageContent;
