import React from 'react'
import { Link } from 'react-router-dom'

export interface ILogin {}

export const Login: React.FunctionComponent<ILogin> = () => {
  return (
    <div>
      Login
      <Link to="/register">Register</Link>
    </div>
  )
}

