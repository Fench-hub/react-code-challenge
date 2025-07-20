import React, { useState } from 'react';

const GoalItem = ({ goal, updateGoal, deleteGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const today = new Date('2025-07-20');
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && remaining > 0;
  const isWarning = daysLeft <= 30 && daysLeft >= 0 && remaining > 0;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateGoal(goal.id, {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      category: formData.category,
      deadline: formData.deadline,
    });
    setIsEditing(false);
  };

  return (
    <div className="goal-item">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: ${goal.targetAmount.toFixed(2)}</p>
          <p>Saved: ${goal.savedAmount.toFixed(2)}</p>
          <p>Remaining: ${remaining.toFixed(2)}</p>
          <p>Deadline: {goal.deadline}</p>
          {goal.savedAmount >= goal.targetAmount ? (
            <p style={{ color: '#28a745', fontWeight: 'bold' }}>Completed!</p>
          ) : (
            <>
              {isOverdue && <p className="overdue">Overdue!</p>}
              {isWarning && <p className="warning">Less than 30 days left!</p>}
            </>
          )}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteGoal(goal.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default GoalItem;