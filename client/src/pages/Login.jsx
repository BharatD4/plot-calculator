import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.token, res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login fail ho gaya');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="text-sm mt-3 text-center">
        Account nahi hai?{' '}
        <Link to="/signup" className="text-blue-600 underline">
          Signup karo
        </Link>
      </p>
    </div>
  );
}
