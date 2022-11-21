import React from 'react'
import { useNavigate } from 'react-router-dom'
import home from '../../assets/images/home.svg'
import transactions from '../../assets/images/transaction.svg'
import './Footer.css'

export const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='footer_container'>
      <footer>
        <img
          src={ home }
          alt='home'
          onClick={ () => navigate('/dashboard') }
        />
        <img
          src={ transactions }
          alt='home'
          onClick={ () => navigate('/transactions') }
        />
      </footer>
    </div>
  )
}
