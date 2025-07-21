import { useState } from 'react';

const GoalForm = ({ addGoal }) => {
  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalData.name || !goalData.targetAmount || !goalData.deadline) {
      setError('Please fill in all fields');
      return;
    }
    if (parseFloat(goalData.targetAmount) <= 0) {
      setError('Target amount must be greater than 0');
      return;
    }
    addGoal(goalData);
    setGoalData({ name: '', targetAmount: '', category: 'Travel', deadline: '' });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Goal Name"
        value={goalData.name}
        onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
        aria-label="Goal Name"
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={goalData.targetAmount}
        onChange={(e) => setGoalData({ ...goalData, targetAmount: e.target.value })}
        aria-label="Target Amount"
      />
      <select
        value={goalData.category}
        onChange={(e) => setGoalData({ ...goalData, category: e.target.value })}
        aria-label="Category"
      >
        <option value="Travel">Travel</option>
        <option value="Emergency">Emergency</option>
        <option value="Electronics">Electronics</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Education">Education</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        value={goalData.deadline}
        onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
        aria-label="Deadline"
      />
      <button type="submit" aria-label="Add Goal">Add Goal</button>
    </form>
  );
};

export default GoalForm;