import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type Message } from "../../models/messages";
import ChatFeed from "../ChatFeed/ChatFeed";
import MessageInput from "../MessageInput/MessageInput";

const ContentContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0, // This is crucial for flexbox scrolling
});

const MessageInputContainer = styled(Box)({
  padding: 24,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  flexShrink: 0, // Prevent the input from shrinking
  background: "transparent", // Make background transparent to match parent
});

interface ChatContentProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  onSendMessage,
}) => {
  return (
    <ContentContainer>
      <ChatFeed messages={messages} />
      <MessageInputContainer>
        <MessageInput onSendMessage={onSendMessage} />
      </MessageInputContainer>
    </ContentContainer>
  );
};

export default ChatContent;
