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

  constructor(config: BenchmarkConfig) {
    this.config = config;
    this.username = this.generateRandomUsername();
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
      console.log(`✅ ${this.username} connected`);

      // Set username after connection
      this.setUsername();
    });

    this.socket.on("disconnect", (reason: string) => {
      this.isConnected = false;
      console.log(`❌ ${this.username} disconnected: ${reason}`);
    });

    this.socket.on("message", (data: OutgoingMessage) => {
      this.messagesReceived++;
    });

    this.socket.on("online-users", (users: OnlineUser[]) => {
      // Optional: Log when online users list is received
    });

    this.socket.on("connect_error", (error: Error) => {
      console.error(`❌ ${this.username} connection error:`, error.message);
    });
  }

  private setUsername(): void {
    this.socket.emit("set-username", { username: this.username }, (response: SetUsernameResponse) => {
      if (response.success) {
        this.isUsernameSet = true;
        console.log(`👤 ${this.username} username set successfully`);

        // Start sending messages after username is set
        this.startSendingMessages();
      } else {
        console.error(`❌ ${this.username} failed to set username:`, response.error);
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

      console.log(`📤 ${this.username} sent message ${this.messagesSent}/${this.config.messagesPerUser}`);

      if (this.messagesSent < this.config.messagesPerUser) {
        this.messageInterval = setTimeout(sendNextMessage, this.config.messageIntervalMs);
      } else {
        console.log(`✅ ${this.username} finished sending all messages`);
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
    };
  }
}

// Benchmark runner class
class BenchmarkRunner {
  private config: BenchmarkConfig;
  private users: UserSimulator[] = [];
  private stats: BenchmarkStats;

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
      } catch (error) {
        this.stats.connectionsFailed++;
        console.error(`❌ Failed to create user ${i + 1}:`, error);
      }
    }

    console.log(`\n📈 All ${this.config.userCount} users created. Waiting for connections to establish...`);

    // Wait for connections to establish first
    await this.waitForConnections();

    console.log(`\n📈 Connections established. Waiting for benchmark to complete...`);

    // Wait for all messages to be sent
    await this.waitForCompletion();

    // Calculate final stats
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
          console.log(`⏰ Connection timeout after ${elapsed / 1000}s. Proceeding with current connections...`);
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
          console.log(`⏰ Benchmark timeout after ${elapsed / 1000}s. Stopping...`);
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
