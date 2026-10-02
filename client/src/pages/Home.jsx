import { useState } from 'react';
import { MapPin, Ruler, Save, Download, RotateCcw, Calculator } from 'lucide-react';
import MapView from '../components/MapView';
import ResultCard from '../components/ResultCard';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { exportPlotPDF } from '../utils/pdfExport';

export default function Home() {
  const [corners, setCorners] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [plotName, setPlotName] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [calculating, setCalculating] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleCalculate = async () => {
    setError('');
    setSaveMessage('');
    if (corners.length < 3) {
      setError('Kam se kam 3 points mark karo plot ke corners ke liye');
      return;
    }
    setCalculating(true);
    try {
      const res = await API.post('/plots/calculate', { corners });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch galat ho gaya');
    }
    setCalculating(false);
  };

  const handleReset = () => {
    setCorners([]);
    setResult(null);
    setError('');
    setSaveMessage('');
    setPlotName('');
  };

  const handleSave = async () => {
    setSaveMessage('');
    if (!plotName.trim()) {
      setSaveMessage('Pehle plot ka naam likho');
      return;
    }
    try {
      await API.post('/plots/save', { plotName, corners });
      setSaveMessage('✓ Plot save ho gaya! "My Plots" mein dekho.');
    } catch (err) {
      setSaveMessage(err.response?.data?.error || 'Save nahi ho paaya');
    }
  };

  const handleDownloadPDF = () => {
    exportPlotPDF(plotName, result, corners);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-4 animate-pop">
            <MapPin size={16} /> GIS-powered land measurement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 animate-fade-up">
            Plot Details Calculator
          </h1>
          <p className="text-white/90 max-w-xl mx-auto animate-fade-up delay-1">
            Map pe apne plot ke corners mark karo — area, perimeter aur unit
            conversions turant paao.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 -mt-6">
        {/* Map Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-fade-up delay-1">
          <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold">
            <MapPin size={18} className="text-indigo-600" />
            Map pe click karke corners mark karo
          </div>
          <MapView corners={corners} setCorners={setCorners} />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCalculate}
              disabled={calculating}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all disabled:opacity-60"
            >
              <Calculator size={18} />
              {calculating ? 'Calculating...' : 'Calculate'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 active:scale-95 transition-all"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            {corners.length > 0 && (
              <span className="self-center text-sm text-gray-400">
                {corners.length} point{corners.length > 1 ? 's' : ''} marked
              </span>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2 animate-fade-up">
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="animate-fade-up delay-2">
            <ResultCard result={result} />
          </div>
        )}

        {/* Save / Export */}
        {result && (
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-5 mt-4 animate-fade-up delay-3">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold">
              <Save size={18} className="text-emerald-600" />
              Save or Export this Plot
            </div>
            <input
              type="text"
              placeholder="Plot ka naam likho (e.g. Farm Plot 1)"
              value={plotName}
              onChange={(e) => setPlotName(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex flex-wrap gap-3">
              {isLoggedIn ? (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  <Save size={18} />
                  Save Plot
                </button>
              ) : (
                <p className="text-sm text-gray-500 self-center bg-gray-50 px-3 py-2 rounded-lg">
                  Plot save karne ke liye login karo
                </p>
              )}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
            {saveMessage && (
              <p className="text-sm mt-3 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                {saveMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}