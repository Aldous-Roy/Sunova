import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Typography, Chip } from '@mui/material';

// Fix for default Leaflet icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const hostIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const carIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapComponent = ({ hosts, userLocation, onHostClick }) => {
    return (
        <MapContainer 
            center={userLocation} 
            zoom={14} 
            style={{ height: '100%', width: '100%', borderRadius: '20px', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* User Location */}
            <Marker position={userLocation} icon={carIcon}>
                <Popup>
                    <Typography variant="subtitle2" fontWeight="bold">You (EV)</Typography>
                    <Typography variant="caption">Battery: 32%</Typography>
                </Popup>
            </Marker>
            <Circle 
                center={userLocation}
                radius={800}
                pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1 }}
            />

            {/* Hosts */}
            {hosts.map(host => (
                <Marker 
                    key={host.id} 
                    position={host.coords} 
                    icon={hostIcon}
                    eventHandlers={{
                        click: () => onHostClick && onHostClick(host),
                    }}
                >
                    <Popup>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight="bold">{host.name}</Typography>
                            <Chip 
                                label={`${host.availableKw} kW`} 
                                size="small" 
                                color={host.availableKw > 0 ? "success" : "default"} 
                                sx={{ my: 0.5, fontSize: '0.7rem', height: 20 }}
                            />
                            <Typography variant="caption" display="block">₹14/unit</Typography>
                        </Box>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
