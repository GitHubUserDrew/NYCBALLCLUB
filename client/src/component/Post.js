import React from 'react'
import  axios  from 'axios';
import {useEffect, useState} from 'react'
import '../css/Post.css'

function Post({post, user, setPosts}) {

 const oldDate = new Date(post.postedAt);

 const [_user , setUser] = useState({});
 const newDate = oldDate.toLocaleString([], {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
 })

 async function del() {
    await axios.delete("/posts/"+ post._id);
    setPosts();
 }


  async function getUser () {
  setUser((await axios.get("/users/"+ post.userId)).data)
}   
useEffect(()=>{
getUser();
}, [])

return (
    <div className="Post">
      <div className="post-info">
      <img src={_user?.pfp} alt="" />
        <h3>{_user?.name}</h3>
        <p>{_user?.username}</p>
        <p>Posted at: {newDate}</p>
      </div>
      <h3>{post.title}</h3>
      <div className="post-img">
        <img src={post.image} alt="" />
      </div>
      <p>{post.text}</p>
      {post.edited && <p className="edited">edited</p>}
      {(post.userId == user._id) && <button onClick={del}>delete</button>}
    </div>
  );
}

export default Post
