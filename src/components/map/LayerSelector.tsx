import { useMemo } from 'react';
import { LayersControl, TileLayer } from 'react-leaflet';
import './LayerSelector.css';

export const LayerSelector = () => {
    // Using Leaflet providers URLs
    const layers = useMemo(() => ({
        osm: {
            name: 'OpenStreetMap',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            icon: '🗺️'
        },
        satellite: {
            name: 'Satélite',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
            icon: '🛰️'
        },
        terrain: {
            name: 'Terreno',
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
            icon: '🏔️'
        },
        dark: {
            name: 'Oscuro',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            icon: '🌙'
        },
        light: {
            name: 'Claro',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            icon: '☀️'
        }
    }), []);

    return (
        <LayersControl position="topright">
            {Object.entries(layers).map(([key, layer], index) => (
                <LayersControl.BaseLayer
                    key={key}
                    checked={index === 0}
                    name={`${layer.icon} ${layer.name}`}
                >
                    <TileLayer
                        url={layer.url}
                        attribution={layer.attribution}
                        maxZoom={19}
                        minZoom={1}
                        noWrap={true}
                        detectRetina={true}
                        maxNativeZoom={19}
                    />
                </LayersControl.BaseLayer>
            ))}
        </LayersControl>
    );
};
