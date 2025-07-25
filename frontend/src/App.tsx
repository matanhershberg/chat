import Container from "@mui/material/Container";
import Chat from "./components/Chat";
import Websocket from "./websocket";

new Websocket();

function App() {
  return (
    <Container maxWidth="xl">
      <Chat />
    </Container>
  );
}

export default App;
