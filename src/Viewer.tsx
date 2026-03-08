
import { Routes } from './components/routes/Routes';
import { Legend } from './components/legend/Legend';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { RouteInfo } from './components/routes/RouteInfo';
import { LayerSelector } from './components/map/LayerSelector';
import { LocationControl } from './components/map/LocationControl';
import { useFilter } from './context/FilterContext';
import './leaflet.css'
import './Viewer.css'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import RoutesFile from './components/routes/routes.json'

// Component to handle map events
const MapEventHandler = ({ onZoom }: { onZoom: (zoom: number) => void }) => {
    useMapEvents({
        zoom: (e) => onZoom(e.target.getZoom()),
    });
    return null;
};

export const Viewer = () => {
    const oviedoCoordinates = [{ lat: 43.36227016055732, lng: -5.848699146428481 }];
    const { setZoomLevel, selectedRouteId } = useFilter();

    // Find selected route info
    const selectedRoute = selectedRouteId 
        ? RoutesFile.routes[parseInt(selectedRouteId.split('-')[1])]
        : null;

    return (
        <div className="viewer-container">
            <MapContainer 
                center={oviedoCoordinates[0]} 
                zoom={13} 
                scrollWheelZoom={true} 
                style={{ height: '100vh', width: '100%' }}
                className="route-map"
                zoomControl={true}
            >
                {/* Base layer with OSM - will be replaced by LayerSelector */}
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                    minZoom={1}
                    noWrap={true}
                    detectRetina={true}
                    maxNativeZoom={19}
                />

                {/* Layer selector */}
                <LayerSelector />

                {/* Add routes */}
                <Routes />

                {/* Map event handler */}
                <MapEventHandler onZoom={setZoomLevel} />

                {/* Location control */}
                <LocationControl />
            </MapContainer>
            
            {/* Legend */}
            <div className="legend-container">
                <Legend maxAltitude={3000} />
            </div>

            {/* Theme Toggle */}
            <div className="theme-toggle-container">
                <ThemeToggle />
            </div>

            {/* Route Info Panel */}
            <RouteInfo 
                routeId={selectedRouteId}
                name={selectedRoute?.name || null}
                coordinates={selectedRoute?.coordinates || null}
                topAltitude={selectedRoute?.topAltitude || null}
            />
        </div>
    )
}
