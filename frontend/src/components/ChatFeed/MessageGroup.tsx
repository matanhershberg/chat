import type { Message } from "../../models/messages";
import ChatBubble from "../ChatBubble";

interface MessageGroupProps {
  messageGroup: Message[];
  currentUser: string;
}

const MessageGroup: React.FC<MessageGroupProps> = ({
  messageGroup,
  currentUser,
}) => {
  const firstMessage = messageGroup[0];
  const isOwnMessage = firstMessage.username === currentUser;

  // Show username for every bubble from other users
  const showUsername = !isOwnMessage;

  return (
    <ChatBubble
      key={firstMessage.id}
      messages={messageGroup}
      isOwnMessage={isOwnMessage}
      showUsername={showUsername}
    />
  );
};

export default MessageGroup;
