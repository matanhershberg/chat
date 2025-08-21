import { Container } from "@mui/material";
import AppContainer from "./components/AppContainer";
import Chat from "./components/Chat";
import Header from "./components/Header/Header";
import UsernameModal from "./components/UsernameModal";

function App() {
  return (
    <AppContainer>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Header />

        <UsernameModal />
        <Chat />
      </Container>
    </AppContainer>
  );
}

export default App;
