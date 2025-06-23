
import { Routes } from './components/routes/Routes';
import { useFilter } from './context/FilterContext';
import './leaflet.css'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
// Component to handle map events

export const Viewer = () => {
  const oviedoCoordinates = [{ lat: 43.36227016055732, lng: -5.848699146428481 }];
  const { setZoomLevel } = useFilter(); // Assuming you have a context to manage zoom level

  const MapEventHandler = () => {
    useMapEvents({
      zoom: (e) => {
        console.log('Map zoomed to level:', e.target.getZoom());
        setZoomLevel(e.target.getZoom()); // Update zoom level in context
      },
    });
    return null;
  };

  return (
    <MapContainer center={oviedoCoordinates[0]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        minZoom={1}
        noWrap={true}
        detectRetina={true}
        maxNativeZoom={19}
      />
      <Routes />      <MapEventHandler /> {/* Add the event handler component here */}

    </MapContainer>
  )
}
