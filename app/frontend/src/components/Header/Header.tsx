import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logout from '../../assets/images/logout.svg';

interface IUserObject {
  username: string,
}


export const Header = () => {
  const [user, setUser] = useState<IUserObject>();

  const navigate = useNavigate();

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const now = moment().format('ll');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    setUser(userLs);
  }, [])

  return (
    <header className='header'>
      <div className='header_user'>
        <p>{now}</p>
        <h1>Hi, {user?.username}!</h1>
      </div>
      <img
        src={logout}
        alt='logout'
        onClick={handleLogout}
      />
    </header>
  )
}
