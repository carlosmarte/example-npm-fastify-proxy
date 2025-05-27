# FastiProxy

**FastiProxy** is a lightweight reverse proxy server built with [Fastify](https://www.fastify.io/) and powered by [`@fastify/http-proxy`](https://github.com/fastify/fastify-http-proxy). Designed with simplicity in mind, this proxy forwards incoming requests to an upstream server, making it perfect for:

- API gateway prototyping
- Local development proxying
- Microservices routing
- Quick request redirection

## 🚀 Features

- ⚡ Fast and minimal Fastify server
- 🔁 Proxy HTTP requests to a configurable upstream
- 🔧 Prefix-based proxy routing (`/api → upstream`)
- 📦 Modern ES Modules (.mjs)

## 📁 Project Structure

.
├── proxy-server.mjs         # Main Fastify proxy application
├── upstream-server.mjs      # Optional: Local mock upstream server
└── package.json             # Project metadata and dependencies

## 📦 Installation

```bash
npm install
```

# Testing
curl http://localhost:3000/api/hello
# -> { "msg": "Hello from upstream!" }
