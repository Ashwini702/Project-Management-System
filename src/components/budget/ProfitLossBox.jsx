// src/components/budget/ProfitLossBox.jsx
import React from 'react';
import PaymentStatusBadge from './PaymentStatusBadge';

const ProfitLossBox = ({ data }) => {
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitCount = data.filter(d => d.profitLoss >= 0).length;
  const lossCount = data.filter(d => d.profitLoss < 0).length;
  const avgMargin = data.length > 0 ? (data.reduce((s, d) => s + d.margin, 0) / data.length).toFixed(1) : 0;

  return (
    <div>
      <div className="pl-summary-grid">
        <div className="pl-summary-card"><h6>Total Revenue</h6><h3 className="text-primary">₹{totalRevenue.toLocaleString('en-IN')}</h3></div>
        <div className="pl-summary-card"><h6>Total Expenses</h6><h3 className="text-danger">₹{totalExpenses.toLocaleString('en-IN')}</h3></div>
        <div className="pl-summary-card"><h6>Net Profit</h6><h3 className={netProfit >= 0 ? 'text-success' : 'text-danger'}>₹{netProfit.toLocaleString('en-IN')}</h3></div>
        <div className="pl-summary-card"><h6>Avg Margin</h6><h3>{avgMargin}%</h3></div>
        <div className="pl-summary-card"><h6>Profitable</h6><h3 className="text-success">{profitCount}</h3></div>
        <div className="pl-summary-card"><h6>Loss</h6><h3 className="text-danger">{lossCount}</h3></div>
      </div>
      <div className="table-responsive mt-3">
        <table className="table budget-table">
          <thead><tr><th>Project</th><th>Client</th><th>Budget</th><th>Expenses</th><th>Revenue</th><th>P/L</th><th>Margin</th><th>Status</th></tr></thead>
          <tbody>
            {data.length === 0 ? <tr><td colSpan="8" className="text-center text-muted py-5">No profit/loss records found.</td></tr> : data.map(d => (
              <tr key={d.id}>
                <td><span className="bgt-name">{d.project}</span></td><td>{d.client}</td>
                <td>₹{d.budget.toLocaleString('en-IN')}</td><td>₹{d.expenses.toLocaleString('en-IN')}</td>
                <td>₹{d.revenue.toLocaleString('en-IN')}</td>
                <td className={d.profitLoss >= 0 ? 'text-success' : 'text-danger'}><strong>₹{d.profitLoss.toLocaleString('en-IN')}</strong></td>
                <td>{d.margin}%</td>
                <td><PaymentStatusBadge status={d.status} type="budget" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLossBox;