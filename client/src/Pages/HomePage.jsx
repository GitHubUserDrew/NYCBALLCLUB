import React, {useEffect} from 'react'
import '../css/Home.css'
import Mapbox from '../component/Mapbox'
import { getParks } from './../store/parkSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



function HomePage() {
  const dispatch = useDispatch();
  const parks = useSelector(state => state.parks)

  useEffect(()=>{
    dispatch(getParks())
  },[])




  
  return (
   
    <div className="Home">
      <Mapbox/>
    </div>
  )
}

export default HomePage
