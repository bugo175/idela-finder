import { Router, Request, Response } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  sendSuccess(res, { carts: [], message: 'Endpoint carrello pronto' });
});

export default router;
