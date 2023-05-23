import 'dotenv/config';

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import fastify from 'fastify';
import { resolve } from 'node:path';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';
import { uploadRoutes } from './routes/upload';

const port = Number(process.env.PORT) || 3333;
const app = fastify();

app.register(multipart);
app.register(require('@fastify/static'), {
	root: resolve(__dirname, '../uploads'),
	prefix: '/uploads'
});
app.register(cors, { origin: true });
app.register(jwt, { secret: 'spacetime' });
app.register(authRoutes);
app.register(memoriesRoutes);
app.register(uploadRoutes);

app.listen({ port, host: '0.0.0.0' })
	.then(() => console.log(`🚀 Server is running on http://localhost:${port}`));