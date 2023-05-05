import React, { useState, useRef } from 'react';
import axios from 'axios';
import imgupload from "../utils/imgupload"

//review is title and text and rating and image and postedat and parkid and user id
const AddReviewForm = ({ parkId, setReviews }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(null);
  const [img, setImg] = useState("");
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !title || !text) return;

    let obj = { rating, title, text, parkId };
    if (img) obj.image = img;

    try {
      const response = await axios.post(`/reviews/${parkId}`, obj);
      setReviews(reviews => [...reviews, response.data]);
      setTitle('');
      setText('');
      setRating(null);
      setImg('');
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div className="add-form-main-div">
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
          <div className="img-upload" onClick={() => ref.current.click()}>
            <p>click to upload img</p>
            <input
              type="file"
              name=""
              ref={ref}
              id="img-input"
              onChange={(e) => imgupload(e, setImg)}
              style={{ display: "none" }}
            />
          </div>
          <div className="add-rating">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              name=""
              min="1"
              max='5'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id=""
            />
          </div>
          <div className="add-text">
            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button id="submit-btn" type="submit">Post A Review</button>
        </form>
      </div>
    )
};

export default AddReviewForm;