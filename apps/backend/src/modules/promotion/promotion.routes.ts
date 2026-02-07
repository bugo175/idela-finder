import { Router, Request, Response } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  sendSuccess(res, { promotions: [], message: 'Endpoint promozioni pronto' });
});

export default router;
