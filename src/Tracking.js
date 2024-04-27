// import React from 'react';
// import './Tracking.css';
// import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// import {Icon, divIcon} from "leaflet";
// import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from 'react-leaflet-cluster';

// const post = [48.8566, 2.3522]
// const Tracking = () => {
//     const markers = [
//         {
//             geocode:[48.86, 2.3522],
//             popUp: "PopUp 1"
//         },
//         {
//             geocode:[48.85, 2.3522],
//             popUp: "PopUp 2"
//         },
//         {
//             geocode:[48.855, 2.34],
//             popUp: "PopUp 3"
//         },
//     ]
//     const customIcon = new Icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/256/709/709008.png" /*Tow Truck*/,
//         iconSize: [38,38]
//     })

//     const createCustomClusterIcon = (cluster) => {
//         return new divIcon({
//             html: `<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
//             // className
//             // iconSize: point(33,33, true)
//         })
//     }

//   return (  
//     <MapContainer center={post} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MarkerClusterGroup 
//             chunkedLoading
//             iconCreateFunction={createCustomClusterIcon}>
//             {markers.map(marker => (
//                 <Marker position={marker.geocode} icon={customIcon}>
//                     <Popup>{marker.popUp}</Popup>
//                 </Marker>
//             ))
//             }
//         </MarkerClusterGroup>
//     </MapContainer>
//   )
// }

// export default Tracking

import React, { useEffect, useState } from 'react';
import './Tracking.css';
import RoutingMachine from './RouteMachine';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import {useLocation} from 'react-router-dom';

const Tracking = () => {
    // Initial state is an empty array
    const [markers, setMarkers] = useState([]);
    const location = useLocation();
    
    const { data } = location.state 

    useEffect(() => {
        // Function to fetch geocode data
        const fetchGeocodeData = async () => {
            try {
                // Assuming the API returns an array of objects with lat, lng, and popUp properties
                // You can set a default popup message or get it from `data` if available
                console.log("data", data);
                console.log(data.location);
                // setMarkers(data.location);
                if (data && data.location) {
                    setMarkers([{
                        geocode: [data.location.latitude, data.location.longitude],
                        popUp: "Tow Truck", 
                        icon: customIcon1
                    },
                    {
                        geocode: [data.startLocation.lat, data.startLocation.long],
                        popUp: "Start Location", 
                        icon: customIcon2
                    },
                    {
                        geocode: [data.endLocation.lat, data.endLocation.long],
                        popUp: "End Location",
                        icon: customIcon3
                    }
                ]);
                }
            } catch (error) {
                console.error("Failed to fetch geocode data", error);
            }
        };

        fetchGeocodeData();
    }, []); // Empty dependency array means this effect runs once on mount

    const customIcon1 = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/256/709/709008.png", // Tow Truck icon
        iconSize: [38, 38]
    });

    const customIcon2 = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/44/44334.png", // Tow Truck icon
        iconSize: [38, 38]
    });

    const customIcon3 = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/929/929426.png", // Tow Truck icon
        iconSize: [38, 38]
    });

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
        });
    };

    const routeCoordinates = [
        [data.location.latitude, data.location.longitude],
        [data.endLocation.lat, data.endLocation.long]
    ];

    // Center of the map (You might want to dynamically set this based on fetched data)
    const mapCenter = markers.length > 0 ? markers[0].geocode : [data.location.latitude, data.location.longitude];

    return (  
        <div>
            <h5 className="card-title"> Live Tracking here</h5>
                <div className = "map">
                    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup 
                            chunkedLoading
                            iconCreateFunction={createCustomClusterIcon}>
                            {markers.map((marker, index) => (
                                <Marker key={index} position={marker.geocode} icon={marker.icon}>
                                    <Popup>{marker.popUp}</Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                        {/* <RoutingMachine /> */}
                    </MapContainer>
                </div>
                {/* <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markers.map((marker, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{marker.geocode[0]}</td>
                                <td>{marker.geocode[1]}</td>
                                <td>{marker.popUp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
}

export default Tracking;