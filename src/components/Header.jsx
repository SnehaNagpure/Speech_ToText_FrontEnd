// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    navigate('/signin');
  };

  if (!user) return null;

  return (
  <header className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">🎙️ Transform Your Voice Into Perfect Text</h1>
    <div className="flex items-center gap-4">
      <span className="text-sm hidden sm:block">Hi, {user.name}</span>
      <button
        onClick={handleLogout}
        className="bg-white text-gray-900 px-4 py-1 rounded hover:bg-gray-200 text-sm transition"
      >
        Sign Out
      </button>
    </div>
  </header>
);

}
