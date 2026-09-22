import React from 'react';
import { FiDownload, FiEye, FiFileText } from 'react-icons/fi';

const CompletedProjectReport = ({ data = [] }) => (
  <div className="table-responsive">
    <table className="table rpt-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Client</th>
          <th>Manager</th>
          <th>Completed</th>
          <th>Duration</th>
          <th>Budget</th>
          <th>Rating</th>
          <th>Docs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((project) => (
          <tr key={project.id}>
            <td><span className="rpt-name">{project.name}</span></td>
            <td>{project.client}</td>
            <td>{project.manager}</td>
            <td>{project.completionDate}</td>
            <td>{project.duration}</td>
            <td>{project.budget}</td>
            <td>{project.clientRating}</td>
            <td><FiFileText className="me-1" /> {project.documents}</td>
            <td>
              <div className="action-buttons">
                <button className="action-btn-icon view-btn" title="View"><FiEye /></button>
                <button className="action-btn-icon down-btn" title="Download"><FiDownload /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompletedProjectReport;
