# WebSocket Chat Server Benchmark

This benchmark tool simulates multiple frontend users connecting to your chat server via WebSocket, sending messages
with random numbers.

## Features

- **Configurable user count**: Simulate any number of concurrent users
- **Configurable message count**: Control how many messages each user sends
- **Random usernames**: Generates unique usernames to avoid conflicts
- **Random message content**: Sends random numbers as message content
- **Connection staggering**: Spreads out connections to avoid overwhelming the server
- **Comprehensive statistics**: Tracks connection success, message rates, and performance metrics
- **Real-time logging**: Shows connection status and message sending progress

## Usage

### Basic Usage

```bash
# Install dependencies
npm install

# Build the benchmark
npm run build

# Run with default settings (10 users, 5 messages each)
npm start
```

### Advanced Usage

```bash
# Run with custom parameters
npm start -- --users 50 --messages 10 --url http://localhost:3001

# Show all available options
npm start -- --help
```

### Configuration Options

| Option       | Short | Description                      | Default                 |
| ------------ | ----- | -------------------------------- | ----------------------- |
| `--url`      | `-u`  | Server URL                       | `http://localhost:3000` |
| `--users`    | `-n`  | Number of users to simulate      | `10`                    |
| `--messages` | `-m`  | Messages per user                | `5`                     |
| `--interval` | `-i`  | Message interval in milliseconds | `1000`                  |
| `--delay`    | `-d`  | Connection delay between users   | `100`                   |
| `--help`     | `-h`  | Show help message                | -                       |

### Example Commands

```bash
# Light load test: 20 users, 3 messages each
npm start -- --users 20 --messages 3

# Heavy load test: 100 users, 20 messages each, faster sending
npm start -- --users 100 --messages 20 --interval 500

# Test against different server
npm start -- --url http://localhost:3001 --users 30 --messages 8

# Quick test: 5 users, 2 messages each, very fast
npm start -- --users 5 --messages 2 --interval 200 --delay 50
```

## Output

The benchmark provides real-time feedback and comprehensive results:

```
🚀 Starting benchmark...
📊 Configuration:
   Server URL: http://localhost:3000
   Users: 10
   Messages per user: 5
   Message interval: 1000ms
   Connection delay: 100ms

✅ HappyTiger123 connected
👤 HappyTiger123 username set successfully
📤 HappyTiger123 sent message 1/5
...

==================================================
📊 BENCHMARK RESULTS
==================================================
⏱️  Duration: 15.23 seconds
👥 Users: 10/10 connected
👤 Usernames set: 10
📤 Messages sent: 50
📥 Messages received: 50
⚡ Messages per second: 3.28
📊 Avg messages per user: 5.00
==================================================
```

## Development

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled benchmark

### Architecture

The benchmark consists of:

1. **UserSimulator**: Mimics a frontend user's WebSocket behavior
2. **BenchmarkRunner**: Manages multiple users and collects statistics
3. **CLI Parser**: Handles command-line arguments
4. **Statistics Tracker**: Monitors performance metrics

Each simulated user:

- Connects to the WebSocket server
- Sets a random username
- Sends the specified number of messages with random numbers
- Tracks sent/received message counts
- Handles connection errors gracefully
