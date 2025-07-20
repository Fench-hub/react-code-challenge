import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList.jsx';
import GoalForm from './components/GoalForm.jsx';
import DepositForm from './components/DepositForm.jsx';
import Overview from './components/Overview.jsx';
import './App.css';

const App = () => {
  const [goals, setGoals] = useState([]);

  
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // new goal
  const addGoal = async (goal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...goal,
          id: String(Date.now()),
          savedAmount: 0,
          createdAt: new Date('2025-07-20').toISOString().split('T')[0],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Update a goal
  const updateGoal = async (id, updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setGoals(goals.map((goal) => (goal.id === id ? updatedData : goal)));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Make a deposit
  const makeDeposit = async (id, amount) => {
    try {
      const goal = goals.find((g) => g.id === id);
      const newSavedAmount = goal.savedAmount + parseFloat(amount);
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedGoal = await response.json();
      setGoals(goals.map((g) => (g.id === id ? updatedGoal : g)));
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm addGoal={addGoal} />
      <DepositForm goals={goals} makeDeposit={makeDeposit} />
      <GoalList goals={goals} updateGoal={updateGoal} deleteGoal={deleteGoal} />
    </div>
  );
};

export default App;