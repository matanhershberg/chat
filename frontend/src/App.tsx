import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
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
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} height="100vh" p={2}>
        <Box flex={1} overflow="auto">
          <List>
            {messages.map((message) => (
              <ListItem key={message}>
                <ListItemText primary={message} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <form onSubmit={handleSendMessage}>
            <Stack spacing={1}>
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
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
