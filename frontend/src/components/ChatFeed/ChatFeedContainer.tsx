import Box from "@mui/material/Box";
import React, { type ReactNode } from "react";
import { useAutoScroll } from "../../hooks/useAutoScroll";

interface ChatFeedContainerProps {
  children: ReactNode;
}

const ChatFeedContainer: React.FC<ChatFeedContainerProps> = ({ children }) => {
  const { scrollRef, handleScroll } = useAutoScroll([children], {
    enabled: true,
    bottomThreshold: 10,
  });

  return (
    <Box
      ref={scrollRef}
      flex={1}
      overflow="auto"
      onScroll={handleScroll}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "transparent", // Make background transparent to match parent
        minHeight: 0, // Ensure proper flexbox behavior
        maxHeight: "100%", // Ensure it doesn't exceed container height
        scrollBehavior: "smooth", // Smooth scrolling for auto-scroll
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
