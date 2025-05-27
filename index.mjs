// proxy-server.mjs
import Fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';

const app = Fastify({ logger: true });

// Proxy configuration: forward all requests to the upstream server
await app.register(fastifyHttpProxy, {
  upstream: 'http://localhost:4000', // Change this to your upstream target
  prefix: '/api',                   // Only proxy requests that start with /api
  rewritePrefix: '',                // Remove the /api prefix before forwarding
  http2: false
});

app.get('/hello', async () => {
  return { msg: 'Hello from upstream!' };
});

// Start server
const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Proxy server running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
