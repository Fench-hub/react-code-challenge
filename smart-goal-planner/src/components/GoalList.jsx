import GoalItem from './GoalItem.jsx';

const GoalList = ({ goals, updateGoal, deleteGoal }) => {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add one above!</p>
      ) : (
        goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
          />
        ))
      )}
    </div>
  );
};

export default GoalList;