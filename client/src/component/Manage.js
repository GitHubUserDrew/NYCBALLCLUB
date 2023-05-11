import React from 'react'
import axios from 'axios'; 
import AddParkForm from './../component/ParkAdmin';
import {useSelector} from "react-redux";

import { getParks } from './../store/parkSlice';


function Manage() {


    const parks = useSelector(state => state.parks)
  return (
    <div className="Manage">
     <div className="manage-parks">
     {
        parks && parks.map(park => 
            <div className="manage-park" >
                <h2>{park.name}</h2>
                <p>lat: {park.lat}</p>
                <p>long: {park.long}</p>
                <button onClick={async () =>{
                await axios.delete("/parks/"+ park._id);
              window.location.reload();
                }}>Delete</button>
            </div>)
      }
     </div>
      <AddParkForm/>
    </div>
  )
}

export default Manage
