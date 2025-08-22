import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMainChatArea = styled(Paper)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background: "transparent", // Make background transparent to match parent
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  minHeight: 0, // Ensure proper flexbox behavior
});

interface MainChatAreaProps {
  children: React.ReactNode;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({ children }) => {
  return <StyledMainChatArea elevation={0}>{children}</StyledMainChatArea>;
};

export default MainChatArea;
