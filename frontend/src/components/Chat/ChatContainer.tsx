import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChatContainer = styled(Stack)({
  height: "calc(100vh - 120px)", // Account for header height
  minHeight: "600px",
  overflow: "hidden", // Prevent page scrolling
  padding: "16px", // Reduced padding for better space utilization
  boxSizing: "border-box", // Include padding in height calculation
  "@media (min-width: 1200px)": {
    padding: "24px", // More padding on larger screens
  },
});

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  return (
    <StyledChatContainer direction={{ xs: "column", lg: "row" }} spacing={3}>
      {children}
    </StyledChatContainer>
  );
};

export default ChatContainer;
