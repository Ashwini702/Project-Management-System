// src/components/budget/BudgetOverviewCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiPlus } from 'react-icons/fi';
import PaymentStatusBadge from './PaymentStatusBadge';
import BudgetProgressBar from './BudgetProgressBar';

const BudgetOverviewCard = ({ budget, onView, onEdit, onAddExpense }) => (
  <div className="budget-overview-card">
    <div className="boc-header">
      <h6>{budget.projectName}</h6>
      <PaymentStatusBadge status={budget.paymentStatus} />
    </div>
    <p className="boc-client">{budget.clientName}</p>
    <div className="boc-dates"><span>{budget.startDate}</span><span>→</span><span>{budget.endDate}</span></div>
    <BudgetProgressBar used={budget.usedBudget} total={budget.totalBudget} />
    <div className="boc-amounts">
      <div><span>Budget</span><strong>₹{budget.totalBudget.toLocaleString('en-IN')}</strong></div>
      <div><span>Used</span><strong className="text-danger">₹{budget.usedBudget.toLocaleString('en-IN')}</strong></div>
      <div><span>Remaining</span><strong className="text-success">₹{budget.remainingBudget.toLocaleString('en-IN')}</strong></div>
    </div>
    <div className="boc-pl">
      <span>P/L: <strong className={budget.profitLoss >= 0 ? 'text-success' : 'text-danger'}>₹{budget.profitLoss.toLocaleString('en-IN')}</strong></span>
    </div>
    <div className="boc-actions">
      <button className="boc-btn" onClick={() => onView(budget)}><FiEye /> View</button>
      <button className="boc-btn" onClick={() => onEdit(budget)}><FiEdit2 /> Edit</button>
      <button className="boc-btn" onClick={() => onAddExpense(budget)}><FiPlus /> Expense</button>
    </div>
  </div>
);

export default BudgetOverviewCard;