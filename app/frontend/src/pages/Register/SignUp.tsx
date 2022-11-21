import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../services/api';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { validateName, validatePassword } from '../../helper/validations';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const notifyError = async () => toast.warn(error);

  const notifySuccess = async () => toast.success('User created successfully')

  const navigate: NavigateFunction = useNavigate()

  const userSignUp = async () => {
    try {
      await register(username, password);
      
      await notifySuccess();
      navigate('/login');
    } catch (error: any) {
      !validateName(username) && setError(error.response.data.message[0]);
      !validatePassword(password) && setError(error.response.data.message[1]);

      await notifyError();
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
            {
              username.length > 0 ? (
                <span className='user_span' style={{
                  color: 'rgb(255, 0, 255)',
                  transform: 'translate(-5.4rem, -4rem)',
                  transition: 'all 0.2s ease-in-out',
                }}>username</span>
              ) : (
                <span className='user_span'>username</span>
              )
            }
            <input
              className='password_input'
              type='password'
              onChange={ (e) => setPassword(e.target.value) }
            />
            {
              password.length > 0 ? (
                <span className='pass_span' style={{
                  color: 'rgb(255, 0, 255)',
                  transform: 'translate(-5.4rem, -4rem)',
                  transition: 'all 0.2s ease-in-out',
                }}>password</span>
              ) : (
                <span className='pass_span'>password</span>
              )
            }
            <button
              type='button'
              onClick={ userSignUp }
              >
              Sign up
            </button>
          </form>
        </div>
        <p>
          Already have an account? <Link to='/login'> Sign in</Link>
        </p>
      </div>
    </div>
  )
}

