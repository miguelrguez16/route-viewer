 import { Polyline } from 'react-leaflet';
import RoutesFile from './routes.json'

export const Routes = () => {

    const routes = RoutesFile.routes;
    console.log(routes);
    return (
        <>
            {routes.map((route) => (
                 <Polyline
                      key={route.name}
                      pathOptions={{ fillColor: 'red', color: 'blue' }}
                      positions={route.coordinates}
                    />
            ))}
        </>
    )
}