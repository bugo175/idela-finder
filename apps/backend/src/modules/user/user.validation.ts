import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z
    .string()
    .min(8, 'La password deve avere almeno 8 caratteri')
    .regex(/[A-Z]/, 'La password deve contenere almeno una lettera maiuscola')
    .regex(/[0-9]/, 'La password deve contenere almeno un numero'),
  firstName: z.string().min(1, 'Il nome è obbligatorio'),
  lastName: z.string().min(1, 'Il cognome è obbligatorio'),
  consents: z.object({
    terms_of_service: z.literal(true, { message: 'Devi accettare i Termini di Servizio' }),
    privacy_policy: z.literal(true, { message: 'Devi accettare la Privacy Policy' }),
    marketing: z.boolean().optional().default(false),
    analytics: z.boolean().optional().default(false),
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(1, 'La password è obbligatoria'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'Il nome non può essere vuoto').optional(),
  lastName: z.string().min(1, 'Il cognome non può essere vuoto').optional(),
  phone: z.string().optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'La password attuale è obbligatoria'),
  newPassword: z
    .string()
    .min(8, 'La nuova password deve avere almeno 8 caratteri')
    .regex(/[A-Z]/, 'La nuova password deve contenere almeno una lettera maiuscola')
    .regex(/[0-9]/, 'La nuova password deve contenere almeno un numero'),
});
