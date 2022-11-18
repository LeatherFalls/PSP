import React, { useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { login } from '../../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

export const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const notify = async () => toast.error(error)

  const navigate: NavigateFunction = useNavigate()

  const userLogin = async () => {
    try {
      const response = await login(username, password);

      const user = {
        id: response.data.payload.id,
        username: response.data.payload.username,
        token: response.data.token,
      };
      navigate('/dashboard');
      localStorage.setItem('user', JSON.stringify(user));

    } catch (error: any) {
      console.log(error);
      error.response.data.message = 'Invalid username or password';
      setError(error.response.data.message);
      notify();
    }
  };


  return (
    <div className='login_container'>
        <div className='login_content'>
        <img
          src={ logo }
          alt='logo'
          className='login_logo'
        />
        <div className='login_form'>
          <h1>Save your money</h1>
          <p>
            Best solution to save and invest your money just with smartphone.
          </p>
          <form>
            <input
              className='username_input'
              type='text'
              onChange={ (e) => setUsername(e.target.value) }
            />
            <span className='user_span'>username</span>
            <input
              className='password_input'
              type='password'
              onChange={ (e) => setPassword(e.target.value) }
            />
            <span className='pass_span'>password</span>
            <button
              type='button'
              onClick={ userLogin }
              >
              Sign in
            </button>
          </form>
        </div>
        <p>
          Don't have an account? <Link to='/register'> Sign up</Link>
        </p>
      </div>
    </div>
  )
}

