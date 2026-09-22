// src/components/clientFeedback/ClientFeedbackRatingBox.jsx
import React from 'react';
import { FiStar } from 'react-icons/fi';
import { ratingAnalytics } from '../../data/clientFeedbackData';

const ClientFeedbackRatingBox = () => (
  <div className="clfb-rating-box">
    <div className="clfb-rating-summary">
      <div className="clfb-rating-overall">
        <h2>{ratingAnalytics.averageRating}</h2>
        <span className="clfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < Math.round(ratingAnalytics.averageRating) ? 'filled' : ''} />)}</span>
        <p>{ratingAnalytics.totalFeedback} total feedback</p>
      </div>
      <div className="clfb-rating-bars">
        <div className="clfb-rb-row"><span>5 Stars</span><div className="clfb-rb-bar"><div className="clfb-rb-fill" style={{ width: `${(ratingAnalytics.fiveStar / ratingAnalytics.totalFeedback) * 100}%`, background: 'var(--success-color)' }}></div></div><span>{ratingAnalytics.fiveStar}</span></div>
        <div className="clfb-rb-row"><span>4 Stars</span><div className="clfb-rb-bar"><div className="clfb-rb-fill" style={{ width: `${(ratingAnalytics.fourStar / ratingAnalytics.totalFeedback) * 100}%`, background: 'var(--primary-color)' }}></div></div><span>{ratingAnalytics.fourStar}</span></div>
        <div className="clfb-rb-row"><span>3 Stars</span><div className="clfb-rb-bar"><div className="clfb-rb-fill" style={{ width: `${(ratingAnalytics.threeStar / ratingAnalytics.totalFeedback) * 100}%`, background: 'var(--warning-color)' }}></div></div><span>{ratingAnalytics.threeStar}</span></div>
        <div className="clfb-rb-row"><span>Low</span><div className="clfb-rb-bar"><div className="clfb-rb-fill" style={{ width: `${(ratingAnalytics.lowRating / ratingAnalytics.totalFeedback) * 100}%`, background: 'var(--danger-color)' }}></div></div><span>{ratingAnalytics.lowRating}</span></div>
      </div>
    </div>
    <h6 className="mt-4">Project Ratings</h6>
    {ratingAnalytics.projectRatings.map(p => (
      <div key={p.projectName} className="clfb-proj-rating">
        <div className="clfb-pr-header"><span>{p.projectName}</span><span className="clfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < Math.round(p.avgRating) ? 'filled' : ''} />)} {p.avgRating}</span></div>
        <div className="progress clfb-pr-progress"><div className="progress-bar" style={{ width: `${p.satisfaction}%`, background: p.satisfaction >= 80 ? 'var(--success-color)' : p.satisfaction >= 60 ? 'var(--warning-color)' : 'var(--danger-color)' }}></div></div>
        <small>{p.satisfaction}% • {p.resolved}/{p.total} resolved</small>
      </div>
    ))}
  </div>
);
export default ClientFeedbackRatingBox;