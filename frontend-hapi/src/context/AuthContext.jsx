// frontend-hapi > src > context > AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Gunakan kunci 'user' yang konsisten
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Pastikan token bersih dari whitespace jika disimpan di localStorage
        if (parsedUser.token) {
          parsedUser.token = parsedUser.token.trim();
        }
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user data from localStorage in AuthContext:", e);
        localStorage.removeItem('user'); // Hapus data yang rusak
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Gunakan kunci 'user' yang konsisten
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Gunakan kunci 'user' yang konsisten
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};