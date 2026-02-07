import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../../middleware/auth';
import { sendSuccess, sendError } from '../../utils/apiResponse';
import UserConsent from './userConsent.model';

const router = Router();

// GET /api/v1/privacy - lista consensi utente
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const consents = await UserConsent.findAll({
      where: { userId },
      order: [['consentType', 'ASC']],
    });
    sendSuccess(res, { consents });
  } catch (err: any) {
    sendError(res, err.message || 'Errore', 500);
  }
});

// PUT /api/v1/privacy/:consentType - aggiorna consenso
router.put('/:consentType', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const consentType = req.params.consentType as string;
    const { isGranted } = req.body;

    // terms_of_service e privacy_policy non possono essere revocati
    if ((consentType === 'terms_of_service' || consentType === 'privacy_policy') && isGranted === false) {
      sendError(res, 'I consensi obbligatori non possono essere revocati');
      return;
    }

    const validTypes = ['terms_of_service', 'privacy_policy', 'marketing', 'analytics'];
    if (!validTypes.includes(consentType)) {
      sendError(res, 'Tipo di consenso non valido');
      return;
    }

    const consent = await UserConsent.findOne({ where: { userId, consentType } });
    if (!consent) {
      sendError(res, 'Consenso non trovato', 404);
      return;
    }

    if (isGranted) {
      await consent.update({ isGranted: true, grantedAt: new Date(), revokedAt: undefined });
    } else {
      await consent.update({ isGranted: false, revokedAt: new Date() });
    }

    sendSuccess(res, { consent });
  } catch (err: any) {
    sendError(res, err.message || 'Errore', 500);
  }
});

export default router;
