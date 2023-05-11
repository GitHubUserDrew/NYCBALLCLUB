

import React , {useRef}from 'react';
import { useState } from 'react';
import Park from './Park';
import axios from 'axios';
import {getParks} from '../store/parkSlice'
import {useDispatch} from "react-redux"
import imgUpload from "../utils/imgUpload"
import '../css/ParkAdmin.css'

function AddParkForm() {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch()
    const ref = useRef();
    const [img , setImg] = useState('');

    const handleAddParkForm = async (e) => {
        e.preventDefault();
        if (!lat || !long || !name ) return;
        const newpark = {lat,long,name};
        try{
            const response = await axios.post('/parks', newpark)
            dispatch(getParks());
        setLat('');
        setLong('');
        setName('');
        } catch (error) {
            console.error(error);
        }   
    } 

  return( 
    <div className="add-park-div">
          <form className="add-park-form" onSubmit={handleAddParkForm}>

            <div className="park-img-upload" style ={{background:"url("+img+")" || "white"}} onClick ={()=> ref.current.click()}>
              <input type="file" ref={ref} onChange ={(e) => imgUpload(e , setImg) } style ={{display :"none"}} />
              {!img && <p>Add an Image </p>}
            </div>
        <div className="add-lat">
          <label htmlFor="latitude">Latitude: </label>
          <input
            type="text"
            id="title"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="add-long">
          <label htmlFor="longitude">Longitude: </label>
          <input
            type="text"
            id="longitude"
            value={long}
            onChange={(e) => setLong(e.target.value)}
          />
        </div>
        <div className="add-name">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Add Park</button>
      </form>
    </div>
        
   )
}

export default AddParkForm; 
