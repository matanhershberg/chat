import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the default form submission behavior
    if (input.trim()) {
      setMessages((messages) => [...messages, input]);
      setInput("");
    }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <List style={{ width: "100%" }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
      <form
        onSubmit={handleSendMessage}
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Type a message"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!input.trim()}
        >
          Send
        </Button>
      </form>
    </Container>
  );
}

export default App;
