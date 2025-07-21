import { useState } from 'react';

const DepositForm = ({ goals, makeDeposit }) => {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depositData.goalId || !depositData.amount) {
      setError('Please select a goal and enter an amount');
      return;
    }
    if (parseFloat(depositData.amount) <= 0) {
      setError('Deposit amount must be greater than 0');
      return;
    }
    makeDeposit(depositData.goalId, depositData.amount, (err) => {
      if (err) {
        setError('Failed to make deposit. Please try again.');
      } else {
        setDepositData({ goalId: '', amount: '' });
        setError('');
      }
    });
  };

  return (
    <div className="deposit-form">
      <h2>Make a Deposit</h2>
      {error && <p className="error">{error}</p>}
      <select
        value={depositData.goalId}
        onChange={(e) => setDepositData({ ...depositData, goalId: e.target.value })}
        aria-label="Select Goal"
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
        aria-label="Deposit Amount"
      />
      <button onClick={handleSubmit} aria-label="Make Deposit">Deposit</button>
    </div>
  );
};

export default DepositForm;