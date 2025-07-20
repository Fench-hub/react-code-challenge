import React, { useState } from 'react';

const GoalForm = ({ addGoal }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.targetAmount <= 0) {
      alert('Target amount must be greater than 0');
      return;
    }
    addGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      category: formData.category,
      deadline: formData.deadline,
    });
    setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' });
  };

  return (
    <div>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          required
          min="1"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
        </select>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;