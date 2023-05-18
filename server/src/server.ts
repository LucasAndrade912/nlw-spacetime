import 'dotenv/config';

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastify from 'fastify';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';

const port = Number(process.env.PORT) || 3333;
const app = fastify();

app.register(cors, { origin: true });
app.register(jwt, { secret: 'spacetime' });
app.register(authRoutes);
app.register(memoriesRoutes);

app.listen({ port, host: '0.0.0.0' })
	.then(() => console.log(`🚀 Server is running on http://localhost:${port}`));