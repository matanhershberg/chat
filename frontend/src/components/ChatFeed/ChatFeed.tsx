import { useSelector } from "react-redux";
import type { Message } from "../../models/messages";
import type { RootState } from "../../store/store";
import ChatFeedContainer from "./ChatFeedContainer";
import EmptyState from "./EmptyState";
import MessageGroup from "./MessageGroup";
import { groupMessages } from "./messageGrouping";

interface ChatFeedProps {
  messages: Message[];
}

const ChatFeed: React.FC<ChatFeedProps> = ({ messages }) => {
  const currentUser = useSelector((state: RootState) => state.user.name);
  const groupedMessages = groupMessages(messages);

  // Don't render if currentUser is not set
  if (!currentUser) {
    return (
      <ChatFeedContainer>
        <EmptyState />
      </ChatFeedContainer>
    );
  }

  return (
    <ChatFeedContainer>
      {groupedMessages.length === 0 ? (
        <EmptyState />
      ) : (
        groupedMessages.map((messageGroup) => (
          <MessageGroup
            key={messageGroup[0].id}
            messageGroup={messageGroup}
            currentUser={currentUser}
          />
        ))
      )}
    </ChatFeedContainer>
  );
};

export default ChatFeed;
