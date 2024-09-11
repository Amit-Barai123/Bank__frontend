import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import RegisterForm from './components/Registerform';
import UserPage from './components/pages/user';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} ></Route>
      <Route path="/Register" element={<RegisterForm/>} ></Route>
      <Route path='/admin' element={<AdminPage/>}></Route>
      <Route path='/user/:id' element={<UserPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
