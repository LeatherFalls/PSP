import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = async (username: string, password: string) => {
  const response = await api({
    method: 'post',
    url: '/auth/login',
    data: {
      username,
      password,
    },
  });

  return response;
}

export const register = async (username: string, password: string) => {
  const response = await api({
    method: 'post',
    url: '/users',
    data: {
      username,
      password,
    },
  });

  return response.data;
}