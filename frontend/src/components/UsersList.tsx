import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

const UsersList = () => {
  const onlineUsers = useSelector(
    (state: RootState) => state.users.onlineUsers,
  );

  const getRandomColor = (username: string) => {
    const colors = [
      "#6366f1",
      "#ec4899",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#a855f7",
    ];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 280,
        height: "fit-content",
        background: "transparent", // Make background transparent to match parent
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1.1rem",
            }}
          >
            Online Users
          </Typography>
        </Box>
        <Chip
          label={`${onlineUsers.length} active`}
          size="small"
          sx={{
            background: "rgba(16, 185, 129, 0.2)",
            color: "#10b981",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <CardContent sx={{ p: 0 }}>
        {onlineUsers.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              No users online
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {onlineUsers.map((user, index) => (
              <ListItem
                key={user.id}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderBottom:
                    index < onlineUsers.length - 1
                      ? "1px solid rgba(255, 255, 255, 0.05)"
                      : "none",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.03)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: getRandomColor(user.name),
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                        fontSize: "0.875rem",
                      }}
                    >
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        opacity: 0.7,
                      }}
                    >
                      Online now
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersList;
