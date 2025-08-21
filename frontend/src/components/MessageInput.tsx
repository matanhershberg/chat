import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
        <Stack spacing={2}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Type your message
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="What's on your mind?"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              multiline
              maxRows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 3,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "primary.main",
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                  "&.Mui-focused": {
                    borderColor: "primary.main",
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "text.primary",
                    "&::placeholder": {
                      color: "text.secondary",
                      opacity: 0.7,
                    },
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!input.trim()}
              sx={{
                minWidth: "56px",
                height: "56px",
                borderRadius: "50%",
                background: input.trim()
                  ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                  : "rgba(255, 255, 255, 0.1)",
                boxShadow: input.trim()
                  ? "0 4px 20px rgba(99, 102, 241, 0.3)"
                  : "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: input.trim() ? "translateY(-2px)" : "none",
                  boxShadow: input.trim()
                    ? "0 6px 25px rgba(99, 102, 241, 0.4)"
                    : "none",
                },
                "&:disabled": {
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "text.secondary",
                },
              }}
            >
              <SendIcon />
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default MessageInput;
