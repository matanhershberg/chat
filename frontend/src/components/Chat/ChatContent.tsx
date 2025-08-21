import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type Message } from "../../models/messages";
import ChatFeed from "../ChatFeed";
import MessageInput from "../MessageInput";

const ContentContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const MessageInputContainer = styled(Box)({
  padding: 24,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
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
