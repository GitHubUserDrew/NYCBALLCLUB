import React, { useState, useRef } from 'react';
import axios from 'axios';
import imgupload from '../utils/imgupload';

// post is title and text and image and edited and postedAt and parkid and user id

const AddPostForm = ({ parkId, setPosts }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return;

    let obj = { title, text, parkId };
    if (img) obj.image = img;

    try {
      const response = await axios.post(`/posts/${parkId}`, obj);
      setPosts(posts => [...posts, response.data]);
      setTitle('');
      setText('');
      setImg('');
    } catch (error) {
      console.log(error);
    }
  };

    return (

        <form className="add-main-form" onSubmit={handleSubmit}>
          <div className="add-title">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="img-upload" style={{background:`url(${img})` || "white"}}onClick={() => ref.current.click()}>
            <p>click to upload img</p>
            <input
              type="file"
              name=""
              ref={ref}
              id=""
              onChange={(e)=> imgupload(e, setImg)}
              style={{display:"none"}}
            />
          </div>
          <div className="add-text">
            <label htmlFor="text">Text:</label>
            <textarea
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button id="submit-btn" type="submit">Add Post</button>
        </form>

    );
    
}

export default AddPostForm