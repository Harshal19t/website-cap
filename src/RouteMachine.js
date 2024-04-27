import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import './RouteMachine.css';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import { useLocation } from 'react-router-dom';

const RoutingMachine = () => {
  const map = useMap();
  const location = useLocation();
  const { data } = location.state;
  const controlRef = useRef(null);  // Use a ref to manage the control instance

  useEffect(() => {
    if (!data) {
      console.log("Data is not available");
      return;
    }

    // Initialize the routing control
    const control = L.Routing.control({
      // waypoints: [
      //   L.latLng(data.location.latitude, data.location.longitude),
      //   L.latLng(data.startLocation.lat, data.startLocation.long),
      //   L.latLng(data.endLocation.lat, data.endLocation.long),
      // ]
      waypoints: [
        L.latLng(23.006539, 72.53363),
        L.latLng(23.013912, 72.530338)
      ],
      lineOptions: {
        styles: [{ color: 'red', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      createMarker: () => null,
    });

    control.addTo(map);
    controlRef.current = control;  // Store the control instance in the ref
    return () => {
      // Only attempt to remove the control if it exists and the map is still valid
      if (map && controlRef.current) {
        console.log("Removing routing control");
        map.removeControl(controlRef.current);
      }
    };
  }, [map, data]);

  return null;
};

export default RoutingMachine;

// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import { useMap } from 'react-leaflet';
// import 'leaflet-routing-machine';
// import '@mapbox/mapbox-sdk/services/directions';
// import mapboxgl from 'mapbox-gl';

// const RoutingMachine = () => {
//   const map = useMap();
//   const location = useLocation();
//   const { data } = location.state;
//   const controlRef = useRef(null);

//   useEffect(() => {
//     if (!data) {
//       console.log("Data is not available");
//       return;
//     }

//     const mapboxAccessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token
//     mapboxgl.accessToken = mapboxAccessToken;

//     const mapboxClient = mapboxSdk({ accessToken: mapboxAccessToken });

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(data.location.latitude, data.location.longitude),
//         L.latLng(data.startLocation.lat, data.startLocation.long),
//         L.latLng(data.endLocation.lat, data.endLocation.long)
//       ],
//       router: L.Routing.mapbox(mapboxAccessToken),
//       lineOptions: {
//         styles: [{ color: 'blue', weight: 4 }]
//       },
//       show: false,
//       addWaypoints: false,
//       routeWhileDragging: true,
//       draggableWaypoints: true,
//       fitSelectedRoutes: true,
//       showAlternatives: false,
//       createMarker: () => null,
//     }).addTo(map);

//     controlRef.current = routingControl;

//     return () => {
//       if (map && controlRef.current) {
//         map.removeControl(controlRef.current);
//       }
//     };
//   }, [map, data]);

//   return null;
// };

// export default RoutingMachine;