
import './leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Routes } from './routes/Routes';

export const Viewer = () => {
  const oviedoCoordinates = [{ lat: 43.36227016055732, lng: -5.848699146428481 }];

  return (
    <MapContainer center={oviedoCoordinates[0]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        minZoom={1}
        noWrap={true}
        detectRetina={true}
        maxNativeZoom={19}
      />
      <Routes />
    </MapContainer>
  )
}
