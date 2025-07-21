import { useState } from 'react';

const GoalItem = ({ goal, updateGoal, deleteGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  const getStatus = () => {
    if (goal.savedAmount >= goal.targetAmount) return 'completed';
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 30) return 'warning';
    return '';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateGoal(goal.id, {
      name: editData.name,
      targetAmount: parseFloat(editData.targetAmount),
      category: editData.category,
      deadline: editData.deadline,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteGoal(goal.id);
  };

  const progress = (goal.savedAmount / goal.targetAmount) * 100;

  return (
    <div className={`goal-item ${getStatus()}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            aria-label="Goal Name"
          />
          <input
            type="number"
            value={editData.targetAmount}
            onChange={(e) => setEditData({ ...editData, targetAmount: e.target.value })}
            aria-label="Target Amount"
          />
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
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
            value={editData.deadline}
            onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
            aria-label="Deadline"
          />
          <button onClick={handleSave} aria-label="Save Goal">Save</button>
          <button onClick={() => setIsEditing(false)} aria-label="Cancel Edit">Cancel</button>
        </>
      ) : (
        <>
          <div>
            <p>
              {goal.name}: ${goal.savedAmount}/${goal.targetAmount} ({goal.category}, Due: {goal.deadline})
            </p>
            <p>Remaining: ${(goal.targetAmount - goal.savedAmount).toFixed(2)}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div>
            <button className="edit" onClick={handleEdit} aria-label="Edit Goal">Edit</button>
            <button className="delete" onClick={handleDelete} aria-label="Delete Goal">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalItem;