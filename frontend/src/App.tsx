import Container from "@mui/material/Container";
import Chat from "./components/Chat";
import UsernameModal from "./components/UsernameModal";

function App() {
  return (
    <Container maxWidth="xl">
      <UsernameModal />
      <Chat />
    </Container>
  );
}

export default App;
