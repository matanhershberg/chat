import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const AppTitle = styled(Typography)({
  fontWeight: 800,
  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  letterSpacing: "-0.02em",
});

export default AppTitle;
