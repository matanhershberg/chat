import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AppContent = styled(Box)({
  position: "relative",
  zIndex: 1,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  mx: { xs: 1, sm: 2, md: 3 }, // Responsive horizontal margins
});

export const ChatWrapper = styled(Box)({
  flex: 1,
});
