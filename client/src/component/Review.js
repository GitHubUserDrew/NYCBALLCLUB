import React from 'react'
import  axios  from 'axios';
function Review({review, user, setReviews}) {
   async function del() {
        await axios.delete("/reviews/"+ review._id);
        setReviews();
    
    } 
  return (
    <div className="Review">
    <div className="review-info">
       {/* get the user info about the uder who reviewed and link to their profile */}
        <h3>username</h3>
        <p>{review.postedAt}</p>
        
    </div>
    <h3 className="rating">{review.rating} stars</h3>
   <h3>{review.title}</h3>
   
   <div className="review-img">
    <img src={review.image} alt="" />
   </div>
   <p>{review.text}</p>
   {(review.userId == (user.id) ) && <button onClick={del}>delete</button>}


   
</div>
  )
}

export default Review
