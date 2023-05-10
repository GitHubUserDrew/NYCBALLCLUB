import React from 'react';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { register } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Register({}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  

  return (
    <div className="login">
      <div className="login-main">
        <div className="inp-container">
          <input
            type="email"
            name=""
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <EmailIcon />
        </div>
        <div className="inp-container">
          <input
            type="text"
            placeholder="Username"
            name=""
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PersonIcon />
        </div>
        <div className="inp-container">
          <input
            type="password"
            placeholder="Password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <KeyIcon />
        </div>
        <button onClick={() => dispatch(register({ username, email, password }))}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/">Login Now</Link>
        </p>
      </div>
    </div>
  );
}
