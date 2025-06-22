import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token){
    return null;
  } 

  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
