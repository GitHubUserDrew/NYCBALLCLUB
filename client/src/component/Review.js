import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react'
import '../css/Review.css'
function Review({ review, user, setReviews }) {

  const oldDate = new Date(review.postedAt);

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
    await axios.delete("/reviews/" + review._id);
    setReviews();
  }
  
  async function getUser ()
  {
    setUser((await axios.get("/users/"+ review.userId)).data)
  }  

  useEffect(()=>{
   getUser();
  }, [])
  
  return (
    <div className="Review">
      <div className="review-info">
        {/* get the user info about the uder who reviewed and link to their profile */}
        <img src={_user?.pfp} alt="" />
        <h3>{_user?.name}</h3>
        <p>{_user?.username}</p>
        <p>Posted at: {newDate}</p>
      </div>
      <p className="rating">{[1, 1, 1, 1, 1].slice(0, review.rating).map(() => <span>&#9733;</span>)}</p>
      <h3>{review.title}</h3>
      <div className="review-img">
        <img src={review.image} alt="" />
      </div>
      <p>{review.text}</p>
      {(review.userId == (user._id)) && <button onClick={del}>delete</button>}
    </div>
  )
}

export default Review;
