import type { Message } from "../../models/messages";

// Helper function to get hour:minute from timestamp
export const getTimeKey = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

// Group consecutive messages from the same user with the same hour:minute
export const groupMessages = (messages: Message[]): Message[][] => {
  const groupedMessages: Message[][] = [];

  for (let i = 0; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousMessage = i > 0 ? messages[i - 1] : null;

    // Start a new group if:
    // 1. First message
    // 2. Different user
    // 3. Different hour:minute
    if (
      !previousMessage ||
      previousMessage.username !== currentMessage.username ||
      getTimeKey(previousMessage.timestamp) !==
        getTimeKey(currentMessage.timestamp)
    ) {
      groupedMessages.push([currentMessage]);
    } else {
      // Add to the last group
      groupedMessages[groupedMessages.length - 1].push(currentMessage);
    }
  }

  return groupedMessages;
};
