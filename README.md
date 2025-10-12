# Chat Demo

An IRC-like web app, with one main room where people can join and chat freely.

[Live Demo](https://chat.matan.app)

## Getting Started

To get started in dev mode, run `docker compose up`.

Then open http://localhost

## Scaling

The backend supports horizontal scaling with load balancing. To run with multiple backend instances:

```bash
docker compose up --scale backend=3
```

See [SCALING.md](./SCALING.md) for detailed information about the scaling architecture and usage.
