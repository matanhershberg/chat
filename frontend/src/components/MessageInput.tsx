import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            placeholder="Message"
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
            <SendIcon />
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MessageInput;
