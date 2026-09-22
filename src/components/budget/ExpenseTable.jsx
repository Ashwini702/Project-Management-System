// src/components/budget/ExpenseTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiPaperclip } from 'react-icons/fi';
import PaymentStatusBadge from './PaymentStatusBadge';

const ExpenseTable = ({ expenses, onView, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table budget-table">
      <thead><tr><th>Title</th><th>Project</th><th>Client</th><th>Category</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Receipt</th><th>Actions</th></tr></thead>
      <tbody>
        {expenses.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No expenses found</p></td></tr> :
          expenses.map(e => (
            <tr key={e.id}>
              <td><span className="bgt-name">{e.title}</span></td><td>{e.project}</td><td>{e.client}</td><td>{e.category}</td>
              <td><strong>₹{e.amount.toLocaleString('en-IN')}</strong></td><td>{e.expenseDate}</td><td>{e.paymentMethod}</td>
              <td><PaymentStatusBadge status={e.status} /></td>
              <td>{e.receipt ? <FiPaperclip className="text-primary" title={e.receipt} /> : '-'}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(e)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(e)}><FiEdit2 /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(e)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default ExpenseTable;