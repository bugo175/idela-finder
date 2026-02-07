import { Router, Request, Response } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

const router = Router();

// GET /api/v1/products
router.get('/', (_req: Request, res: Response) => {
  sendSuccess(res, { products: [], message: 'Endpoint prodotti pronto' });
});

export default router;
