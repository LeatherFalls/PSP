import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/Register/SignUp'

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <SignUp /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
