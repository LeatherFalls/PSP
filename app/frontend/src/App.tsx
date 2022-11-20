import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/Register/SignUp'
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Transactions } from './pages/Transactions/Transactions';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <SignUp /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/transactions" element={ <Transactions /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
