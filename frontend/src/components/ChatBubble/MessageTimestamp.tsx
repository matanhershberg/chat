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
  return (
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
  );
};

export default MessageTimestamp;
