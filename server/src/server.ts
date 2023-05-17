import cors from '@fastify/cors';
import fastify from 'fastify';

import { memoriesRoutes } from './routes/memories';

const port = Number(process.env.PORT) || 3000;
const app = fastify();

app.register(cors, { origin: true });
app.register(memoriesRoutes);

app.listen({ port })
	.then(() => console.log(`🚀 Server is running on http://localhost:${port}`));