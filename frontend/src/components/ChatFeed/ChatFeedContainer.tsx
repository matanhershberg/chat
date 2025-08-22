import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface ChatFeedContainerProps {
  children: ReactNode;
}

const ChatFeedContainer: React.FC<ChatFeedContainerProps> = ({ children }) => {
  return (
    <Box
      flex={1}
      overflow="auto"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "transparent", // Make background transparent to match parent
        minHeight: 0, // Ensure proper flexbox behavior
        maxHeight: "100%", // Ensure it doesn't exceed container height
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ChatFeedContainer;
