import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface ChatFeedProps {
  messages: string[];
}

const ChatFeed = ({ messages }: ChatFeedProps) => {
  return (
    <Box flex={1} overflow="auto">
      <List>
        {messages.map((message) => (
          <ListItem key={message}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatFeed;
