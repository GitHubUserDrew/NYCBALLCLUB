import React from 'react';
import axios from 'axios';

function Review({ review, user, setReviews }) {

  const oldDate = new Date(review.postedAt);

  const newDate = oldDate.toLocaleString([], {
     hour: 'numeric',
     minute: 'numeric',
     second: 'numeric',
     hour12: true
  })

  async function del() {
    await axios.delete("/reviews/" + review._id);
    setReviews();
  }

  return (
    <div className="Review">
      <div className="review-info">
        {/* get the user info about the uder who reviewed and link to their profile */}
        <h3>username</h3>
        <p>Posted at: {newDate}</p>
      </div>
      <p className="rating">{[1, 1, 1, 1, 1].slice(0, review.rating).map(() => <span>&#9733;</span>)}</p>
      <h3>{review.title}</h3>
      <div className="review-img">
        <img src={review.image} alt="" />
      </div>
      <p>{review.text}</p>
      {(review.userId == (user.id)) && <button onClick={del}>delete</button>}
    </div>
  )
}

export default Review;
