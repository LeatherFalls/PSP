import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { filterCashInByDate, filterCashOutByDate } from '../../services/api';
import moment from 'moment';
import './Dashboard.css';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Balance } from '../../components/Balance/Balance';
import "react-datepicker/dist/react-datepicker.css";

interface ITransactions {
  value: number;
  createdAt: string;
  status: string;
}

export const Dashboard = () => {
  const start = new Date(new Date().setDate(new Date().getDate() - 365));

  const [cashIn, setCashIn] = useState<ITransactions[]>([])
  const [cashOut, setCashOut] = useState<ITransactions[]>([])
  const [allTransactions, setAllTransactions] = useState<ITransactions[]>([...cashIn, ...cashOut])
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

  const navigate = useNavigate();

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleCashIn = async () => {
    try {
      const dateMin = startDate.toISOString().slice(0, 10);
      const dateMax = endDate.toISOString().slice(0, 10);
      const response = await filterCashInByDate(userLs.id, dateMin, dateMax);
      response.map((item: ITransactions) => {
        item.status = 'cashIn';
      })
      console.log(response);

      return response;
    } catch (error) {
      handleLogout();
    }
  }

  const handleCashOut = async () => {
    try {
      const dateMin = startDate.toISOString().slice(0, 10);
      const dateMax = endDate.toISOString().slice(0, 10);
      const response = await filterCashOutByDate(userLs.id, dateMin, dateMax);
      response.map((item: ITransactions) => {
        item.status = 'cashOut';
      })

      console.log(response);
      return response;
    } catch (error) {
      handleLogout();
    }
  }

  const filterTransactions = async () => {
    const cashIn = await handleCashIn();
    const cashOut = await handleCashOut();

    setAllTransactions([...cashIn, ...cashOut]);
  }

  useEffect(() => {
    filterTransactions();
  }, [startDate, endDate])
  
  return (
    <div className='dashboard_container'>
      <div className='dashboard_content'>
        <Header />
        <Balance />
        <div className='dashboard_filter'>
          <h3 className='dashboard_activity'>Activity</h3>
          <div className='dashboard_filter__date'>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              className='dashboard_filter__date__start'
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
              className='dashboard_filter__date__end'
            />
          </div>
        </div>
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
