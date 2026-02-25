// TypeScript interfaces — used in your controllers and services
export interface SuccessResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ValidationError {
  message: string;
  errors: Array<{ field: string; message: string }>;
  status: number;
}

// OpenAPI schema objects — used for documentation
export const commonSchemas = {
  SuccessResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Operation completed successfully' },
      data: { type: 'object', description: 'Response payload (varies by endpoint)' },
    },
  },
  ValidationError: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Validation failed' },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string', example: 'email' },
            message: { type: 'string', example: 'Email is required' },
          },
        },
      },
      status: { type: 'number', example: 400 },
    },
  },
  UnauthorizedError: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Unauthorized - Please login' },
      status: { type: 'number', example: 401 },
    },
  },
  NotFoundError: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Resource not found' },
      status: { type: 'number', example: 404 },
    },
  },
};
