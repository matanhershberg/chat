# Scaling the Backend with Load Balancing

This application now supports horizontal scaling of the backend service using Redis and nginx.

## Architecture

- **nginx**: Load balancer with hash-based routing on Socket.IO session IDs (sid)
- **Redis**: Message broker that synchronizes Socket.IO events across backend replicas
- **Backend replicas**: Multiple instances of the backend service that share state via Redis

### Load Balancing Strategy

The nginx configuration uses **hash-based routing with Socket.IO's session ID (sid)**:

- Socket.IO automatically generates a unique session ID (`sid`) for each connection
- nginx hashes the `sid` to route all requests from the same session to the same backend
- Initial handshake (before `sid` exists) uses IP-based routing
- Once `sid` is assigned, all subsequent requests maintain sticky sessions
- Different Socket.IO sessions (even from same IP) can distribute across backends
- Redis ensures messages are synchronized across all backend instances

### Testing Load Distribution from Localhost

The load balancing strategy uses Socket.IO's built-in session IDs, which provides sticky sessions while allowing
distribution across backends when connections come from different IPs.

#### Limitation for Localhost Testing

**Important**: When testing from localhost, the initial handshake for all connections comes from the same IP
(`127.0.0.1`), so they will all route to the same backend initially. Once each connection gets its unique `sid`, that
session will stick to whichever backend it was initially routed to.

This means **localhost testing won't show load distribution** - but this is the correct behavior for production where
users come from different IPs!

#### Using the Included Benchmark Tool

You can run the benchmark tool to test the system:

```bash
# Start your backends with scaling
docker compose up --scale backend=3 -d

# Run the benchmark from localhost
cd benchmark
npm install
npm run build
npm start -- --users 100 --messages 5
```

**Note**: When running from localhost, all connections will route to the same backend due to the same source IP. This is
expected behavior. To see true load distribution, users would need to connect from different IP addresses (like in
production).

**Verify the system is working** while benchmark is running:

```bash
# Watch the backend logs in another terminal
docker compose logs -f backend

# You should see all messages being synchronized across all backends via Redis
```

**Customize benchmark parameters**:

```bash
npm start -- --users 500 --messages 10 --interval 1000
```

## How to Scale

### Start with Multiple Replicas

To start the application with multiple backend instances:

```bash
docker-compose up --scale backend=3
```

This will start:

- 3 backend instances
- 1 nginx load balancer (port 3000)
- 1 Redis instance (port 6379)
- 1 frontend instance (port 80)

### Scale Up While Running

To add more backend instances while the application is running:

```bash
docker-compose up --scale backend=5 -d
```

### Scale Down

To reduce the number of backend instances:

```bash
docker-compose up --scale backend=2 -d
```

## How It Works

1. **Client Connection**: Clients connect to nginx on port 3000
2. **Initial Routing**: First request (handshake) routes based on client's IP address
3. **Session Creation**: Socket.IO assigns a unique session ID (`sid`) to the connection
4. **Sticky Routing**: All subsequent requests hash on `sid` to maintain sticky sessions
5. **Message Broadcasting**: When a backend instance broadcasts a message, it publishes to Redis
6. **Cross-Replica Sync**: All backend replicas receive the message from Redis and emit it to their connected clients
7. **Consistent State**: All clients receive all messages regardless of which backend they're connected to

### Why This Approach?

Socket.IO requires sticky sessions because:

- The initial handshake creates session state on a specific backend
- Subsequent polling/WebSocket upgrade requests must reach the same backend
- Session data is stored in memory on each backend instance
- Redis handles **message synchronization**, not session state

By hashing on Socket.IO's built-in `sid`:

- No custom code needed - uses Socket.IO's existing session management
- Guaranteed sticky sessions for each Socket.IO connection
- Simple and reliable architecture
- In production, users from different IPs naturally distribute across backends

## Development

For development with hot reload:

```bash
docker-compose watch --scale backend=2
```

This enables file watching while running multiple backend instances.

## Monitoring

### Check Backend Instances

```bash
docker-compose ps backend
```

### View Logs from All Backends

```bash
docker-compose logs -f backend
```

### View Logs from Specific Backend Instance

```bash
docker-compose logs -f backend-1
docker-compose logs -f backend-2
```

### Check Redis Connection

```bash
docker-compose exec redis redis-cli ping
```

## Environment Variables

- `REDIS_URL`: Redis connection URL (default: `redis://redis:6379`)
- `PORT`: Backend server port (default: `3000`)
- `NODE_ENV`: Environment mode (`development` or `production`)

## Troubleshooting

### Clients Can't Connect

- Verify nginx is running: `docker-compose ps nginx`
- Check nginx logs: `docker-compose logs nginx`
- Ensure port 3000 is not in use by another application

### Messages Not Syncing Between Replicas

- Check Redis is healthy: `docker-compose ps redis`
- Verify backend can connect to Redis: `docker-compose logs backend | grep "Redis"`
- Check Redis adapter logs in backend instances

### WebSocket Connection Issues

- nginx uses Socket.IO's `sid` parameter for sticky sessions
- Ensure WebSocket upgrade headers are properly configured in nginx.conf
- Check for CORS issues in backend logs
- Verify clients can establish Socket.IO connections
- Check that Redis is healthy and all backends are connected

### Testing Load Distribution

To verify the system is working correctly:

```bash
# Watch logs from all backends in real-time
docker compose logs -f backend

# Run the benchmark tool from localhost
cd benchmark
npm start -- --users 100 --messages 5

# You should see all messages being synchronized across all backends via Redis
```

**Note**: Since connections from localhost all come from the same IP, they will route to the same backend. This is
expected behavior for sticky sessions. In production, different users with different IPs will naturally distribute
across backends.

## Production Considerations

For production deployments:

1. **Redis Persistence**: Configure Redis with AOF or RDB persistence
2. **Redis Clustering**: Use Redis Cluster for high availability
3. **Health Checks**: Add health check endpoints to backends
4. **Monitoring**: Implement metrics collection (Prometheus, Grafana)
5. **Resource Limits**: Set CPU and memory limits in docker-compose
6. **Security**: Use Redis authentication and TLS for connections
