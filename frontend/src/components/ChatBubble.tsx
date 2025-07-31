import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { Message } from "../models/messages";

interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showUsername?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwnMessage,
  showUsername = true,
}) => {
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
        {!isOwnMessage && showUsername && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: 0.5,
              ml: 1,
            }}
          >
            {message.username}
          </Typography>
        )}
        <Paper
          elevation={1}
          sx={{
            p: 1.5,
            backgroundColor: isOwnMessage ? "primary.main" : "grey.800",
            color: isOwnMessage ? "primary.contrastText" : "text.primary",
            borderRadius: 2,
            borderTopLeftRadius: isOwnMessage ? 2 : 0.5,
            borderTopRightRadius: isOwnMessage ? 0.5 : 2,
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">{message.text}</Typography>
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
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;
