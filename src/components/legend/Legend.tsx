import React, { useState } from 'react';
import './Legend.css';

interface LegendProps {
    maxAltitude?: number;
}

export const Legend: React.FC<LegendProps> = ({ maxAltitude = 3000 }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const getColorByAltitude = (alt: number) => {
        const ratio = alt / maxAltitude;
        const hue = (1 - ratio) * 120; // Green to red: 120° to 0°
        return `hsl(${hue}, 100%, 50%)`;
    };

    const altitudeStops = [0, 750, 1500, 2250, maxAltitude];

    return (
        <div className="legend">
            <div className="legend-title">
                <span>Legend</span>
                <button 
                    className="legend-toggle-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? 'Collapse' : 'Expand'}
                    aria-label="Toggle legend"
                >
                    {isExpanded ? '−' : '+'}
                </button>
            </div>
            
            {isExpanded && (
                <div className="legend-content">
                    <div className="legend-section">
                        <div className="legend-item-title">Altitude (m)</div>
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
                        <div className="legend-item-title">Interaction</div>
                        <div className="legend-item">
                            <div className="line-sample default-line" />
                            <span>Normal route</span>
                        </div>
                        <div className="legend-item">
                            <div className="line-sample hover-line" />
                            <span>Route on hover</span>
                        </div>
                        <div className="legend-item">
                            <div className="marker-sample">📍</div>
                            <span>Start / Peak</span>
                        </div>
                    </div>

                    <div className="legend-section mt-3">
                        <div className="legend-item-title">Options</div>
                        <div className="legend-item">
                            <input 
                                type="checkbox" 
                                id="show-elevation" 
                                defaultChecked 
                                className="legend-checkbox"
                            />
                            <label htmlFor="show-elevation">Show altitude</label>
                        </div>
                        <div className="legend-item">
                            <input 
                                type="checkbox" 
                                id="show-markers" 
                                defaultChecked 
                                className="legend-checkbox"
                            />
                            <label htmlFor="show-markers">Show markers</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
