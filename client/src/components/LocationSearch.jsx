import { useState } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const map = useMap();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed', err);
    }
    setLoading(false);
  };

  const goToLocation = (lat, lon) => {
    map.setView([parseFloat(lat), parseFloat(lon)], 18);
    setResults([]);
    setQuery('');
  };

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] w-11/12 max-w-md">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Village, town ya jagah ka naam search karo..."
          className="flex-1 px-3 py-2 rounded shadow border text-sm bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded shadow text-sm"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>
      {results.length > 0 && (
        <div className="bg-white rounded shadow mt-1 max-h-48 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => goToLocation(r.lat, r.lon)}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b last:border-b-0"
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}