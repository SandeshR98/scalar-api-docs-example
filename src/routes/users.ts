import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../docs/schemas/common.schemas';
import { User } from '../docs/schemas/user.schemas';

const router = Router();

// Mock data
const users: User[] = [
  { id: 'abc123', name: 'John Doe', email: 'john@example.com', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'def456', name: 'Jane Smith', email: 'jane@example.com', createdAt: '2024-01-02T00:00:00Z' },
];

// GET /api/v1/users
router.get('/', (req: Request, res: Response) => {
  const response: SuccessResponse<User[]> = {
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  };
  res.json(response);
});

// POST /api/v1/users
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body as { name: string; email: string };
  const newUser: User = {
    id: Math.random().toString(36).slice(2, 9),
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  const response: SuccessResponse<User> = {
    success: true,
    message: 'User created successfully',
    data: newUser,
  };
  res.status(201).json(response);
});

// GET /api/v1/users/:id
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found', status: 404 });
    return;
  }
  const response: SuccessResponse<User> = {
    success: true,
    data: user,
  };
  res.json(response);
});

export default router;
