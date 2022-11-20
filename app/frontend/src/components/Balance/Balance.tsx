import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/api';

export const Balance = () => {
  const [balance, setBalance] = useState<number>();

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const getUserById = async () => {
    try {
      const response = await getUser(userLs.id);
      setBalance(response.accountId.balance);
    } catch (error) {
      handleLogout();
    }
  }

  useEffect(() => {
    getUserById();
  }, [balance])

  return (
    <div className='dashboard_balance'>
      <h3>Balance</h3>
      <h1>R$ <span>{balance?.toFixed(2)}</span></h1>
    </div>
  )
}
