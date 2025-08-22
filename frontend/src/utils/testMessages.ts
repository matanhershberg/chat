import type { Message } from "../models/messages";

// Random names for fake users
const fakeNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Iris",
  "Jack",
  "Kate",
  "Liam",
  "Maya",
  "Noah",
  "Olivia",
  "Paul",
  "Quinn",
  "Ruby",
  "Sam",
  "Tina",
  "Uma",
  "Victor",
  "Wendy",
  "Xander",
];

// Random message templates
const messageTemplates = [
  "Hey everyone! 👋",
  "How's it going?",
  "That's interesting!",
  "I agree with you on that",
  "What do you think about this?",
  "Great point!",
  "Thanks for sharing",
  "I'm not sure I follow...",
  "This is awesome!",
  "Can someone explain this to me?",
  "I love this idea!",
  "What time is the meeting?",
  "Has anyone tried this before?",
  "That makes perfect sense",
  "I'm confused about this part",
  "This is exactly what I needed",
  "Can we discuss this later?",
  "I'm excited about this project",
  "What's the next step?",
  "This is really helpful",
];

// Random emojis to add variety
const emojis = [
  "😊",
  "👍",
  "🎉",
  "🔥",
  "💡",
  "🚀",
  "✨",
  "💯",
  "👏",
  "🤔",
  "😅",
  "🙌",
];

/**
 * Generates a random fake message
 */
function generateFakeMessage(
  isCurrentUser: boolean,
  currentUsername: string,
): Message {
  const randomName = isCurrentUser
    ? currentUsername
    : fakeNames[Math.floor(Math.random() * fakeNames.length)];
  const randomTemplate =
    messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
  const randomEmoji =
    Math.random() > 0.7
      ? ` ${emojis[Math.floor(Math.random() * emojis.length)]}`
      : "";

  // Add some random variations to make messages more realistic
  let messageText = randomTemplate;
  if (Math.random() > 0.8) {
    messageText += randomEmoji;
  }
  if (Math.random() > 0.9) {
    messageText += "!";
  }

  return {
    id: crypto.randomUUID(),
    text: messageText,
    username: randomName,
    timestamp: new Date(Date.now() - Math.random() * 60000).toISOString(), // Random time within last minute
  };
}

/**
 * Generates a set of fake test messages
 * @param currentUsername - The current user's username
 * @param count - Number of messages to generate (default: 20)
 * @returns Array of fake messages
 */
export function generateTestMessages(
  currentUsername: string,
  count: number = 20,
): Message[] {
  const messages: Message[] = [];

  for (let i = 0; i < count; i++) {
    // 70% chance of message from other users, 30% from current user
    const isCurrentUser = Math.random() < 0.3;
    const message = generateFakeMessage(isCurrentUser, currentUsername);
    messages.push(message);
  }

  // Sort messages by timestamp to ensure chronological order
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

/**
 * Generates test messages and displays them with a delay between each message
 * @param currentUsername - The current user's username
 * @param count - Number of messages to generate (default: 20)
 * @param delayMs - Delay between messages in milliseconds (default: 0)
 * @param onMessage - Callback function called for each message
 *
 * @example
 * // Generate 15 messages with 100ms delay between each
 * generateTestMessagesWithDelay("John", 15, 100, (message) => {
 *   dispatch(addMessage(message));
 * });
 *
 * @example
 * // Generate 20 messages with no delay (instant)
 * generateTestMessagesWithDelay("John", 20, 0, (message) => {
 *   dispatch(addMessage(message));
 * });
 */
export async function generateTestMessagesWithDelay(
  currentUsername: string,
  count: number = 20,
  delayMs: number = 0,
  onMessage: (message: Message) => void,
): Promise<void> {
  const messages = generateTestMessages(currentUsername, count);

  for (let i = 0; i < messages.length; i++) {
    onMessage(messages[i]);

    // Add delay between messages (except for the last one)
    if (i < messages.length - 1 && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
