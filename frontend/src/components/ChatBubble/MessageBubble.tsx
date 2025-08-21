import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface MessageBubbleProps {
  children: ReactNode;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  children,
  isOwnMessage,
}) => {
  return (
    <Box
      sx={{
        background: isOwnMessage
          ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
          : "rgba(255, 255, 255, 0.08)",
        color: isOwnMessage ? "white" : "text.primary",
        padding: "12px 16px",
        borderRadius: isOwnMessage
          ? "18px 18px 4px 18px"
          : "18px 18px 18px 4px",
        boxShadow: isOwnMessage
          ? "0 4px 20px rgba(99, 102, 241, 0.3)"
          : "0 2px 12px rgba(0, 0, 0, 0.1)",
        border: isOwnMessage ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        position: "relative",
        "&::before": isOwnMessage
          ? {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: -8,
              width: 0,
              height: 0,
              borderLeft: "8px solid #4f46e5",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
            }
          : {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: -8,
              width: 0,
              height: 0,
              borderRight: "8px solid rgba(255, 255, 255, 0.08)",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
            },
      }}
    >
      {children}
    </Box>
  );
};

export default MessageBubble;
