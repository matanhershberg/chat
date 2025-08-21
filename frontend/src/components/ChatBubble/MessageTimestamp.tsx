import Typography from "@mui/material/Typography";
import type { Message } from "../../models/messages";

interface MessageTimestampProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  message,
  isOwnMessage,
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  return (
    <Typography
      variant="caption"
      sx={{
        mt: 1,
        color: "text.secondary",
        fontSize: "0.7rem",
        opacity: 0.7,
        fontWeight: 500,
        letterSpacing: "0.3px",
        textAlign: isOwnMessage ? "right" : "left",
        display: "block",
      }}
    >
      {formatTime(message.timestamp)}
    </Typography>
  );
};

export default MessageTimestamp;
