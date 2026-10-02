import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [name, setName] = useState(localStorage.getItem('name'));

  const login = (newToken, newName) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('name', newName);
    setToken(newToken);
    setName(newName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ token, name, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
