import path from 'path';
import fs from 'fs';
import { schemas } from './schemas';

interface OpenAPISpec {
  openapi: string;
  info: { title: string; version: string; description?: string };
  servers?: Array<{ url: string; description: string }>;
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
  };
}

// Cache the spec in memory — built once, served in ~5ms every time after
let cachedSpec: OpenAPISpec | null = null;

export function getOpenAPISpec(): OpenAPISpec {
  if (!cachedSpec) {
    const specPath = path.join(__dirname, 'openapi-spec.json');
    const baseSpec = JSON.parse(fs.readFileSync(specPath, 'utf8')) as OpenAPISpec;

    // Merge TypeScript schemas into the empty schemas section
    if (baseSpec.components) {
      baseSpec.components.schemas = {
        ...schemas,
        ...baseSpec.components.schemas,
      };
    }

    // Set server URL dynamically from environment variables
    const apiUrl = process.env.API_URL ?? 'http://localhost:3000';
    const apiVersion = process.env.API_VERSION ?? 'v1';
    const nodeEnv = process.env.NODE_ENV ?? 'development';

    baseSpec.servers = [
      {
        url: `${apiUrl}/api/${apiVersion}`,
        description: `${nodeEnv.charAt(0).toUpperCase() + nodeEnv.slice(1)} Server`,
      },
    ];

    cachedSpec = baseSpec;
  }

  return cachedSpec;
}
