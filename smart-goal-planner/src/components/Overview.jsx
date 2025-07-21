const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  ).length;

  const getStatus = (goal) => {
    if (goal.savedAmount >= goal.targetAmount) return 'deadline-completed';
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'deadline-overdue';
    if (diffDays <= 30) return 'deadline-warning';
    return '';
  };

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved.toFixed(2)}</p>
      <p>Completed Goals: {completedGoals}</p>
      {goals.map((goal) => (
        <p key={goal.id} className={getStatus(goal)}>
          {goal.name}: Due {goal.deadline} (
          {goal.savedAmount >= goal.targetAmount
            ? 'Completed'
            : getStatus(goal) === 'deadline-overdue'
            ? 'Overdue'
            : getStatus(goal) === 'deadline-warning'
            ? 'Warning'
            : 'On Track'}
          )
        </p>
      ))}
    </div>
  );
};

export default Overview;