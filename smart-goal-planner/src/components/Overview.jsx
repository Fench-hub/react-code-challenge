import React from 'react';

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;
  const today = new Date('2025-07-20'); // Current date as specified

  const getDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Saved:</strong> ${totalSaved.toFixed(2)}</p>
      <p><strong>Completed Goals:</strong> {completedGoals}</p>
      <h3>Goal Deadlines</h3>
      {goals.length === 0 ? (
        <p>No goals to display.</p>
      ) : (
        <ul>
          {goals.map((goal) => {
            const daysLeft = getDaysLeft(goal.deadline);
            const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
            const isWarning = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
            return (
              <li key={goal.id}>
                <strong>{goal.name}</strong>: 
                {daysLeft >= 0 ? `${daysLeft} days left` : `Overdue by ${Math.abs(daysLeft)} days`}
                {isWarning && <span className="warning"> (Warning: Less than 30 days left!)</span>}
                {isOverdue && <span className="overdue"> (Overdue)</span>}
                {goal.savedAmount >= goal.targetAmount && <span style={{ color: '#28a745' }}> (Completed)</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Overview;