import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Gym Workout Tracker. All rights reserved.</p>
    </footer>
  );
}