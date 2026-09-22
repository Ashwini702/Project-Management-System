// src/components/projectDetails/ProjectBudgetSummary.jsx
import React from 'react';
import ProjectStatusBadge from './ProjectStatusBadge';

const ProjectBudgetSummary = ({ budget, expenses }) => (
  <div>
    <div className="pd-budget-grid">
      <div className="pd-budget-card"><span>Total Budget</span><h4>₹{budget.totalBudget.toLocaleString('en-IN')}</h4></div>
      <div className="pd-budget-card"><span>Used</span><h4 className="text-danger">₹{budget.usedBudget.toLocaleString('en-IN')}</h4></div>
      <div className="pd-budget-card"><span>Remaining</span><h4 className="text-success">₹{budget.remainingBudget.toLocaleString('en-IN')}</h4></div>
      <div className="pd-budget-card"><span>P/L</span><h4 className={budget.profitLoss >= 0 ? 'text-success' : 'text-danger'}>₹{budget.profitLoss.toLocaleString('en-IN')}</h4></div>
    </div>
    <div className="progress pd-budget-progress mt-3"><div className="progress-bar" style={{ width: `${budget.expensePercentage}%` }}></div></div>
    <p className="text-center mt-1">{budget.expensePercentage}% used • <ProjectStatusBadge status={budget.paymentStatus} /></p>
    <h6 className="mt-4">Expenses</h6>
    <div className="table-responsive">
      <table className="table pd-table">
        <thead><tr><th>Title</th><th>Category</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}><td>{e.title}</td><td>{e.category}</td><td>₹{e.amount.toLocaleString('en-IN')}</td><td>{e.date}</td><td><ProjectStatusBadge status={e.status} /></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectBudgetSummary;