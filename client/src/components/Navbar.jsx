import { Link, useNavigate } from 'react-router-dom';
import { MapPinned, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, name, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-800">
          <MapPinned size={22} className="text-indigo-600" />
          Plot Calculator
        </Link>
        <div className="flex gap-4 items-center text-sm">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">My Plots</Link>
              <span className="text-gray-400 hidden sm:inline">Hi, {name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}