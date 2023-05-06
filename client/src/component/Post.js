import React from 'react'
import  axios  from 'axios';

function Post({post, user, setPosts}) {

 const oldDate = new Date(post.postedAt);

 const newDate = oldDate.toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
 })

 async function del() {
    await axios.delete("/posts/"+ post._id);
    setPosts();
}   

return (
    <div className="Post">
      <div className="post-info">
        <h3>username</h3>
        <p>Posted at: {newDate}</p>   
      </div>
      <h3>{post.title}</h3>
      <div className="post-img">
        <img src={post.image} alt="" />
      </div>
      <p>{post.text}</p>
      {post.edited && <p className="edited">edited</p>}
      {(post.userId == user.id) && <button onClick={del}>delete</button>}
    </div>
  );
}

export default Post
