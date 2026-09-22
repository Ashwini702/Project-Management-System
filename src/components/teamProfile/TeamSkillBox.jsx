// src/components/teamProfile/TeamSkillBox.jsx
import React from 'react';
import { skills, tools, certifications } from '../../data/teamProfileData';

const TeamSkillBox = () => {
  const getColor = (level) => { if (level >= 90) return 'var(--success-color)'; if (level >= 71) return 'var(--primary-color)'; if (level >= 41) return 'var(--warning-color)'; return 'var(--danger-color)'; };

  const SkillItem = ({ skill }) => (
    <div className="tprof-skill-item">
      <div className="tprof-skill-header">
        <span>{skill.skillName}</span>
        <span>{skill.experience}</span>
      </div>
      <div className="progress tprof-skill-progress"><div className="progress-bar" style={{ width: `${skill.level}%`, backgroundColor: getColor(skill.level) }}></div></div>
      <small>{skill.level}%</small>
    </div>
  );

  return (
    <div>
      <div className="tprof-info-card mb-3">
        <h6>Technical Skills</h6>
        {skills.map(s => <SkillItem key={s.id} skill={s} />)}
      </div>
      <div className="tprof-info-card mb-3">
        <h6>Tools</h6>
        {tools.map(t => <SkillItem key={t.id} skill={t} />)}
      </div>
      <div className="tprof-info-card">
        <h6>Certifications</h6>
        {certifications.map(c => (
          <div key={c.id} className="tprof-cert-item">
            <strong>{c.title}</strong>
            <span>{c.issuer} • {c.year}</span>
            <TeamStatusBadge status={c.status} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamSkillBox;