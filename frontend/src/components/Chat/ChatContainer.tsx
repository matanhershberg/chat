import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChatContainer = styled(Stack)({
  height: "calc(100vh - 200px)",
  minHeight: "600px",
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
