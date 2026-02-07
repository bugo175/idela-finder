import axios from 'axios';
import { API_BASE_URL } from '../../shared/constants/api';

const api = axios.create({ baseURL: API_BASE_URL });

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      phone?: string;
      preferredLanguage: string;
    };
  };
}

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  consents: {
    terms_of_service: true;
    privacy_policy: true;
    marketing: boolean;
  };
}

export async function loginApi(email: string, password: string) {
  const res = await api.post<LoginResponse>('/users/login', { email, password });
  return res.data.data;
}

export async function registerApi(input: RegisterInput) {
  const res = await api.post<LoginResponse>('/users/register', input);
  return res.data.data;
}

export async function getProfileApi(token: string) {
  const res = await api.get<{ success: boolean; data: { user: LoginResponse['data']['user'] } }>('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.user;
}

export async function updateProfileApi(token: string, data: { firstName?: string; lastName?: string; phone?: string }) {
  const res = await api.put<{ success: boolean; data: { user: LoginResponse['data']['user'] } }>('/users/profile', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.user;
}
