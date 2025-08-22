import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const AppContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  position: "relative",
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: -1,
  },
});

export default AppContainer;
