import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/authSlice';
import './css/App.css';
// pages and components
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import Home from './Pages/HomePage';

function App() {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {!user && <Route path="/" element={<Login />} />}
          {!user && <Route path="/register" element={<Register />} />}
          {user && (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
