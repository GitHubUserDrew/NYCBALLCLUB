import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import pin from "../imgs/pin.png";
import ReactDOM from 'react-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3MjUiLCJhIjoiY2xna3lnemF0MDVkbTNyb2J5b3V0MGNobyJ9.hxKhJ59P7GRrj_broRg9EQ';

function Mapbox({setPark}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.961472);
    const [lat, setLat] = useState(40.785823);
    const [zoom, setZoom] = useState(12);
    const parks = useSelector(state => state.parks)

    const Marker = ({ children, onClick }) => {
      return (
        <button className="marker" onClick={onClick}>
          {children}
        </button>
      );
    };

      function setMap() {
        if (map.current) {
          const canvas = document.querySelector('.map-container');
    
          canvas.style.height = '100vh';
          canvas.style.width = '100%';
          map.current.resize();
        }
      }

    function loadPins(parks) {
      parks.forEach(park => {
        const { name, lat, long } = park;
        const ref = React.createRef();
  
        // Create a new DOM node and save it to the React ref
        ref.current = document.createElement('div');
  
        // Render a Marker Component on our new DOM node
        ReactDOM.render(
          <Marker onClick={() => setPark(park)}>
            <p>{name}</p>
            <img src={pin} alt="" />
          </Marker>,
          ref.current
        );
  
        // Create a Mapbox Marker at our new DOM node
        new mapboxgl.Marker(ref.current)
          .setLngLat([Number(long), Number(lat)])
          .addTo(map.current);
      });
    }
      
      useEffect(() => {
        if (!parks.length) return;
        loadPins(parks);
      }, [parks]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [lng, lat],
      zoom: zoom,
    });
    setMap();
  });
         
    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    });
          
    return (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    );
}

export default Mapbox;