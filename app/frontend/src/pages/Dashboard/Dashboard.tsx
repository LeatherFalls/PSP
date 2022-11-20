import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { getCashInTransactions, getCashOutTransactions, getTransactions, getUser } from '../../services/api';
import logout from '../../assets/images/logout.svg';
import moment from 'moment';
import './Dashboard.css';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Balance } from '../../components/Balance/Balance';

interface IUserObject {
  username: string,
}

interface ITransactions {
  value: number;
  createdAt: string;
  status: string;
}

export const Dashboard = () => {
  const [cashIn, setCashIn] = useState<ITransactions[]>([])
  const [cashOut, setCashOut] = useState<ITransactions[]>([])
  const [allTransactions, setAllTransactions] = useState<ITransactions[]>([...cashIn, ...cashOut])

  const navigate = useNavigate();

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleCashIn = async () => {
    try {
      const response = await getCashInTransactions(userLs.id);
      response.map((item: ITransactions) => {
        item.status = 'cashIn';
      })
      
      return response;
    } catch (error) {
      handleLogout();
    }
  }

  const handleCashOut = async () => {
    try {
      const response = await getCashOutTransactions(userLs.id);
      response.map((item: ITransactions) => {
        item.status = 'cashOut';
      })

      return response;
    } catch (error) {
      handleLogout();
    }
  }

  const handleAllTransactions = async () => {
    const cashIn = await handleCashIn();
    const cashOut = await handleCashOut();
    setAllTransactions([...cashIn, ...cashOut]);
  }

  useEffect(() => {
    handleAllTransactions();
  }, [])
  
  return (
    <div className='dashboard_container'>
      <div className='dashboard_content'>
        <Header />
        <Balance />
        <h3 className='dashboard_activity'>Activity</h3>
        {
          allTransactions.map((transaction, index) => (
            <div
              className='dashboard_transactions'
              key={ index }
            >
              <p>{moment(transaction.createdAt).format('lll')}</p>
              {
                transaction.status === 'cashIn' ? (
                  <p className='dashboard_transactions__green'>+ R$ {transaction.value.toFixed(2)}</p>
                ) : (
                  <p className='dashboard_transactions__red'>- R$ {transaction.value.toFixed(2)}</p>
                )
              }
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}
