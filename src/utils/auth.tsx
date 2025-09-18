import api from './api';

export const login = async (username: string , password: string) => {
  const response = await api.post('/auth/login', { username, password });
  const { jwt, firstName, role, userId, email, phone } = response.data;
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('user', JSON.stringify({ firstName, role, userId, email, phone }));
};

export const logout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  return user?.userId;
};