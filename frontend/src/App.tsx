import { Box } from "@mui/material";
import AppContainer from "./components/AppContainer";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import UsernameModal from "./components/UsernameModal";

function App() {
  return (
    <AppContainer>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          mx: { xs: 1, sm: 2, md: 3 }, // Responsive horizontal margins
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <Chat />
        </Box>
        <UsernameModal />
      </Box>
    </AppContainer>
  );
}

export default App;
