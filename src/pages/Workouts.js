import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ 
    exercise: '', 
    reps: '', 
    sets: '', 
    weight: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/workouts');
      setWorkouts(res.data);
    } catch (err) {
      setError('Failed to fetch workouts. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/workouts/${editingId}`, form);
      } else {
        await axios.post('http://localhost:5000/workouts', form);
      }
      setForm({ 
        exercise: '', 
        reps: '', 
        sets: '', 
        weight: '', 
        date: new Date().toISOString().split('T')[0] 
      });
      setEditingId(null);
      await fetchWorkouts();
    } catch (err) {
      setError('Failed to save workout. Please try again.');
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (workout) => {
    setForm({
      exercise: workout.exercise,
      reps: workout.reps,
      sets: workout.sets,
      weight: workout.weight,
      date: workout.date.split('T')[0]
    });
    setEditingId(workout._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/workouts/${id}`);
      await fetchWorkouts();
    } catch (err) {
      setError('Failed to delete workout. Please try again.');
      console.error('Delete error:', err);
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto p-6 text-center">Loading workouts...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Workout Log</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 mb-8 bg-gray-100 p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Exercise"
          value={form.exercise}
          onChange={e => setForm({ ...form, exercise: e.target.value })}
          className="p-2 rounded border"
          required
        />
        <input
          type="number"
          placeholder="Reps"
          value={form.reps}
          onChange={e => setForm({ ...form, reps: e.target.value })}
          className="p-2 rounded border"
          min="1"
          required
        />
        <input
          type="number"
          placeholder="Sets"
          value={form.sets}
          onChange={e => setForm({ ...form, sets: e.target.value })}
          className="p-2 rounded border"
          min="1"
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })}
          className="p-2 rounded border"
          min="0"
          step="0.1"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="p-2 rounded border"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {editingId ? 'Update Workout' : 'Add Workout'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ 
                exercise: '', 
                reps: '', 
                sets: '', 
                weight: '', 
                date: new Date().toISOString().split('T')[0] 
              });
            }}
            className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div key={workout._id} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{workout.exercise}</h3>
                  <p className="text-gray-600">{workout.sets} sets x {workout.reps} reps @ {workout.weight} kg</p>
                  <p className="text-sm text-gray-500">Date: {workout.date.split('T')[0]}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
}