import api from './api';
import { useAuthStore } from '../store/authStore';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  const { jwt, firstName, role, userId, email, phone } = response.data;
  const userObj = { firstName, role, userId, email, phone };
  useAuthStore.getState().setAuth(jwt, userObj);
};

export const logout = () => {
  useAuthStore.getState().clearAuth();
  window.location.href = '/login';
};

export const getUserId = () => {
  const user = useAuthStore.getState().user;
  return user?.userId;
};