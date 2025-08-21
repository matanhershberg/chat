import { Box, Container, Typography } from "@mui/material";
import Chat from "./components/Chat";
import UsernameModal from "./components/UsernameModal";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: 3, textAlign: "center", mb: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            Chat App
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 1,
              opacity: 0.8,
            }}
          >
            Connect with people around the world
          </Typography>
        </Box>
        <UsernameModal />
        <Chat />
      </Container>
    </Box>
  );
}

export default App;
