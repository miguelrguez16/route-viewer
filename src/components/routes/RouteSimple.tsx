import { Marker, Polyline, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import Waypoint from "./waypoint.svg";
import React, { useMemo } from "react";
import { useFilter } from '../../context/FilterContext';
import './RouteSimple.css';

interface Props {
    name: string;
    coordinates: {
        lat: number;
        lng: number;
        alt: number;
    }[];
    topAltitude: number;
    routeId?: string;
}

const getColorByAltitude = (altitude: number, maxAltitude: number): string => {
    const ratio = altitude / maxAltitude;
    const hue = (1 - ratio) * 120; // Green (120°) to Red (0°)
    return `hsl(${hue}, 100%, 50%)`;
};

export const RouteSimple: React.FC<Props> = ({
    name,
    coordinates,
    topAltitude,
    routeId,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const { zoomLevel, selectedRouteId, setSelectedRouteId } = useFilter();
    const isSelected = routeId === selectedRouteId;

    const waypointIcon = useMemo(() => {
        const value = new Number(25 * zoomLevel / 20).valueOf();
        return L.icon({
            iconUrl: Waypoint,
            iconSize: [value, value],
            className: 'waypoint-marker'
        });
    }, [zoomLevel]);

    // Calculate average color based on altitudes
    const baseColor = useMemo(() => {
        const avgAlt = coordinates.reduce((sum, c) => sum + c.alt, 0) / coordinates.length;
        return getColorByAltitude(avgAlt, topAltitude);
    }, [coordinates, topAltitude]);

    // Determine polyline styling based on state
    const pathOptions = useMemo(() => {
        const baseWeight = isSelected ? 4 : isHovered ? 3 : 2;
        const baseOpacity = isSelected ? 0.9 : isHovered ? 0.85 : 0.7;
        
        return {
            color: baseColor,
            weight: baseWeight,
            opacity: baseOpacity,
            lineCap: 'round' as const,
            lineJoin: 'round' as const,
        };
    }, [baseColor, isHovered, isSelected]);

    return (
        <>
            {isHovered && (
                <Tooltip sticky className="route-tooltip hover">
                    <div className="tooltip-content">
                        <strong>{name}</strong>
                        <span>🏔️ {topAltitude}m</span>
                    </div>
                </Tooltip>
            )}
            {(isHovered || isSelected) && (
                <>
                    <Marker position={coordinates[0]} icon={waypointIcon}>
                        <Popup className="route-popup">
                            <div>
                                <strong>{name}</strong>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                    📍 Inicio: {Math.round(coordinates[0].alt)}m
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker
                        position={
                            coordinates.find((coord) => coord.alt === topAltitude) ??
                            coordinates[0]
                        }
                        icon={waypointIcon}
                    >
                        <Popup className="route-popup">
                            <div>
                                <strong>Pico Máximo</strong>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                    🏔️ Altitud: {topAltitude}m
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                </>
            )}
            {isSelected && (
                <Tooltip sticky className="route-tooltip selected">
                    <div className="tooltip-content">
                        <strong>{name}</strong> ✓
                    </div>
                </Tooltip>
            )}
            <Polyline
                pathOptions={pathOptions}
                positions={coordinates}
                interactive={true}
                eventHandlers={{
                    mouseover: (e) => {
                        setIsHovered(true);
                        e.target.bringToFront();
                    },
                    mouseout: () => {
                        setIsHovered(false);
                    },
                    click: () => {
                        if (routeId) {
                            setSelectedRouteId(routeId);
                        }
                    }
                }}
            />
        </>
    );
};
