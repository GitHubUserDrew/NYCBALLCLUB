import React from 'react';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { login } from '../store/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({}){


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(user)
        user&& navigate("/")
    }, [user])

  

    return (
        <div className="login">
            <div className="login-main">
                <div className="inp-container">
                    <input type="text" placeholder ="Username or Email" name="" id="" value={username} onChange={e=> setUsername(e.target.value)} />
                    <PersonIcon/>
                </div>
                <div className="inp-container">
                    <input type="password"  placeholder = "Password" name="" id="" value ={password} onChange={e=> setPassword(e.target.value)}/>
                    <KeyIcon/>
                </div>
                <button onClick={  () => dispatch(login({username, password}))}>
                    Login
                </button>
                <p>Don't have an account? <Link to="/register">register</Link></p>
            </div>
        </div>
    )
}

