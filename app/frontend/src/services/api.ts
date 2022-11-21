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

  return response;
}

export const getUser = async (id: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `/users/${id}`,
  })

  return response.data;
}

export const getTransactions = async (id: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `/transactions/${id}`,
  })

  return response.data;
}

export const getCashInTransactions = async (id: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `/transactions/cashIn/${id}`,
  })

  return response.data;
}

export const getCashOutTransactions = async (id: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `/transactions/cashOut/${id}`,
  })

  return response.data;
}

export const createTransaction = async (username: string, value: string, id: string) => {
  const response = await api({
    method: 'post',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `/transactions/${id}`,
    data: {
      username,
      value,
    },
  });

  return response;
}

export const filterTransactionsByDate = async (id: string, minDate: string, maxDate: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `transactions/filterByDate/${id}/q`,
    params: {
      minDate,
      maxDate,
    },
  });

  return response.data;
}

export const filterCashInByDate = async (id: string, minDate: string, maxDate: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `transactions/cashIn/filterByDate/${id}/q`,
    params: {
      minDate,
      maxDate,
    },
  });

  return response.data;
}

export const filterCashOutByDate = async (id: string, minDate: string, maxDate: string) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
    },
    url: `transactions/cashOut/filterByDate/${id}/q`,
    params: {
      minDate,
      maxDate,
    },
  });

  return response.data;
}