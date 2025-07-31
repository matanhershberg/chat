import Typography from "@mui/material/Typography";
import type { Message } from "../../models/messages";
import UsernameDisplay from "./UsernameDisplay";

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
  const username = firstMessage.username;

  return (
    <>
      {!isOwnMessage && showUsername && (
        <UsernameDisplay username={username} isOwnMessage={isOwnMessage} />
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
    </>
  );
};

export default MessageContent;
