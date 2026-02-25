import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../docs/schemas/common.schemas';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', (req: Request, res: Response) => {
  const { name, email } = req.body as { name: string; email: string };

  if (!name || !email) {
    res.status(400).json({
      message: 'Validation failed',
      errors: [
        ...(!name ? [{ field: 'name', message: 'Name is required' }] : []),
        ...(!email ? [{ field: 'email', message: 'Email is required' }] : []),
      ],
      status: 400,
    });
    return;
  }

  const response: SuccessResponse = {
    success: true,
    message: 'User registered successfully',
    data: { id: Math.random().toString(36).slice(2, 9), name, email },
  };
  res.status(201).json(response);
});

// POST /api/v1/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  // Mock auth — always succeeds with the right fields present
  if (!email || !password) {
    res.status(401).json({ message: 'Unauthorized - Please login', status: 401 });
    return;
  }

  const response: SuccessResponse = {
    success: true,
    message: 'Login successful',
    data: { token: 'mock-jwt-token-' + Math.random().toString(36).slice(2, 9) },
  };
  res.json(response);
});

export default router;
