// pdf-proxy-server.mjs
import Fastify from 'fastify';
import fetch from 'node-fetch'; // For Node < 18
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);
const app = Fastify({ logger: true });

// Replace this with any public PDF URL
const remotePDFUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

app.get('/download-pdf', async (req, reply) => {
  try {
    const response = await fetch(remotePDFUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    // Set response headers for browser download
    reply.header('Content-Type', 'application/pdf');
    reply.header('Content-Disposition', 'inline; filename="remote.pdf"');

    // Stream the PDF content to the client
    return reply.send(response.body);
  } catch (err) {
    req.log.error(err);
    reply.status(500).send({ error: 'Failed to retrieve PDF' });
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
