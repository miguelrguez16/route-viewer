import { Marker, Polyline, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import Waypoint from "./waypoint.svg";
import React, { useMemo } from "react";
import { useFilter } from '../../context/FilterContext';

interface Props {
    name: string;
    coordinates: {
        lat: number;
        lng: number;
        alt: number;
    }[];
    topAltitude: number;
}



export const RouteSimple: React.FC<Props> = ({
    name,
    coordinates,
    topAltitude,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const { zoomLevel } = useFilter();


    const waypointIcon = useMemo(() => {
        const value = new Number(25 * zoomLevel / 20).valueOf();
         return L.icon({
            iconUrl: Waypoint,
            iconSize: [value, value]
        });
    }, [zoomLevel]);


    return (
        <>
            {isHovered && (
                <>
                    <Marker position={coordinates[0]} icon={waypointIcon}>
                        <Popup>{name}</Popup>
                    </Marker> <Marker
                        position={
                            coordinates.find((coord) => coord.alt === topAltitude) ??
                            coordinates[0]
                        }
                        icon={waypointIcon}
                    >
                        <Popup>{"Top Altitude: " + topAltitude}</Popup>
                    </Marker>
                    <Tooltip sticky>{name}</Tooltip>
                </>
            )}
            <Polyline
                pathOptions={{ fillColor: "red", color: "blue" }}
                positions={coordinates}
                interactive={true}
                eventHandlers={{
                    mouseover: () => {
                        setIsHovered(true);
                    },
                    mouseout: () => {
                        setIsHovered(false);
                    },
                }}
            >
                <Tooltip sticky>{name}</Tooltip><Marker
                    position={
                        coordinates.find((coord) => coord.alt === topAltitude) ??
                        coordinates[0]
                    }
                    icon={waypointIcon}
                >
                    <Popup>{"Top Altitude: " + topAltitude}</Popup>
                </Marker>
            </Polyline>

        </>
    );
};
