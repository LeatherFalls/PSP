import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/api';
import logout from '../../assets/images/logout.svg';
import './Dashboard.css';

interface IUserObject {
  username: string,
}

export const Dashboard = () => {
  const [user, setUser] = useState<IUserObject>();
  const [balance, setBalance] = useState<number>();

  const navigate = useNavigate();

  const start = new Date(new Date().setDate(new Date().getDate() - 365));
  const [startDate, setStartDate] = useState(start);

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const getUserById = async () => {
    try {
      const response = await getUser(userLs.id);

      setBalance(response.accountId.balance);
      console.log(response)
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    getUserById();
    setUser(userLs);
  }, [])

  return (
    <div className='dashboard_container'>
      <div className='dashboard_content'>
        <header className='header'>
          <div className='header_user'>
            <DatePicker 
              selected={ startDate }
              onChange={ (date: Date) => setStartDate(date) }
              dateFormat='MMM, d'
            />
            <h1>Hi, { user?.username }!</h1>
          </div>
          <img
            src={ logout }
            alt='logout'
            onClick={ handleLogout }
          />
        </header>
        <div className='dashboard_balance'>
          <h3>Balance</h3>
          <h1>R$ <span>{balance?.toFixed(2)}</span></h1>
        </div>
      </div>
    </div>
  )
}
