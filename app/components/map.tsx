
// If not use "use client", I got this window is not defined error. which 'Error: window is not defined'.
"use client";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';


interface MyMapProps {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
}

const MyMap: React.FC<MyMapProps> = ({ location }) => {

    // Define a default center position
  const defaultCenter: L.LatLngExpression = [0, 0]; // Example: [0, 0] or any other default coordinates
  // Use the provided location or the default center
  const center: L.LatLngExpression = [
    location.latitude ?? defaultCenter[0],
    location.longitude ?? defaultCenter[1]
  ];

  return (
    <MapContainer center={center} zoom={15} scrollWheelZoom={false} style={{height: "400px", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MyMap;