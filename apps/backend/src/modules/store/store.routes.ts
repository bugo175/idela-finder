import { Router, Request, Response } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  sendSuccess(res, { stores: [], message: 'Endpoint supermercati pronto' });
});

export default router;
