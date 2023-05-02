import React, {useState} from 'react';
import axios
import { useDispatch } from 'react-redux';
//review is title and text and rating and image and postedat and parkid and user id
const AddReviewForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();

    const handlesubmit = async(e) => {
        e.preventDefault();

    }

    const ratingfunction() {
        setRating(rating)
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
             <button type="submit">Post A Review</button>
           </form>
        </div>
    )
}

export default AddReviewForm