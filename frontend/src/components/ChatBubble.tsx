import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Message } from "../models/messages";

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
  const firstMessage = messages[0];
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
        <Paper
          elevation={1}
          sx={{
            p: 1.5,
            background: isOwnMessage
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #374151 0%, #4b5563 100%)",
            color: isOwnMessage ? "#ffffff" : "#e5e7eb",
            borderRadius: 2,
            borderTopLeftRadius: isOwnMessage ? 2 : 0.5,
            borderTopRightRadius: isOwnMessage ? 0.5 : 2,
            wordBreak: "break-word",
          }}
        >
          {!isOwnMessage && showUsername && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontWeight: "bold",
                color: isOwnMessage ? "primary.contrastText" : "info.light",
                mb: 0.5,
                pb: 0.5,
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
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
                mb: index < messages.length - 1 ? 1 : 0,
              }}
            >
              {message.text}
            </Typography>
          ))}
        </Paper>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mt: 0.5,
            mr: isOwnMessage ? 1 : 0,
            ml: isOwnMessage ? 0 : 1,
            fontSize: "0.7rem",
          }}
        >
          {new Date(lastMessage.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;
