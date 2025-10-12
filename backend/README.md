# Chat Backend

WebSocket server for the chat application using Socket.io and Express.

## Environment Variables

### `NODE_ENV`

- **Default**: Not set
- **Values**: `development` | `production`
- **Description**: Sets the application environment. Affects logging format and default log level.

### `LOG_LEVEL`

- **Default**:
  - `debug` in development mode
  - `info` in production mode
- **Values**: `trace` | `debug` | `info` | `warn` | `error` | `fatal`
- **Description**: Controls the minimum logging level. Messages below this level will not be output.

#### Log Levels (from most verbose to least):

- `trace`: Very detailed diagnostic information
- `debug`: Debug information useful during development
- `info`: General informational messages (default in production)
- `warn`: Warning messages for potentially harmful situations
- `error`: Error messages for failure events
- `fatal`: Critical errors that cause application termination

#### Examples:

```bash
# Run with debug logging
LOG_LEVEL=debug npm start

# Run with only warnings and errors
LOG_LEVEL=warn npm start

# Production mode with info logging (default)
NODE_ENV=production npm start
```

### `PORT`

- **Default**: `3000`
- **Description**: Port number the server will listen on.

### `REDIS_URL`

- **Default**: `redis://localhost:6379`
- **Description**: Redis connection URL for the Socket.IO adapter. Required for horizontal scaling with multiple backend instances.

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Build TypeScript
npm run build

# Run in production mode
npm start
```

## Logging

The backend uses [Pino](https://getpino.io/) for structured logging:

- **Development**: Pretty-printed, colorized output for easy reading
- **Production**: JSON-formatted logs for log aggregation systems

All log entries include structured data for better filtering and searching.

## Horizontal Scaling

The backend supports horizontal scaling using Redis as a message broker. Multiple backend instances can run simultaneously, with Socket.IO events synchronized across all instances via the Redis adapter.

### Dependencies

- `@socket.io/redis-adapter`: Enables Socket.IO to work across multiple server instances
- `redis`: Redis client for Node.js

### Architecture

When multiple backend instances run:

1. Each instance connects to the same Redis server as pub/sub client
2. Socket.IO broadcasts are published to Redis
3. All instances receive and emit events to their connected clients
4. Clients maintain consistent state regardless of which instance they're connected to

See the main [SCALING.md](../SCALING.md) for usage instructions.
