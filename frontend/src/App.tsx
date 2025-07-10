import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <Container
      maxWidth="sm"
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
      <TextField
        label="Type a message"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Container>
  );
}

export default App;
