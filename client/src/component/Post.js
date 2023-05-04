import React from 'react'
import  axios  from 'axios';
import AddPostForm from './AddPost';
function Post({post, user, setPosts}) {
 async function del()
{
    await axios.delete("/posts/"+ post._id);
    setPosts();

}    return (
    <div className="Post">
        <div className="post-info">
           {/* get the user info about the uder who posted and link to their profile */}
            <h3>username</h3>
            <p>{post.postedAt}</p>
            
        </div>
       <h3>{post.title}</h3>
       <div className="post-img">
        <img src={post.image} alt="" />
       </div>
       <p>{post.text}</p>

       {post.edited && <p className="edited">edited</p>}

       {(post.userId ==(user.id) ) && <button onClick={del}>delete</button>}
       <AddPostForm/>
    </div>
  )
}

export default Post
