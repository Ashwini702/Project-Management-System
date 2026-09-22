import React, { useEffect, useMemo, useState } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import WorkloadStatsCard from '../../components/managerWorkload/WorkloadStatsCard';
import TeamMemberWorkloadCard from '../../components/managerWorkload/TeamMemberWorkloadCard';
import TeamWorkloadTable from '../../components/managerWorkload/TeamWorkloadTable';
import ReassignTaskModal from '../../components/managerWorkload/ReassignTaskModal';
import MemberDetailsModal from '../../components/managerWorkload/MemberDetailsModal';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import * as taskService from '../../services/taskService';
import * as teamService from '../../services/teamService';
import { apiData } from '../../services/api';
import '../../styles/managerWorkload.css';

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
};

const ManagerTeamWorkload = () => {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [saving, setSaving] = useState(false);

  const showAlert = (message, type = 'info') => { setAlert({ message, type }); setTimeout(() => setAlert(null), 3500); };
  const loadData = async () => {
    try {
      const [teamResponse, taskResponse] = await Promise.all([teamService.getTeam(), taskService.getTasks()]);
      const dbTasks = apiData(taskResponse);
      setTasks(dbTasks);
      setMembers(apiData(teamResponse).map(member => {
        const assigned = dbTasks.filter(task => Number(task.assigned_to) === Number(member.id));
        const completed = assigned.filter(task => task.status === 'Completed').length;
        const pending = assigned.length - completed;
        return {
          ...member,
          role: member.designation || member.role || 'Team Member',
          skills: asArray(member.skills),
          assignedProjects: asArray(member.assigned_projects),
          assignedTasks: assigned.length,
          completedTasks: completed,
          pendingTasks: pending,
          workload: Math.min(100, assigned.filter(task => task.status !== 'Completed').length * 10),
          availability: member.status === 'Inactive' ? 'On Leave' : (assigned.length >= 10 ? 'Overloaded' : assigned.length >= 6 ? 'Busy' : 'Available')
        };
      }));
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to load workload data from the database.', 'danger');
    }
  };
  useEffect(() => { loadData(); }, []);

  const departments = useMemo(() => [...new Set(members.map(member => member.department).filter(Boolean))], [members]);
  const roles = useMemo(() => [...new Set(members.map(member => member.role).filter(Boolean))], [members]);
  const stats = useMemo(() => [
    { id: 1, title: 'Team Members', value: members.length, desc: 'Active team accounts', icon: 'FiUsers', color: 'primary' },
    { id: 2, title: 'Assigned Tasks', value: tasks.length, desc: 'Tasks in database', icon: 'FiCheckSquare', color: 'info' },
    { id: 3, title: 'Pending Tasks', value: tasks.filter(task => task.status !== 'Completed').length, desc: 'Needs attention', icon: 'FiAlertTriangle', color: 'warning' },
    { id: 4, title: 'Overloaded Members', value: members.filter(member => member.workload > 90).length, desc: 'Over 90% workload', icon: 'FiTrendingUp', color: 'danger' }
  ], [members, tasks]);
  const filteredMembers = useMemo(() => members.filter(member => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || [member.name, member.role, member.department, ...member.skills].filter(Boolean).some(value => String(value).toLowerCase().includes(term));
    return matchesSearch && (deptFilter === 'All Departments' || member.department === deptFilter) && (roleFilter === 'All Roles' || member.role === roleFilter);
  }), [members, searchTerm, deptFilter, roleFilter]);

  const handleReassignSubmit = async (form) => {
    const task = tasks.find(item => String(item.id) === String(form.taskId));
    if (!task) return;
    setSaving(true);
    try {
      await taskService.updateTask(task.id, {
        assigned_to: Number(form.newAssignee),
        assignee_name: form.newAssigneeName,
        ...(form.newDeadline ? { deadline: form.newDeadline } : {})
      });
      await loadData();
      setShowReassignModal(false);
      setSelectedMember(null);
      showAlert(`Task "${task.title}" reassigned to ${form.newAssigneeName} and saved in the database.`, 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to reassign the task.', 'danger');
    } finally { setSaving(false); }
  };
  const resetFilters = () => { setSearchTerm(''); setDeptFilter('All Departments'); setRoleFilter('All Roles'); };
  const openReassign = member => { setSelectedMember(member || null); setShowReassignModal(true); };

  return <ManagerLayout><div className="mwl-dashboard">
    <div className="mwl-dash-header"><div><h3>Team Workload</h3><p>Live task distribution from the database.</p></div><button className="btn btn-primary btn-sm" onClick={() => openReassign()}><FiRefreshCw /> Reassign Task</button></div>
    {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)} /></div>}
    <div className="mwl-stats-grid">{stats.map(stat => <WorkloadStatsCard key={stat.id} stat={stat} />)}</div>
    <div className="filter-section"><div className="filter-row"><div className="search-box"><FiSearch className="search-icon" /><input className="form-control search-input" placeholder="Search members..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)} /></div><div className="filter-selects"><select className="form-select" value={deptFilter} onChange={event => setDeptFilter(event.target.value)}><option>All Departments</option>{departments.map(department => <option key={department}>{department}</option>)}</select><select className="form-select" value={roleFilter} onChange={event => setRoleFilter(event.target.value)}><option>All Roles</option>{roles.map(role => <option key={role}>{role}</option>)}</select></div><button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button><div className="view-toggle"><button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button><button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button></div></div></div>
    {viewMode === 'card' ? <div className="mwl-members-grid">{filteredMembers.length ? filteredMembers.map(member => <TeamMemberWorkloadCard key={member.id} member={member} onView={member => { setSelectedMember(member); setShowDetailsModal(true); }} onReassign={openReassign} onViewTasks={() => {}} />) : <p className="text-center text-muted py-5">No team members found.</p>}</div> : <div className="mwl-table-card"><TeamWorkloadTable members={filteredMembers} onView={member => { setSelectedMember(member); setShowDetailsModal(true); }} onReassign={openReassign} onViewTasks={() => {}} /></div>}
    <ReassignTaskModal show={showReassignModal} onClose={() => !saving && setShowReassignModal(false)} onSubmit={handleReassignSubmit} tasks={tasks} members={members} initialMember={selectedMember} />
    <MemberDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} member={selectedMember} />
  </div></ManagerLayout>;
};
export default ManagerTeamWorkload;