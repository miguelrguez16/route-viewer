import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ElevationProfile.css';

interface ElevationProfileProps {
    coordinates: Array<{ lat: number; lng: number; alt: number }>;
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({ coordinates }) => {
    const data = useMemo(() => {
        if (!coordinates || coordinates.length === 0) return [];

        let cumulativeDistance = 0;
        return coordinates.map((coord, idx) => {
            if (idx > 0) {
                const prev = coordinates[idx - 1];
                const dLat = coord.lat - prev.lat;
                const dLng = coord.lng - prev.lng;
                const kmPerDegree = 111;
                const segmentDistance = Math.sqrt(dLat * dLat + dLng * dLng) * kmPerDegree;
                cumulativeDistance += segmentDistance;
            }

            return {
                distance: Number(cumulativeDistance.toFixed(2)),
                altitude: Math.round(coord.alt),
                // For custom shapes/colors
                actualAltitude: coord.alt
            };
        });
    }, [coordinates]);

    const stats = useMemo(() => {
        if (data.length === 0) return null;

        const altitudes = data.map(d => d.altitude);
        const minAlt = Math.min(...altitudes);
        const maxAlt = Math.max(...altitudes);
        const totalDistance = data[data.length - 1].distance;

        return {
            minAlt,
            maxAlt,
            totalDistance,
            elevation: maxAlt - minAlt
        };
    }, [data]);

    if (data.length === 0 || !stats) {
        return <div className="elevation-profile empty">Sin datos de elevación</div>;
    }

    return (
        <div className="elevation-profile">
            <div className="elevation-header">
                <h4 className="elevation-title">Perfil de Elevación</h4>
                <div className="elevation-stats">
                    <div className="elevation-stat">
                        <span className="stat-label">📏 Distancia</span>
                        <span className="stat-value">{stats.totalDistance.toFixed(1)} km</span>
                    </div>
                    <div className="elevation-stat">
                        <span className="stat-label">📈 Desnivel</span>
                        <span className="stat-value">{stats.elevation} m</span>
                    </div>
                </div>
            </div>

            <div className="elevation-chart-container">
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="var(--border-color)" 
                            opacity={0.5}
                        />
                        <XAxis 
                            dataKey="distance" 
                            label={{ value: 'Distancia (km)', position: 'insideBottomRight', offset: -5 }}
                            tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                        />
                        <YAxis 
                            label={{ value: 'Altitud (m)', angle: -90, position: 'insideLeft', offset: 10 }}
                            tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                color: 'var(--text-primary)',
                                fontSize: '12px'
                            }}
                            formatter={(value) => [`${value} m alt`, 'Altitud']}
                            labelFormatter={(value) => `${value} km`}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="altitude" 
                            stroke="var(--primary-color, #007bff)"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="elevation-details">
                <div className="elevation-detail-item">
                    <span className="detail-label">🏔️ Máximo</span>
                    <span className="detail-value">{stats.maxAlt} m</span>
                </div>
                <div className="elevation-detail-item">
                    <span className="detail-label">📍 Mínimo</span>
                    <span className="detail-value">{stats.minAlt} m</span>
                </div>
                <div className="elevation-detail-item">
                    <span className="detail-label">📏 Total</span>
                    <span className="detail-value">{stats.totalDistance.toFixed(1)} km</span>
                </div>
            </div>
        </div>
    );
};
