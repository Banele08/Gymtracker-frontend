import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

const submitWorkout = async () => 
  await axios.post(`${api}/workouts`, {
    exercise: 'Push Ups',
    reps: 15,
    sets: 3,
    weight: 0,
    date: new Date(),
    category: 'Upper Body'
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  const newWorkout = {
    exercise: "Push-ups",
    reps: 10,
    sets: 3,
    weight: 0,
    date: "2025-05-22",
    category: "Upper Body"
  };

  await axios.post('http://localhost:5000/workouts', newWorkout);
};