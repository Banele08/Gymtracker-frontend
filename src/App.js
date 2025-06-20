import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Workouts from '../src/pages/Workouts';
import Exercises from '../src/pages/Exercises';
import Progress from '../src/pages/Progress';
import './App.css';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  );
}

export default App;