export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'abc123' },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', format: 'email', example: 'john@example.com' },
      createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' },
    },
  },
  CreateUserRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', format: 'email', example: 'john@example.com' },
      password: { type: 'string', format: 'password', example: 'SecurePass123!' },
    },
  },
};
