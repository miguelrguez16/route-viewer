import React, { useCallback } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import './LocationControl.css';

export const LocationControl: React.FC = () => {
    const map = useMap();

    const handleLocate = useCallback(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                
                // Center map on user location
                map.setView([latitude, longitude], 15);

                // Add marker at user location
                L.circleMarker([latitude, longitude], {
                    radius: 6,
                    fillColor: '#0ea5e9',
                    color: '#ffffff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                })
                    .bindPopup('📍 Your location')
                    .addTo(map);
            },
            () => {
                // Error handling
            }
        );
    }, [map]);

    React.useEffect(() => {
        // Create custom control
        const LocateControl = L.Control.extend({
            options: {
                position: 'topright'
            },
            onAdd() {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control location-control');
                const button = L.DomUtil.create('button', 'location-btn', container);
                button.innerHTML = '📍';
                button.title = 'My location';
                button.setAttribute('aria-label', 'My location');

                L.DomEvent.on(button, 'click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    handleLocate();
                });

                return container;
            }
        });

        const control = new LocateControl();
        control.addTo(map);

        return () => {
            control.remove();
        };
    }, [map, handleLocate]);

    return null;
};
