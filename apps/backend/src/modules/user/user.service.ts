import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';
import UserConsent from '../privacy/userConsent.model';
import { env } from '../../config/environment';

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  consents?: {
    terms_of_service: boolean;
    privacy_policy: boolean;
    marketing?: boolean;
    analytics?: boolean;
  };
}

function generateToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
}

function sanitizeUser(user: User) {
  const { passwordHash, ...userData } = user.toJSON();
  return userData;
}

export async function register(input: RegisterInput) {
  const existing = await User.findOne({ where: { email: input.email } });
  if (existing) {
    throw { status: 409, message: 'Email già registrata' };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const userId = randomUUID();
  const user = await User.create({
    id: userId,
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
  });

  // Create GDPR consents
  const consents = input.consents || { terms_of_service: true, privacy_policy: true };
  const consentTypes = ['terms_of_service', 'privacy_policy', 'marketing', 'analytics'] as const;
  for (const type of consentTypes) {
    const isGranted = (consents as any)[type] ?? false;
    await UserConsent.create({
      userId: userId,
      consentType: type,
      isGranted,
      grantedAt: isGranted ? new Date() : new Date(),
    });
  }

  const token = generateToken(userId);
  return { token, user: sanitizeUser(user) };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'Credenziali non valide' };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw { status: 401, message: 'Credenziali non valide' };
  }

  await user.update({ lastLoginAt: new Date() });

  const token = generateToken(user.id);
  return { token, user: sanitizeUser(user) };
}

export async function getProfile(userId: string) {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['passwordHash'] },
  });
  if (!user) {
    throw { status: 404, message: 'Utente non trovato' };
  }
  return user;
}

export async function updateProfile(userId: string, data: { firstName?: string; lastName?: string; phone?: string }) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { status: 404, message: 'Utente non trovato' };
  }

  await user.update(data);
  const { passwordHash, ...userData } = user.toJSON();
  return userData;
}

export async function changePassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { status: 404, message: 'Utente non trovato' };
  }

  const valid = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!valid) {
    throw { status: 401, message: 'Password attuale non corretta' };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await user.update({ passwordHash });
}
