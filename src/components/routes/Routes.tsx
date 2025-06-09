import { Marker, Polyline, Popup } from 'react-leaflet';
import RoutesFile from './routes.json'
import Waypoint from './waypoint.svg'
import L from 'leaflet';
import { useFilter } from '../../context/FilterContext';

const waypointIcon = L.icon({
    iconUrl: Waypoint,
    iconSize: [25, 25]
});

export const Routes = () => {
    const { filter: routeToFilter } = useFilter();

    const routes = RoutesFile.routes;
    return (
        <>
            {routes.filter(r => r.name.includes(routeToFilter)).map((route) => (
                <>
                    <Marker position={route.coordinates[0]} icon={waypointIcon}>
                        <Popup>
                            {route.name}
                        </Popup>
                    </Marker>
                    <Polyline
                        pathOptions={{ fillColor: 'red', color: 'blue' }}
                        positions={route.coordinates}
                        interactive={true}
                        eventHandlers={{
                            mouseout: (e) => {
                                e.target.setStyle({ color: 'blue' });
                            }
                            , mouseover: (e) => {
                                e.target.setStyle({ color: 'orange' });
                            }
                        }}
                    />
                    <Marker position={route.coordinates.find(coord => coord.alt === route.topAltitude) ?? route.coordinates[0]} icon={waypointIcon}>
                        <Popup>
                            {"Top Altitude: " + route.topAltitude}
                        </Popup>
                    </Marker>
                </>
            ))}
        </>
    )
}