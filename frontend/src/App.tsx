import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import PrivateRoutes from './components/private-route/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Home/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
