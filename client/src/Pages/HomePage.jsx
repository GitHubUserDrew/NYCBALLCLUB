import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Mapbox from '../component/Mapbox';
import { getParks } from './../store/parkSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../component/Modal';
import Park from '../component/Park';
import {logout } from '../store/authSlice';
import Manage from "../component/Manage";

import Profile from '../component/Profile';

function HomePage() {
  const dispatch = useDispatch();
  const parks = useSelector((state) => state.parks);
  const [park, setPark] = useState(null);
  const user = useSelector((state) => state.auth)
  //SET THIS TO A USER TO SHOW THEIR PR0FILE 
  const [profile , setProfile] = useState(null);
  const [admin , setAdmin] = useState(false);


  

  useEffect(() => {
    dispatch(getParks());
  }, []);

  return (
    <div className="Home">
      <button className="logout" onClick={()=> dispatch(logout())}>Logout</button>
      <div className="profile" onClick={()=> setProfile(user)}>
        <img src={user.pfp} alt="" />
        <p>Profile</p>
      </div>
     {user.isAdmin &&  <button className ="adm-btn"onClick={()=> setAdmin(true)} className="admin" >MANAGE</button>}
      <Mapbox setPark={setPark} />
      {park && (
        <Modal close={() => setPark(null)}>
          <Park park={park} />
        </Modal>
      )}
    {profile && (
        <Modal close ={()=> setProfile(null)}>
         <Profile profile={profile}/>
        </Modal>
      )
    }
    {user.isAdmin && admin && (
        <Modal close={()=> setAdmin(false)}>
         <Manage/>
        </Modal>
      )
    }
    </div>
  );
}

export default HomePage;

