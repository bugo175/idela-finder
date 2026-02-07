import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../../middleware/auth';
import { sendSuccess, sendError } from '../../utils/apiResponse';
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } from './user.validation';
import * as userService from './user.service';

const router = Router();

// POST /api/v1/users/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.issues[0].message);
      return;
    }

    const result = await userService.register(parsed.data);
    sendSuccess(res, result, 201);
  } catch (err: any) {
    sendError(res, err.message || 'Errore durante la registrazione', err.status || 500);
  }
});

// POST /api/v1/users/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.issues[0].message);
      return;
    }

    const result = await userService.login(parsed.data.email, parsed.data.password);
    sendSuccess(res, result);
  } catch (err: any) {
    sendError(res, err.message || 'Errore durante il login', err.status || 500);
  }
});

// GET /api/v1/users/profile
router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const user = await userService.getProfile(userId);
    sendSuccess(res, { user });
  } catch (err: any) {
    sendError(res, err.message || 'Errore', err.status || 500);
  }
});

// PUT /api/v1/users/profile
router.put('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.issues[0].message);
      return;
    }

    const userId = (req as AuthRequest).userId!;
    const user = await userService.updateProfile(userId, parsed.data);
    sendSuccess(res, { user });
  } catch (err: any) {
    sendError(res, err.message || 'Errore', err.status || 500);
  }
});

// PUT /api/v1/users/change-password
router.put('/change-password', authMiddleware, async (req: Request, res: Response) => {
  try {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, parsed.error.issues[0].message);
      return;
    }

    const userId = (req as AuthRequest).userId!;
    await userService.changePassword(userId, parsed.data.oldPassword, parsed.data.newPassword);
    sendSuccess(res, { message: 'Password aggiornata con successo' });
  } catch (err: any) {
    sendError(res, err.message || 'Errore', err.status || 500);
  }
});

export default router;
