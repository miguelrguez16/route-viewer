import React from 'react';
import './Legend.css';

interface LegendProps {
    maxAltitude?: number;
}

export const Legend: React.FC<LegendProps> = ({ maxAltitude = 3000 }) => {
    const getColorByAltitude = (alt: number) => {
        const ratio = alt / maxAltitude;
        const hue = (1 - ratio) * 120; // Green to red: 120° to 0°
        return `hsl(${hue}, 100%, 50%)`;
    };

    const altitudeStops = [0, 750, 1500, 2250, maxAltitude];

    return (
        <div className="legend">
            <div className="legend-title">Leyenda</div>
            
            <div className="legend-section">
                <div className="legend-item-title">Altitud (m)</div>
                <div className="altitude-gradient">
                    {altitudeStops.map((alt, idx) => (
                        <div key={idx} className="altitude-stop">
                            <div
                                className="altitude-color"
                                style={{
                                    backgroundColor: getColorByAltitude(alt),
                                    width: `${100 / (altitudeStops.length - 1)}%`,
                                }}
                            />
                            <span className="altitude-label">{alt.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="legend-section mt-3">
                <div className="legend-item-title">Interacción</div>
                <div className="legend-item">
                    <div className="line-sample default-line" />
                    <span>Ruta normal</span>
                </div>
                <div className="legend-item">
                    <div className="line-sample hover-line" />
                    <span>Ruta al pasar</span>
                </div>
                <div className="legend-item">
                    <div className="marker-sample">📍</div>
                    <span>Inicio / Pico</span>
                </div>
            </div>

            <div className="legend-section mt-3">
                <div className="legend-item-title">Opciones</div>
                <div className="legend-item">
                    <input 
                        type="checkbox" 
                        id="show-elevation" 
                        defaultChecked 
                        className="legend-checkbox"
                    />
                    <label htmlFor="show-elevation">Mostrar altitud</label>
                </div>
                <div className="legend-item">
                    <input 
                        type="checkbox" 
                        id="show-markers" 
                        defaultChecked 
                        className="legend-checkbox"
                    />
                    <label htmlFor="show-markers">Mostrar marcadores</label>
                </div>
            </div>
        </div>
    );
};
