import { useState, useEffect } from 'react';
import GoalList from './components/GoalList.jsx';
import GoalForm from './components/GoalForm.jsx';
import DepositForm from './components/DepositForm.jsx';
import Overview from './components/Overview.jsx';
import './App.css';

const App = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('https://react-code-challen.vercel.app/goals', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setGoals(Array.isArray(data) ? data : data.goals || []);
      setError('');
    } catch (error) {
      console.error('Error fetching goals:', error.message);
      setError('Failed to load goals. Please ensure json-server is running.');
    }
  };

  const addGoal = async (goal) => {
    try {
      const response = await fetch('https://react-code-challen.vercel.app/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...goal,
          id: String(Date.now()),
          savedAmount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
    } catch (error) {
      console.error('Error adding goal:', error);
      setError('Failed to add goal. Please try again.');
    }
  };

  const updateGoal = async (id, updatedGoal) => {
    try {
      const response = await fetch(`https://react-code-challen.vercel.app/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedData = await response.json();
      setGoals(goals.map((goal) => (goal.id === id ? updatedData : goal)));
    } catch (error) {
      console.error('Error updating goal:', error);
      setError('Failed to update goal. Please try again.');
    }
  };

  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`https://react-code-challen.vercel.app/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
      setError('Failed to delete goal. Please try again.');
    }
  };

  const makeDeposit = async (id, amount, callback) => {
    try {
      const goal = goals.find((g) => g.id === id);
      if (!goal) throw new Error('Goal not found');
      const newSavedAmount = goal.savedAmount + parseFloat(amount);
      const response = await fetch(`https://react-code-challen.vercel.app/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedGoal = await response.json();
      setGoals(goals.map((g) => (g.id === id ? updatedGoal : g)));
      callback(null);
    } catch (error) {
      console.error('Error making deposit:', error);
      callback(error);
    }
  };

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      {error && <p className="error">{error}</p>}
      <Overview goals={goals} />
      <GoalForm addGoal={addGoal} />
      <DepositForm goals={goals} makeDeposit={makeDeposit} />
      <GoalList goals={goals} updateGoal={updateGoal} deleteGoal={deleteGoal} />
    </div>
  );
};

export default App;