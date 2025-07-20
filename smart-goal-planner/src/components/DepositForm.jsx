import React, { useState } from 'react';

const DepositForm = ({ goals, makeDeposit }) => {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depositData.goalId) {
      alert('Please select a goal');
      return;
    }
    if (depositData.amount <= 0) {
      alert('Deposit amount must be greater than 0');
      return;
    }
    makeDeposit(depositData.goalId, depositData.amount);
    setDepositData({ goalId: '', amount: '' });
  };

  return (
    <div>
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={depositData.goalId}
          onChange={(e) => setDepositData({ ...depositData, goalId: e.target.value })}
        >
          <option value="">Select a Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Deposit Amount"
          value={depositData.amount}
          onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
          required
          min="1"
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};

export default DepositForm;