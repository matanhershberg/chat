import { io, Socket } from "socket.io-client";

// Configuration interface
interface BenchmarkConfig {
  serverUrl: string;
  userCount: number;
  messagesPerUser: number;
  messageIntervalMs: number;
  connectionDelayMs: number;
}

// Message types matching the frontend
interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

interface OutgoingMessage {
  type: "chat";
  payload: Message;
}

interface SetUsernameResponse {
  success: boolean;
  username?: string;
  error?: string;
}

interface OnlineUser {
  id: string;
  name: string;
}

// Statistics tracking
interface BenchmarkStats {
  connectionsAttempted: number;
  connectionsSuccessful: number;
  connectionsFailed: number;
  usernamesSet: number;
  messagesSent: number;
  messagesReceived: number;
  startTime: number;
  endTime?: number;
}

// User simulator class
class UserSimulator {
  private socket: Socket;
  private config: BenchmarkConfig;
  private username: string;
  private messagesSent: number = 0;
  private messagesReceived: number = 0;
  private isConnected: boolean = false;
  private isUsernameSet: boolean = false;
  private messageInterval?: NodeJS.Timeout;
  private createdAt: number;

  constructor(config: BenchmarkConfig) {
    this.config = config;
    this.username = this.generateRandomUsername();
    this.createdAt = Date.now();
    this.socket = io(config.serverUrl, {
      transports: ["websocket"],
      timeout: 10000,
    });

    this.setupEventListeners();
  }

  private generateRandomUsername(): string {
    const adjectives = [
      "Happy",
      "Swift",
      "Bright",
      "Cool",
      "Quick",
      "Smart",
      "Bold",
      "Kind",
      "Wise",
      "Brave",
      "Calm",
      "Wild",
      "Gentle",
      "Strong",
      "Quiet",
      "Loud",
    ];
    const nouns = [
      "Tiger",
      "Eagle",
      "Wolf",
      "Bear",
      "Fox",
      "Lion",
      "Hawk",
      "Owl",
      "Deer",
      "Rabbit",
      "Falcon",
      "Shark",
      "Dolphin",
      "Panda",
      "Koala",
      "Panda",
    ];
    const numbers = Math.floor(Math.random() * 1000);

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adjective}${noun}${numbers}`;
  }

  private setupEventListeners(): void {
    this.socket.on("connect", () => {
      this.isConnected = true;
      // Set username after connection
      this.setUsername();
    });

    this.socket.on("disconnect", (reason: string) => {
      this.isConnected = false;
    });

    this.socket.on("message", (data: OutgoingMessage) => {
      this.messagesReceived++;
    });

    this.socket.on("online-users", (users: OnlineUser[]) => {
      // Optional: Log when online users list is received
    });

    this.socket.on("connect_error", (error: Error) => {
      // Connection error - status will be updated by the status line
    });
  }

  private setUsername(): void {
    this.socket.emit("set-username", { username: this.username }, (response: SetUsernameResponse) => {
      if (response.success) {
        this.isUsernameSet = true;
        // Start sending messages after username is set
        this.startSendingMessages();
      } else {
        // Try with a different username
        this.username = this.generateRandomUsername();
        setTimeout(() => this.setUsername(), 1000);
      }
    });
  }

  private startSendingMessages(): void {
    if (this.messagesSent >= this.config.messagesPerUser) {
      return;
    }

    const sendNextMessage = () => {
      if (this.messagesSent >= this.config.messagesPerUser || !this.isConnected || !this.isUsernameSet) {
        return;
      }

      const randomNumber = Math.floor(Math.random() * 1000000);
      const message: OutgoingMessage = {
        type: "chat",
        payload: {
          id: `${this.username}-${Date.now()}-${Math.random()}`,
          text: `Random number: ${randomNumber}`,
          username: this.username,
          timestamp: new Date().toISOString(),
        },
      };

      this.socket.emit("message", message);
      this.messagesSent++;

      if (this.messagesSent < this.config.messagesPerUser) {
        this.messageInterval = setTimeout(sendNextMessage, this.config.messageIntervalMs);
      }
    };

    // Start sending messages with initial delay
    setTimeout(sendNextMessage, this.config.messageIntervalMs);
  }

  public disconnect(): void {
    if (this.messageInterval) {
      clearTimeout(this.messageInterval);
    }
    this.socket.disconnect();
  }

  public getStats() {
    return {
      username: this.username,
      messagesSent: this.messagesSent,
      messagesReceived: this.messagesReceived,
      isConnected: this.isConnected,
      isUsernameSet: this.isUsernameSet,
      createdAt: this.createdAt,
    };
  }
}

// Benchmark runner class
class BenchmarkRunner {
  private config: BenchmarkConfig;
  private users: UserSimulator[] = [];
  private stats: BenchmarkStats;
  private statusInterval?: NodeJS.Timeout;

  constructor(config: BenchmarkConfig) {
    this.config = config;
    this.stats = {
      connectionsAttempted: 0,
      connectionsSuccessful: 0,
      connectionsFailed: 0,
      usernamesSet: 0,
      messagesSent: 0,
      messagesReceived: 0,
      startTime: Date.now(),
    };
  }

  public async run(): Promise<void> {
    console.log("🚀 Starting benchmark...");
    console.log(`📊 Configuration:`);
    console.log(`   Server URL: ${this.config.serverUrl}`);
    console.log(`   Users: ${this.config.userCount}`);
    console.log(`   Messages per user: ${this.config.messagesPerUser}`);
    console.log(`   Message interval: ${this.config.messageIntervalMs}ms`);
    console.log(`   Connection delay: ${this.config.connectionDelayMs}ms`);
    console.log("");

    // Start status updates immediately
    this.startStatusUpdates();

    // Create users with staggered connections
    for (let i = 0; i < this.config.userCount; i++) {
      this.stats.connectionsAttempted++;

      try {
        const user = new UserSimulator(this.config);
        this.users.push(user);

        // Stagger connections to avoid overwhelming the server
        if (i < this.config.userCount - 1) {
          await this.delay(this.config.connectionDelayMs);
        }

        // Small delay to make status updates visible
        await this.delay(50);
      } catch (error) {
        this.stats.connectionsFailed++;
        console.error(`❌ Failed to create user ${i + 1}:`, error);
      }
    }

    // Don't log here - it breaks the status line

    // Wait for connections to establish first
    await this.waitForConnections();

    // Wait for all messages to be sent
    await this.waitForCompletion();

    // Show final status and stop updates
    this.updateStatus();
    this.stopStatusUpdates();
    this.calculateFinalStats();
    this.printResults();
  }

  private async waitForConnections(): Promise<void> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const maxWaitTime = 10000; // 10 seconds for connections

      const checkConnections = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        // Check if we've exceeded the maximum wait time
        if (elapsed > maxWaitTime) {
          resolve();
          return;
        }

        // Check if all users have either connected or failed to connect
        const allUsersResolved = this.users.every((user) => {
          const userStats = user.getStats();
          // User is resolved if they're connected OR if enough time has passed for them to fail
          return userStats.isConnected || elapsed > 5000; // 5 seconds should be enough for connection attempt
        });

        if (allUsersResolved) {
          resolve();
        } else {
          setTimeout(checkConnections, 100);
        }
      };

      checkConnections();
    });
  }

  private async waitForCompletion(): Promise<void> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const maxWaitTime = 60000; // 60 seconds timeout

      const checkCompletion = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        // Check if we've exceeded the maximum wait time
        if (elapsed > maxWaitTime) {
          resolve();
          return;
        }

        const allUsersComplete = this.users.every((user) => {
          const userStats = user.getStats();
          // Check if user completed their messages OR is not connected (failed connection)
          return userStats.messagesSent >= this.config.messagesPerUser || !userStats.isConnected;
        });

        if (allUsersComplete) {
          resolve();
        } else {
          setTimeout(checkCompletion, 1000);
        }
      };

      checkCompletion();
    });
  }

  private calculateFinalStats(): void {
    this.stats.endTime = Date.now();

    // Reset connection counters to recalculate based on actual connection state
    this.stats.connectionsSuccessful = 0;
    this.stats.connectionsFailed = 0;

    this.users.forEach((user) => {
      const userStats = user.getStats();
      this.stats.messagesSent += userStats.messagesSent;
      this.stats.messagesReceived += userStats.messagesReceived;

      if (userStats.isConnected) {
        this.stats.connectionsSuccessful++;
      } else {
        this.stats.connectionsFailed++;
      }

      if (userStats.isUsernameSet) {
        this.stats.usernamesSet++;
      }
    });
  }

  private printResults(): void {
    const duration = this.stats.endTime! - this.stats.startTime;
    const durationSeconds = duration / 1000;
    const messagesPerSecond = this.stats.messagesSent / durationSeconds;

    console.log("\n" + "=".repeat(50));
    console.log("📊 BENCHMARK RESULTS");
    console.log("=".repeat(50));
    console.log(`⏱️  Duration: ${durationSeconds.toFixed(2)} seconds`);
    console.log(`👥 Users: ${this.stats.connectionsSuccessful}/${this.stats.connectionsAttempted} connected`);

    if (this.stats.connectionsFailed > 0) {
      console.log(`❌ Connection failures: ${this.stats.connectionsFailed}`);
    }

    console.log(`👤 Usernames set: ${this.stats.usernamesSet}`);
    console.log(`📤 Messages sent: ${this.stats.messagesSent}`);
    console.log(`📥 Messages received: ${this.stats.messagesReceived}`);
    console.log(`⚡ Messages per second: ${messagesPerSecond.toFixed(2)}`);

    if (this.stats.connectionsSuccessful > 0) {
      console.log(
        `📊 Avg messages per user: ${(this.stats.messagesSent / this.stats.connectionsSuccessful).toFixed(2)}`,
      );
    } else {
      console.log(`📊 Avg messages per user: N/A (no successful connections)`);
    }

    console.log("=".repeat(50));

    // Disconnect all users
    this.users.forEach((user) => user.disconnect());
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private updateStatus(): void {
    const now = Date.now();
    const connectionTimeout = 3000; // 3 seconds to connect

    const connectedUsers = this.users.filter((user) => user.getStats().isConnected).length;
    const failedUsers = this.users.filter((user) => {
      const userStats = user.getStats();
      // Only count as failed if not connected AND enough time has passed
      return !userStats.isConnected && now - userStats.createdAt > connectionTimeout;
    }).length;

    const totalMessagesSent = this.users.reduce((sum, user) => sum + user.getStats().messagesSent, 0);
    const totalMessagesReceived = this.users.reduce((sum, user) => sum + user.getStats().messagesReceived, 0);
    const usernamesSet = this.users.filter((user) => user.getStats().isUsernameSet).length;

    const statusParts = [
      `${connectedUsers}/${this.config.userCount} connected`,
      failedUsers > 0 ? `${failedUsers} failed` : null,
      `${usernamesSet} usernames set`,
      `${totalMessagesSent.toLocaleString()} sent`,
      `${totalMessagesReceived.toLocaleString()} received`,
    ].filter(Boolean);

    process.stdout.write(`\r📊 Status: ${statusParts.join(" | ")}                    `);
  }

  private startStatusUpdates(): void {
    this.statusInterval = setInterval(() => {
      this.updateStatus();
    }, 100); // Update every 100ms for very responsive updates
  }

  private stopStatusUpdates(): void {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
      this.statusInterval = undefined;
    }
    // Clear the status line and add a newline
    process.stdout.write("\r" + " ".repeat(100) + "\r\n");
  }
}

// CLI argument parsing and main execution
function parseArgs(): BenchmarkConfig {
  const args = process.argv.slice(2);

  // Default configuration
  let config: BenchmarkConfig = {
    serverUrl: "http://localhost:3000",
    userCount: 10,
    messagesPerUser: 5,
    messageIntervalMs: 1000,
    connectionDelayMs: 100,
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--url":
      case "-u":
        config.serverUrl = args[++i] || config.serverUrl;
        break;
      case "--users":
      case "-n":
        config.userCount = parseInt(args[++i]) || config.userCount;
        break;
      case "--messages":
      case "-m":
        config.messagesPerUser = parseInt(args[++i]) || config.messagesPerUser;
        break;
      case "--interval":
      case "-i":
        config.messageIntervalMs = parseInt(args[++i]) || config.messageIntervalMs;
        break;
      case "--delay":
      case "-d":
        config.connectionDelayMs = parseInt(args[++i]) || config.connectionDelayMs;
        break;
      case "--help":
      case "-h":
        console.log(`
Benchmark Tool for WebSocket Chat Server

Usage: npm run start [options]

Options:
  -u, --url <url>          Server URL (default: http://localhost:3000)
  -n, --users <count>      Number of users to simulate (default: 10)
  -m, --messages <count>   Messages per user (default: 5)
  -i, --interval <ms>      Message interval in milliseconds (default: 1000)
  -d, --delay <ms>         Connection delay between users (default: 100)
  -h, --help               Show this help message

Examples:
  npm run start -- --users 50 --messages 10
  npm run start -- --url http://localhost:3001 --users 20 --messages 5
        `);
        process.exit(0);
        break;
    }
  }

  return config;
}

// Main execution
async function main() {
  try {
    const config = parseArgs();
    const benchmark = new BenchmarkRunner(config);
    await benchmark.run();
  } catch (error) {
    console.error("❌ Benchmark failed:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Benchmark interrupted by user");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Benchmark terminated");
  process.exit(0);
});

// Run the benchmark
main();
