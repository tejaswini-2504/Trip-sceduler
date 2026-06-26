import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
});

const MapComponent = ({ places = [] }) => {
  const center = places.length ? [places[0].coordinates.lat, places[0].coordinates.lng] : [12.9716, 77.5946];
  const polyline = places.map((place) => [place.coordinates.lat, place.coordinates.lng]);

  return (
    <div className="h-[420px] rounded-3xl border border-slate-800 bg-slate-900/80 p-2 shadow-lg shadow-slate-900/20">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-full w-full rounded-3xl">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker key={place.id} position={[place.coordinates.lat, place.coordinates.lng]} icon={markerIcon}>
            <Popup>
              <strong>{place.name}</strong>
              <div>{place.description}</div>
            </Popup>
          </Marker>
        ))}
        {polyline.length > 1 && <Polyline pathOptions={{ color: '#22d3ee' }} positions={polyline} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
