import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navStyle = "text-white px-4 py-2 rounded hover:bg-blue-700";
  const activeStyle = "bg-blue-700";

  return (
    <nav className="bg-blue-600 shadow-md p-4 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">🏋️‍♂️ Gym Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className={`${navStyle} ${location.pathname === '/' ? activeStyle : ''}`}>Home</Link>
          <Link to="/exercises" className={`${navStyle} ${location.pathname === '/exercises' ? activeStyle : ''}`}>Exercises</Link>
          <Link to="/workouts" className={`${navStyle} ${location.pathname === '/workouts' ? activeStyle : ''}`}>Workouts</Link>
        </div>
      </div>
    </nav>
  );
}