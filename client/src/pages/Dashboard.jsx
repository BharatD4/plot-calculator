import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const { isLoggedIn } = useAuth();

  const fetchPlots = async () => {
    setLoading(true);
    try {
      const res = await API.get('/plots/my-plots');
      setPlots(res.data);
    } catch (err) {
      setError('Plots load nahi ho paaye');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) fetchPlots();
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if (!confirm('Is plot ko permanently delete karna hai?')) return;
    setDeletingId(id);
    try {
      await API.delete(`/plots/${id}`);
      setPlots(plots.filter((p) => p._id !== id));
    } catch (err) {
      setError('Delete nahi ho paaya');
    }
    setDeletingId(null);
  };

  const filteredPlots = plots.filter((p) =>
    p.plotName.toLowerCase().includes(search.toLowerCase())
  );

  const totalArea = plots.reduce((sum, p) => sum + p.areaSqMeters, 0);
  const totalPerimeter = plots.reduce((sum, p) => sum + p.perimeterMeters, 0);

  const formatArea = (sqm) => {
    if (sqm >= 10000) return `${(sqm / 10000).toFixed(2)} hectares`;
    return `${sqm.toFixed(0)} sq m`;
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow text-center">
        <div className="text-4xl mb-3">🔒</div>
        <h2 className="text-lg font-semibold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-4 text-sm">
          Apne saved plots dekhne ke liye pehle login karo.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Login karo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Plots</h1>
          <p className="text-sm text-gray-500">Apne saare saved plots yahan manage karo</p>
        </div>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm"
        >
          + New Plot
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Plots</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{plots.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Area</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatArea(totalArea)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Perimeter</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{(totalPerimeter / 1000).toFixed(2)} km</p>
        </div>
      </div>

      {/* Search */}
      {plots.length > 0 && (
        <input
          type="text"
          placeholder="Plot name se search karo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-400">Loading plots...</div>
      )}

      {/* Empty state */}
      {!loading && plots.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="font-semibold text-gray-700 mb-1">Abhi koi plot save nahi kiya hai</h3>
          <p className="text-sm text-gray-500 mb-4">
            Map pe plot mark karke ise apne account mein save karo.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Pehla Plot Banao
          </Link>
        </div>
      )}

      {/* No search results */}
      {!loading && plots.length > 0 && filteredPlots.length === 0 && (
        <p className="text-center text-gray-400 py-10 text-sm">
          "{search}" se koi plot nahi mila.
        </p>
      )}

      {/* Plot Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPlots.map((plot) => (
          <div
            key={plot._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-gray-800 text-lg">{plot.plotName}</h2>
              <button
                onClick={() => handleDelete(plot._id)}
                disabled={deletingId === plot._id}
                className="text-red-500 hover:bg-red-50 rounded-lg p-1.5 transition-colors disabled:opacity-50"
                title="Delete plot"
              >
                {deletingId === plot._id ? '...' : '🗑️'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs text-gray-500">Area</p>
                <p className="font-semibold text-gray-700 text-sm">{formatArea(plot.areaSqMeters)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs text-gray-500">Perimeter</p>
                <p className="font-semibold text-gray-700 text-sm">{plot.perimeterMeters.toFixed(0)} m</p>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Saved on {new Date(plot.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}