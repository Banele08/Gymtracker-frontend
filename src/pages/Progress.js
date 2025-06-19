import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Progress() {
  const [progressData, setProgressData] = useState({
    exercisesDone: [],
    totalReps: 0,
    totalSets: 0,
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/workouts');
        calculateProgress(res.data);
      } catch (err) {
        setError('Failed to fetch workout data.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const calculateProgress = (data) => {
    let totalReps = 0;
    let totalSets = 0;
    const exerciseNames = new Set();
    const categories = new Set();

    data.forEach(entry => {
      totalReps += parseInt(entry.reps || 0, 10);
      totalSets += parseInt(entry.sets || 0, 10);
      if (entry.exercise) exerciseNames.add(entry.exercise);
      if (entry.category) categories.add(entry.category);
    });

    setProgressData({
      exercisesDone: Array.from(exerciseNames),
      totalReps,
      totalSets,
      categories: Array.from(categories)
    });
  };

  if (loading) return <div className="p-8 text-center">Loading progress data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Progress Tracker</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <p className="mb-2"><strong>Total Reps:</strong> {progressData.totalReps}</p>
        <p className="mb-2"><strong>Total Sets:</strong> {progressData.totalSets}</p>
        <p><strong>Categories:</strong> {progressData.categories.length > 0 ? progressData.categories.join(', ') : 'None'}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Exercises Done</h3>
        {progressData.exercisesDone.length > 0 ? (
          <ul className="list-disc pl-5">
            {progressData.exercisesDone.map((exercise, idx) => (
              <li key={idx} className="mb-1">{exercise}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No exercises logged yet.</p>
        )}
      </div>
    </div>
  );
}