import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { userActions } from "../store/user";
import websocket from "../websocket";

const UsernameModal: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    websocket.setUsername(usernameInput.trim(), (result) => {
      if (result.success && result.username) {
        dispatch(userActions.addName(result.username));
        setError(null);
        setUsernameInput("");
      } else {
        setError(result.error || "Unknown error");
      }
    });
  };

  return (
    <Dialog
      open={user.name === undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "rgba(26, 26, 46, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
            }}
          >
            👋
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to Chat App
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            Enter your username to start chatting with people around the world
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <input
              autoFocus
              required
              type="text"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: error
                  ? "2px solid #ef4444"
                  : "2px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#f8fafc",
                outline: "none",
                transition: "all 0.2s ease-in-out",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366f1";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
                e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error
                  ? "#ef4444"
                  : "rgba(255, 255, 255, 0.1)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.boxShadow = "none";
              }}
            />
            {error && (
              <Typography
                variant="caption"
                sx={{
                  color: "#ef4444",
                  mt: 1,
                  display: "block",
                  textAlign: "left",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            disabled={usernameInput.trim() === ""}
            sx={{
              width: "100%",
              py: 2,
              px: 4,
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "12px",
              background: usernameInput.trim()
                ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              textTransform: "none",
              boxShadow: usernameInput.trim()
                ? "0 4px 20px rgba(99, 102, 241, 0.3)"
                : "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: usernameInput.trim() ? "translateY(-2px)" : "none",
                boxShadow: usernameInput.trim()
                  ? "0 6px 25px rgba(99, 102, 241, 0.4)"
                  : "none",
              },
              "&:disabled": {
                background: "rgba(255, 255, 255, 0.1)",
                color: "text.secondary",
                cursor: "not-allowed",
              },
            }}
          >
            Start Chatting
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameModal;
