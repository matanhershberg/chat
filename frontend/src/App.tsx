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
    event.preventDefault();
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
        height: "100vh",
        padding: "16px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "16px",
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem key={message}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ flexShrink: 0 }}>
        <form
          onSubmit={handleSendMessage}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            label="Type a message"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
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
      </div>
    </Container>
  );
}

export default App;
