import { RequestHandler } from 'express';
import { apiReference } from '@scalar/express-api-reference';

export function createScalarMiddleware(): RequestHandler {
  return apiReference({
    url: '/api/docs/openapi.json',
    layout: 'modern',
    darkMode: true,
    persistAuth: true,
    searchHotKey: 'k',
    defaultHttpClient: {
      targetKey: 'node',
      clientKey: 'fetch',
    },
    metaData: {
      title: 'Scalar API Docs Example',
      description: 'Companion project for the Medium article on Scalar API documentation.',
    },
  } as never) as RequestHandler;
}
