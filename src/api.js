import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Exercises
export const getExercises = async () => {
  const res = await axios.get(`${API_BASE_URL}/exercises`);
  return res.data;
};

// Workouts
export const getWorkouts = async () => {
  const res = await axios.get(`${API_BASE_URL}/workouts`);
  return res.data;
};

export const addWorkout = async (workout) => {
  const res = await axios.post(`${API_BASE_URL}/workouts`, workout);
  return res.data;
};

export const updateWorkout = async (id, workout) => {
  const res = await axios.put(`${API_BASE_URL}/workouts/${id}`, workout);
  return res.data;
};

export const deleteWorkout = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/workouts/${id}`);
  return res.data;
};
