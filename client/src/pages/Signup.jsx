import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/signup', { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup fail ho gaya');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
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
        {success && <p className="text-green-600 text-sm">Account ban gaya! Login page pe ja rahe hain...</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Signup
        </button>
      </form>
      <p className="text-sm mt-3 text-center">
        Account hai?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Login karo
        </Link>
      </p>
    </div>
  );
}
