import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/authSlice';
import './css/App.css';
// pages and components
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import Home from './Pages/HomePage';
import {useNavigate} from 'react-router-dom';

function App() {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    user && navigate('/');
  }, [user]);

  return (
    <div className="App">
    
        <Routes>
          {!user && <Route path="/" element={<Login />} />}
          {!user && <Route path="/register" element={<Register />} />}
          {user && (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
    </div>
  );
}

export default App;
