import React, { useEffect, useState } from "react";
import "./Tracking.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { useLocation } from "react-router-dom";
import { currentVehicle, setCurrentVehicle } from "./currentVehicleState";

// Custom icons created outside the component body
const customIcon1 = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/256/709/709008.png",
  iconSize: [38, 38],
});

const customIcon2 = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/44/44334.png",
  iconSize: [38, 38],
});

const customIcon3 = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/929/929426.png",
  iconSize: [38, 38],
});

const Tracking = () => {
  const [markers, setMarkers] = useState([]);
  const location = useLocation();
  const { data } = location.state;

  useEffect(() => {
    const fetchGeocodeData = async () => {
      let fetchedData;
      const apiUrl = "http://13.60.64.128:3000/api/tow/tows/getLocation";
      try {
        let vehicles = currentVehicle;
        const response = await axios.post(apiUrl, { vehicles });
        fetchedData = response.data;
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        console.log("fetchedData", fetchedData);
        console.log(fetchedData?.location);
        if (fetchedData && fetchedData.location) {
          setMarkers([
            {
              geocode: [
                fetchedData.location.latitude,
                fetchedData.location.longitude,
              ],
              popUp: "Tow Truck",
              icon: customIcon1,
            },
            {
              geocode: [
                fetchedData.startLocation.lat,
                fetchedData.startLocation.long,
              ],
              popUp: "Start Location",
              icon: customIcon2,
            },
            {
              geocode: [
                fetchedData.endLocation.lat,
                fetchedData.endLocation.long,
              ],
              popUp: "End Location",
              icon: customIcon3,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch geocode data", error);
      }
    };

    fetchGeocodeData();

    const intervalId = setInterval(fetchGeocodeData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
    });
  };

  const mapCenter =
    markers.length > 0
      ? markers[0].geocode
      : [data?.location.latitude, data?.location.longitude];

  return (
    <div>
      <h5 className="card-title"> Live Tracking here</h5>
      <div className="map">
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={marker.icon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Tracking;
