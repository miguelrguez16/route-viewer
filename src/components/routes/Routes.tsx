import RoutesFile from "./routes.json";
import { useFilter } from "../../context/FilterContext";
import { RouteSimple } from './RouteSimple';



export const Routes = () => {
    const { routeNameFilter } = useFilter();

    const routes = RoutesFile.routes;
    return (
        <>
            {routes
                .filter((r) => r.name.includes(routeNameFilter))
                .map((route) => (
                    <RouteSimple name={route.name} coordinates={route.coordinates} topAltitude={route.topAltitude} />
                ))}
        </>
    );
};
