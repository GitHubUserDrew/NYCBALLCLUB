import React, {useState} from 'react'
import Post from "./Post";
import Review from "./Review"; 
import axios from 'axios';
import { useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {useSelector} from 'react-redux'; 
import '../css/Profile.css'
import {getUser} from "../store/authSlice"
import {useDispatch} from "react-redux"
import imgUpload from "../utils/imgUpload";



function Profile() {


  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [img , setImg] = useState("")
  const profile = useSelector(state => state.auth);
  const dispatch= useDispatch();
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [editName, setEditName] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  async function getPosts() {
    let data = await axios.get(`/posts/user/${profile._id}`);
    setPosts(data.data);
  }

  async function changePfp(pfp){
await axios.put("/users/"+ profile._id , {pfp:pfp})
dispatch(getUser())
  }


  useEffect(()=>{

   img && changePfp(img)
  }, [img])

  async function getReviews() {
    let data = await axios.get(`/reviews/user/${profile._id}`);
    setReviews(data.data);
  }

  useEffect(() => {
    getPosts();
    getReviews();
  }, []);

  const ref= useRef()


  return (
    <div className="Profile">
       <div className="profile-info">
         <div className="profile-img">
          <div className="update-pfp" onClick={() => ref.current.click()}>
            <input type="file" ref={ref} onChange={e=> (imgUpload(e , setImg))}  style={{display: "none"}}/>
          <p>Click to change</p>
          </div>
          <img src={profile.pfp} alt="" />
         </div>
        <div className="profile-name">
          <p ref={name} >{profile.name} </p>
       {editName ? <SaveIcon onClick={async() => {
         await fetch("/users/"+ profile._id, {
           method:"PUT", 
           headers:{"Content-Type": "application/json"},
           body:JSON.stringify({name:name.current.textContent})
         })
         dispatch(getUser())


           name.current.setAttribute('contenteditable', 'false');
            setEditName(false)  
       }} /> : <EditIcon onClick={() => {
         name.current.setAttribute('contenteditable', 'true');
         setEditName(true)
       }} />}
        </div>
        <div className="profile-username">
          <p ref={username}>{profile.username}</p>
     {editUsername ? <SaveIcon onClick={async() => {
            username.current.setAttribute('contenteditable', 'false');
            setEditUsername(false)
            await axios.put('/users/' + profile._id, {username: username.current.textContent})
            window.location.reload()
          }}/> : <EditIcon onClick={() => {
            username.current.setAttribute('contenteditable', 'true');
            setEditUsername(true)
          }}/>}
        </div>
        <div className="profile-email">
          <p ref={email}>{profile.email}</p>
       {editEmail ? <SaveIcon onClick={async() => {
            email.current.setAttribute('contenteditable', 'false');
            setEditEmail(false)
            await axios.put('/users/' + profile._id, {email: email.current.textContent})
            window.location.reload()
          }}/> : <EditIcon onClick={() => {
            email.current.setAttribute('contenteditable', 'true');
            setEditEmail(true)
          }}/>}
        </div>
       </div>
       <div className="profile-content">
        <div className="profile-post"></div>
        <div className="profile-review"></div>
       </div>
    </div>
  )

}

export default Profile
