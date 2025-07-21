Smart Goal Planner
   A React app to manage financial goals with create, read, update, delete (CRUD) operations, progress tracking, and deposits.
Features

Add, edit, and delete savings goals.
Track progress with color-coded bars (green for completed, orange for nearing deadline, red for overdue).
Deposit funds to goals.
View total goals, saved amount, and deadlines.

Setup

 git@github.com:Fench-hub/smart-goal-planner.git
 smart-goal-planner


Install dependencies:npm install


Start JSON Server:node server.cjs


Start Vite:npm run dev


Open http://localhost:5173.

Usage

Add/edit/delete goals (e.g., "vacation": $49500/$50000).
Deposit funds (e.g., $500 to "vacation").
View progress and overview (7 goals, $231,500 saved).

Project Structure

src/App.jsx: Main component with state management and fetch logic.
src/components/GoalItem.jsx: Renders individual goals with edit/delete functionality.
src/components/GoalForm.jsx: Form for adding new goals.
src/components/DepositForm.jsx: Form for depositing funds.
src/components/GoalList.jsx: Lists all goals.
src/components/Overview.jsx: Displays summary statistics.
src/App.css: Styles for progress bars, responsive design, and components.
server.cjs: Runs json-server with CORS for db.json.
db.json: Stores goal data (7 goals, e.g., "Relocation," "Emergency Fund").
package.json: Defines dependencies and scripts.

License:
It's for educational purposes

Author

GitHub: Fench-hub
Email: gelona.jepchumba@student.moringaschool.com


