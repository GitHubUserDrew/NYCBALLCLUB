import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Mapbox from '../component/Mapbox';
import { getParks } from './../store/parkSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../component/Modal';
import Park from '../component/Park';

function HomePage() {
  const dispatch = useDispatch();
  const parks = useSelector((state) => state.parks);
  const [park, setPark] = useState(null);

  useEffect(() => {
    dispatch(getParks());
  }, []);

  return (
    <div className="Home">
      <Mapbox setPark={setPark} />
      {park && (
        <Modal close={() => setPark(null)}>
          <Park park={park} />
        </Modal>
      )}
    </div>
  );
}

export default HomePage;

