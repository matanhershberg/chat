import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

const UsersList = () => {
  const onlineUsers = useSelector(
    (state: RootState) => state.users.onlineUsers,
  );

  return (
    <Card sx={{ minWidth: 250, height: "fit-content" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Online Users ({onlineUsers.length})
        </Typography>
        <List dense>
          {onlineUsers.map((user) => (
            <ListItem key={user.id} sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary">
                    {user.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UsersList;
