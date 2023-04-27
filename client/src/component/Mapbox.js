import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3MjUiLCJhIjoiY2xna3lnemF0MDVkbTNyb2J5b3V0MGNobyJ9.hxKhJ59P7GRrj_broRg9EQ';

function Mapbox() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.961472);
    const [lat, setLat] = useState(40.785823);
    const [zoom, setZoom] = useState(12);

    function setMap (){
        if(map.current){
            const canvas = document.querySelector(".map-container");
            
        canvas.style.height = '100vh';
        canvas.style.width = '100%';
        map.current.resize();
        }
    }


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [lng, lat],
        zoom: zoom
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
               <div className="sidebar">
                      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="map-container" />
            </div>
    )
}

export default Mapbox;