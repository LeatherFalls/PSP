import React from 'react'
import { toast } from 'react-toastify'
import { Balance } from '../../components/Balance/Balance'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { createTransaction } from '../../services/api'
import './Transactions.css'

export const Transactions = () => {
  const [username, setUsername] = React.useState<string>('')
  const [value, setValue] = React.useState<string>('')

  const userLs = JSON.parse(localStorage.getItem('user') || '{}');

  const notifySuccess = () => toast.success('Successful!')
  const notifyError = (e: string) => toast.error(e)

  const handleSubmit = async () => {
    try {
      await createTransaction(username, value, userLs.id);
      notifySuccess();
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
    
  }

  return (
    <div className='transactions_container'>
      <div className='transactions_content'>
        <Header />
        <Balance />
        <h3>Transaction area</h3>
        <form>
            {
              username.length > 0 ? (
                <span className='username_span' style={{
                  color: 'rgb(255, 0, 255)',
                }}>username</span>
              ) : (
                <span className='username_span'>username</span>
              )
            }
            <input
              className='username_input'
              type='text'
              onChange={ (e) => setUsername(e.target.value) }
            />
            {
              value.length > 0 ? (
                <span className='value_span' style={{
                  color: 'rgb(255, 0, 255)',
                }}>value</span>
              ) : (
                <span className='value_span'>value</span>
              )
            }
            <input
              className='value_input'
              type='text'
              onChange={ (e) => setValue(e.target.value) }
            />
            <button
              type='button'
              onClick={ handleSubmit }
              className='create_transaction'
              >
              Send
            </button>
          </form>
      </div>
      <Footer />
    </div>
  )
}
