import Paper from "@mui/material/Paper";

interface MessageBubbleProps {
  children: React.ReactNode;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  children,
  isOwnMessage,
}) => {
  return (
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
      {children}
    </Paper>
  );
};

export default MessageBubble;
