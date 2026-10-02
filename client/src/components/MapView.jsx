import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from 'react-leaflet';
import LocationSearch from './LocationSearch';

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    }
  });
  return null;
}

export default function MapView({ corners, setCorners }) {
  const addCorner = (latlng) => {
    setCorners([...corners, { lat: latlng.lat, lng: latlng.lng }]);
  };

  return (
    <div className="relative">
      <MapContainer center={[22.7196, 75.8577]} zoom={16} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSearch />
        <ClickHandler onMapClick={addCorner} />
        {corners.map((c, i) => (
          <Marker key={i} position={[c.lat, c.lng]} />
        ))}
        {corners.length > 2 && (
          <Polygon positions={corners.map((c) => [c.lat, c.lng])} />
        )}
      </MapContainer>
    </div>
  );
}