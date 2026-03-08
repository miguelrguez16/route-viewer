import React from 'react';
import { useFilter } from '../../context/FilterContext';
import { ElevationProfile } from '../map/ElevationProfile';
import './RouteInfo.css';

interface RouteInfoProps {
    routeId: string | null;
    name: string | null;
    coordinates: Array<{ lat: number; lng: number; alt: number }> | null;
    topAltitude: number | null;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({
    routeId,
    name,
    coordinates,
    topAltitude,
}) => {
    const { setSelectedRouteId } = useFilter();
    const [showElevation, setShowElevation] = React.useState(false);

    if (!routeId || !name || !coordinates) {
        return (
            <div className="route-info empty">
                <div className="route-info-placeholder">
                    <p>📍 Pasa el mouse sobre una ruta</p>
                </div>
            </div>
        );
    }

    const startAlt = Math.round(coordinates[0].alt);
    const endAlt = Math.round(coordinates[coordinates.length - 1].alt);
    const minAlt = Math.round(Math.min(...coordinates.map(c => c.alt)));
    const maxAlt = topAltitude ? Math.round(topAltitude) : 0;
    
    // Calculate distance in km (approximation using coordinate differences)
    const distance = coordinates.reduce((sum, coord, idx) => {
        if (idx === 0) return 0;
        const prev = coordinates[idx - 1];
        const dLat = coord.lat - prev.lat;
        const dLng = coord.lng - prev.lng;
        const kmPerDegree = 111; // Approximate
        return sum + Math.sqrt(dLat * dLat + dLng * dLng) * kmPerDegree;
    }, 0);

    const elevation = maxAlt - minAlt;

    return (
        <div className="route-info visible">
            <div className="route-info-header">
                <h3 className="route-info-title">{name}</h3>
                <button
                    className="route-info-close"
                    onClick={() => setSelectedRouteId(null)}
                    aria-label="Cerrar"
                >
                    ×
                </button>
            </div>

            <div className="route-info-content">
                {/* Tabs */}
                <div className="route-info-tabs">
                    <button 
                        className={`route-info-tab ${!showElevation ? 'active' : ''}`}
                        onClick={() => setShowElevation(false)}
                    >
                        📊 Datos
                    </button>
                    <button 
                        className={`route-info-tab ${showElevation ? 'active' : ''}`}
                        onClick={() => setShowElevation(true)}
                    >
                        📈 Elevación
                    </button>
                </div>

                {!showElevation ? (
                    <>
                        <div className="route-info-grid">
                            <div className="route-info-item">
                                <span className="route-info-label">📏 Distancia</span>
                                <span className="route-info-value">{distance.toFixed(1)} km</span>
                            </div>

                            <div className="route-info-item">
                                <span className="route-info-label">📈 Desnivel</span>
                                <span className="route-info-value">{elevation} m</span>
                            </div>

                            <div className="route-info-item">
                                <span className="route-info-label">🏔️ Altitud Máx.</span>
                                <span className="route-info-value">{maxAlt} m</span>
                            </div>

                            <div className="route-info-item">
                                <span className="route-info-label">📍 Altitud Mín.</span>
                                <span className="route-info-value">{minAlt} m</span>
                            </div>

                            <div className="route-info-item">
                                <span className="route-info-label">🚀 Inicio</span>
                                <span className="route-info-value">{startAlt} m</span>
                            </div>

                            <div className="route-info-item">
                                <span className="route-info-label">🏁 Final</span>
                                <span className="route-info-value">{endAlt} m</span>
                            </div>
                        </div>

                        <div className="route-info-stats">
                            <div className="route-info-stat">
                                <span className="route-info-stat-label">Puntos trackeados:</span>
                                <span className="route-info-stat-value">{coordinates.length}</span>
                            </div>
                            <div className="route-info-stat">
                                <span className="route-info-stat-label">Tiempo estimado:</span>
                                <span className="route-info-stat-value">~{(distance / 4).toFixed(1)}h</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <ElevationProfile 
                        coordinates={coordinates} 
                    />
                )}
            </div>

            <div className="route-info-footer">
                <button className="route-info-btn primary">📥 Descargar GPX</button>
                <button className="route-info-btn secondary">❤️ Favorita</button>
            </div>
        </div>
    );
};
