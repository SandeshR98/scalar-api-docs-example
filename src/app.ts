import 'dotenv/config';
import express from 'express';
import { getOpenAPISpec } from './docs/openapi.config';
import { createScalarMiddleware } from './docs/scalar.config';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// API routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

// API Documentation — toggle with ENABLE_API_DOCS=true in .env
if (process.env.ENABLE_API_DOCS === 'true') {

  // Raw OpenAPI JSON with HTTP caching
  app.get('/api/docs/openapi.json', (req, res): void => {
    const isProd = process.env.NODE_ENV === 'production';
    const spec = getOpenAPISpec();
    const etag = `"${Buffer.from(JSON.stringify(spec)).length}"`;

    res.setHeader('Cache-Control', `public, max-age=${isProd ? 3600 : 0}`);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('ETag', etag);

    if (req.headers['if-none-match'] === etag) {
      res.status(304).end();
      return;
    }

    res.json(spec);
  });

  // Scalar UI
  app.use('/api/docs', createScalarMiddleware());

  console.log(`API Docs → http://localhost:${PORT}/api/docs`);
}

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
