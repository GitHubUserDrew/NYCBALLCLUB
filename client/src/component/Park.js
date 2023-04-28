import React from 'react'
import "../css/Park.css"



function Park({park}) {
    const {name, image, long, lat} = park
  return (
    <div className="Park">
     <div className="info">
        <div className="park-img">
            <img src={park.image} alt="" />
        </div>
        <h1 className="park-name">{name}</h1>
        <h2 className="park-rating">4 stars</h2>
        <p className="park-address"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, autem!</p>

     </div>
     <div className="side">
        <div className="park-heading">
            <h2>Reviews</h2>
            <h2>Posts</h2>
        </div>
        <div className="main">

        </div>



     </div>
    </div>
  )
}

export default Park

