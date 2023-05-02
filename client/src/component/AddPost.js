import React, {useState} from 'react';
import axios
import { useDispatch } from 'react-redux';
//post is title and text and image and edited and postedAt and parkid and user id
const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handlesubmit = async(e) => {
        e.preventDefault();

    }
    return (

       <div>
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
           <div>
              <label htmlFor="text">text:</label>
               <input
                 id="text"
                  value={text}
                onChange={(e) => setText(e.target.value)}
               />
           </div>
             <button type="submit">Add Post</button>
           </form>
        </div>
    )
}

export default AddPostForm