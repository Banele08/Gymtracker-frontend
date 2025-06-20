import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-workout.jpg';
import section1 from '../assets/section1.jpg';
import section2 from '../assets/section2.jpg';
import section3 from '../assets/section3.jpg';

export default function Home() {
  const navigate = useNavigate();

  const sections = [
    {
      image: section1,
      text: "Easily log your workouts with sets, reps, weight, and date to keep track of your training.",
    },
    {
      image: section2,
      text: "Browse a curated list of exercises for all muscle groups and training styles.",
    },
    {
      image: section3,
      text: "Visualize your progress and stay motivated with simple, effective analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-center p-6">
      <div className="max-w-4xl w-full">
        <img
          src={heroImage}
          alt="Workout hero"
          className="w-full h-72 object-cover rounded-2xl shadow-md mb-6"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to Gym Workout Tracker</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Track your gym progress with ease! Log your workouts, view a list of exercises, and get simple progress insights — all without creating an account. Click below to begin your fitness journey!
        </p>
        <div className="space-x-4 mb-12">
          <button
            onClick={() => navigate('/workouts')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow"
          >
            Log Workout
          </button>
          <button
            onClick={() => navigate('/exercises')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow"
          >
            Browse Exercises
          </button>
        </div>

        <div className="space-y-10">
          {sections.map((sec, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-xl shadow p-6">
              <img src={sec.image} alt={`Section ${index + 1}`} className="w-full sm:w-1/3 rounded-lg mb-4 sm:mb-0 sm:mr-6" />
              <div className="text-left w-full sm:w-2/3">
                <p className="text-gray-700 text-lg mb-4">{sec.text}</p>
                <button
                  onClick={() => navigate(index === 0 ? '/workouts' : '/exercises')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                  {index === 0 ? 'Start Logging' : 'Explore Exercises'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
