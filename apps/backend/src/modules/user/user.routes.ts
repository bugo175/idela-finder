import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/environment';
import { sendSuccess, sendError } from '../../utils/apiResponse';

const router = Router();

// POST /api/v1/users/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      sendError(res, 'Tutti i campi sono obbligatori');
      return;
    }

    // TODO: Create user in DB (Phase 2)
    const passwordHash = await bcrypt.hash(password, 12);
    const token = jwt.sign({ userId: 'temp-id' }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    sendSuccess(res, { token, user: { email, firstName, lastName } }, 201);
  } catch (err) {
    sendError(res, 'Errore durante la registrazione', 500);
  }
});

// POST /api/v1/users/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, 'Email e password sono obbligatori');
      return;
    }

    // TODO: Verify against DB (Phase 2)
    const token = jwt.sign({ userId: 'temp-id' }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    sendSuccess(res, { token, user: { email } });
  } catch (err) {
    sendError(res, 'Errore durante il login', 500);
  }
});

export default router;
