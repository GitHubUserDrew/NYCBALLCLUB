import React, { useState, useEffect, useCallback } from 'react';
import '../css/Park.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post from './Post';
import Review from './Review';
import AddReviewForm from './AddReviews';
import AddPostForm from './AddPost';

function Park({ park }) {
  const { name, image, long, lat } = park;
  const user = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState('posts');
 
const fetchReviews = useCallback(async ()=> {
    let data = await axios.get('/reviews/park/' + park._id);
    console.log(data);
    setReviews(data.data);
  })

  const fetchPosts = useCallback(async() => {
    let data = await axios.get('/posts/park/' + park._id);
    console.log(data);
    setPosts(data.data);
  })

  useEffect(() => {
    console.log("fetching")
    fetchPosts();
    fetchReviews();
  }, []);

  function avgRating(){
    if(!reviews.length) return;
    return (reviews?.reduce((a,review) =>  a+Number(review.rating), 0  )/reviews.length)
  }

    return (
      <div className="Park">
        <div className="info">
          <div className="park-img">
            <img src={park.image} alt="" />
          </div>
          <h1 className="park-name">{name}</h1>
          <h2 className="park-rating">{avgRating()} </h2>
          <p className="park-address">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, autem!
          </p>
        </div>
        <div className="side">
          <div className="park-heading">
            <h2 onClick={() => setData('reviews')}>Reviews</h2>
            <h2 onClick={() => setData('posts')}>Posts</h2>
          </div>
          <div className="main">
          {data == 'reviews' && (
                <AddReviewForm parkId={park._id} setReviews={setReviews}/>
              ) }
            {data == 'reviews' &&
              reviews?.map((review) => (
                <Review setReviews={fetchReviews} review={review} user={user}></Review>))}
        
        {data == "posts" &&(
              <AddPostForm parkId={park._id} setPosts={setPosts} />
            ) }
            {data == 'posts' &&
              posts?.map((post) => <Post setPosts={fetchPosts} post={post} user={user}></Post>)}
        

          
          </div>
        </div>
      </div>
    );
}

export default Park

