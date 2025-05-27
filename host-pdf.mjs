// pdf-proxy-server.mjs
import Fastify from 'fastify';
import fetch from 'node-fetch'; // Use global fetch if Node 18+
import fastifyCors from '@fastify/cors';

const app = Fastify({ logger: true });

// Register CORS to allow all origins
await app.register(fastifyCors, {
  origin: true, // Allow all origins
  methods: ['GET'], // Limit to GET requests
});

// Remote PDF URL
const remotePDFUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

app.get('/download-pdf', async (req, reply) => {
  try {
    const response = await fetch(remotePDFUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    reply
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'inline; filename="remote.pdf"');

    return reply.send(response.body);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: 'Failed to retrieve PDF' });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('PDF proxy server running at http://localhost:3000/download-pdf');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
