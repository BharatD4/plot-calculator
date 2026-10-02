import { Ruler, Maximize } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const units = [
    { label: 'Square Feet', value: result.units.sqFeet },
    { label: 'Square Yards (Gaj)', value: result.units.sqYards },
    { label: 'Acres', value: result.units.acres },
    { label: 'Hectares', value: result.units.hectares }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-5 mt-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Plot Details</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Maximize size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Area</span>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {result.areaSqMeters.toFixed(2)} <span className="text-sm font-normal text-gray-500">sq m</span>
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Ruler size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Perimeter</span>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {result.perimeterMeters.toFixed(2)} <span className="text-sm font-normal text-gray-500">m</span>
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
        Unit Conversions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.label} className="bg-gray-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-gray-500">{u.label}</p>
            <p className="font-semibold text-gray-800 text-sm">{u.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}