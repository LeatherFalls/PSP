import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { getTransactions, getUser } from '../../services/api';
import logout from '../../assets/images/logout.svg';
import moment from 'moment';
import './Dashboard.css';

interface IUserObject {
  username: string,
}

interface ITest {
  value: number;
  createdAt: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<IUserObject>();
  const [balance, setBalance] = useState<number>();
  const [transactions, setTransactions] = useState<ITest[]>([])

  const navigate = useNavigate();

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const renderTransactions = async () => {
    try {
      const response = await getTransactions(userLs.id);
      setTransactions(response)
      console.log(response);
    } catch (error) {
      handleLogout();
    }
  }

  const getUserById = async () => {
    try {
      const response = await getUser(userLs.id);
      setBalance(response.accountId.balance);
      console.log(response);
    } catch (error) {
      handleLogout();
    }
  }

  const now = moment().format('ll');

  useEffect(() => {
    getUserById();
    renderTransactions();
    setUser(userLs);
  }, [])
  
  return (
    <div className='dashboard_container'>
      <div className='dashboard_content'>
        <header className='header'>
          <div className='header_user'>
            <p>{now}</p>
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
        <h3 className='dashboard_activity'>Activity</h3>
        {
          transactions.map((transaction, index) => (
            <div
              className='dashboard_transactions'
              key={ index }
            >
              <p>{moment(transaction.createdAt).format('lll')}</p>
              <p>R$ {transaction.value.toFixed(2)}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
