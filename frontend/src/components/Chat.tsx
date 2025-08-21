import { Box, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import websocket from "../websocket";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";
import UsersList from "./UsersList";

const Chat = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const user = useSelector((state: RootState) => state.user);

  const handleSendMessage = (message: string) => {
    if (user.name === undefined) {
      throw new Error("User name is not set");
    }

    websocket.emit({
      type: "chat",
      payload: {
        id: crypto.randomUUID(),
        text: message,
        username: user.name,
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={3}
      sx={{
        height: "calc(100vh - 200px)",
        minHeight: "600px",
      }}
    >
      {/* Main Chat Area */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              }}
            />
            <Box sx={{ fontWeight: 600, color: "text.primary" }}>Live Chat</Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ChatFeed messages={messages} />
          <Box sx={{ p: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <MessageInput onSendMessage={handleSendMessage} />
          </Box>
        </Box>
      </Paper>

      {/* Users Sidebar */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <UsersList />
      </Box>
    </Stack>
  );
};

export default Chat;
