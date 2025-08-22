import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)({
  padding: 24,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
  overflow: "hidden", // Prevent background from extending beyond boundaries
  borderTopLeftRadius: 24, // Match the MainChatArea border radius
  borderTopRightRadius: 24, // Match the MainChatArea border radius
});

const HeaderContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

const StatusIndicator = styled(Box)({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "#10b981",
  boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
});

const HeaderTitle = styled(Box)({
  fontWeight: 600,
  color: "text.primary",
});

const ChatHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <StatusIndicator />
        <HeaderTitle>Live Chat</HeaderTitle>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default ChatHeader;
