import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get('http://localhost:5000/exercises');
        setExercises(res.data);
      } catch (err) {
        setError('Failed to fetch exercises. Please try again later.');
        console.error('Error fetching exercises:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading exercises...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Exercises</h2>
      <ul className="space-y-4">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li key={exercise._id || exercise.name} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">{exercise.name}</h3>
              <p className="text-gray-600">Target: {exercise.targetMuscle}</p>
              <p className="text-gray-500 text-sm">Equipment: {exercise.equipment}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No exercises found.</p>
        )}
      </ul>
    </div>
  );
}