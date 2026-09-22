// src/data/teamAttendanceData.js
export const attendanceStatsData = [
  { id: 1, title: 'Present Days', value: 22, icon: 'FiCheckCircle', desc: 'This month', color: 'success' },
  { id: 2, title: 'Absent Days', value: 2, icon: 'FiXCircle', desc: 'This month', color: 'danger' },
  { id: 3, title: 'Late Check-ins', value: 3, icon: 'FiClock', desc: 'This month', color: 'warning' },
  { id: 4, title: 'Leave Taken', value: 4, icon: 'FiCalendar', desc: 'This month', color: 'info' },
  { id: 5, title: 'Total Work Hours', value: 176, icon: 'FiTrendingUp', desc: 'This month', color: 'primary' },
  { id: 6, title: 'Attendance Rate', value: '92%', icon: 'FiAward', desc: 'Monthly average', color: 'purple' }
];

export const todayAttendance = {
  date: '2026-06-24',
  status: 'Checked In',
  checkIn: '09:00 AM',
  checkOut: '-',
  totalHours: '5h 30m',
  breakTime: '30m',
  productiveHours: '5h',
  workMode: 'Office',
  location: 'Mumbai Office',
  note: 'Regular day at office.'
};

export const shifts = ['Morning Shift', 'General Shift', 'Evening Shift', 'Night Shift'];
export const workModes = ['Office', 'Remote', 'Hybrid'];

export const attendanceRecords = [
  { id: 1, date: '2026-06-24', day: 'Wednesday', shift: 'General Shift', workMode: 'Office', checkIn: '09:00 AM', checkOut: '-', breakTime: '30m', totalHours: '-', productiveHours: '-', overtimeHours: '-', status: 'Present', location: 'Mumbai Office', note: 'Regular day.', approvalStatus: 'Approved', lastUpdated: '2026-06-24' },
  { id: 2, date: '2026-06-23', day: 'Tuesday', shift: 'General Shift', workMode: 'Office', checkIn: '09:15 AM', checkOut: '06:00 PM', breakTime: '45m', totalHours: '8h 15m', productiveHours: '7h 30m', overtimeHours: '0', status: 'Late', location: 'Mumbai Office', note: 'Traffic delay.', approvalStatus: 'Approved', lastUpdated: '2026-06-23' },
  { id: 3, date: '2026-06-22', day: 'Monday', shift: 'General Shift', workMode: 'Remote', checkIn: '09:00 AM', checkOut: '06:00 PM', breakTime: '30m', totalHours: '8h 30m', productiveHours: '8h', overtimeHours: '0', status: 'Present', location: 'Home', note: 'Remote work day.', approvalStatus: 'Approved', lastUpdated: '2026-06-22' },
  { id: 4, date: '2026-06-21', day: 'Sunday', shift: '-', workMode: '-', checkIn: '-', checkOut: '-', breakTime: '-', totalHours: '-', productiveHours: '-', overtimeHours: '-', status: 'Holiday', location: '-', note: 'Sunday.', approvalStatus: '-', lastUpdated: '2026-06-21' },
  { id: 5, date: '2026-06-20', day: 'Saturday', shift: '-', workMode: '-', checkIn: '-', checkOut: '-', breakTime: '-', totalHours: '-', productiveHours: '-', overtimeHours: '-', status: 'Holiday', location: '-', note: 'Saturday.', approvalStatus: '-', lastUpdated: '2026-06-20' },
  { id: 6, date: '2026-06-19', day: 'Friday', shift: 'General Shift', workMode: 'Office', checkIn: '09:00 AM', checkOut: '05:30 PM', breakTime: '30m', totalHours: '8h', productiveHours: '7h', overtimeHours: '0', status: 'Present', location: 'Mumbai Office', note: '', approvalStatus: 'Approved', lastUpdated: '2026-06-19' },
  { id: 7, date: '2026-06-18', day: 'Thursday', shift: 'General Shift', workMode: 'Hybrid', checkIn: '10:00 AM', checkOut: '06:00 PM', breakTime: '30m', totalHours: '7h 30m', productiveHours: '6h 30m', overtimeHours: '0', status: 'Half Day', location: 'Mumbai Office', note: 'Doctor appointment in morning.', approvalStatus: 'Approved', lastUpdated: '2026-06-18' },
  { id: 8, date: '2026-06-17', day: 'Wednesday', shift: 'General Shift', workMode: 'Office', checkIn: '09:00 AM', checkOut: '06:00 PM', breakTime: '45m', totalHours: '8h 15m', productiveHours: '7h 30m', overtimeHours: '0', status: 'Present', location: 'Mumbai Office', note: '', approvalStatus: 'Approved', lastUpdated: '2026-06-17' },
  { id: 9, date: '2026-06-16', day: 'Tuesday', shift: 'General Shift', workMode: 'Office', checkIn: '09:30 AM', checkOut: '06:00 PM', breakTime: '30m', totalHours: '8h', productiveHours: '7h', overtimeHours: '0', status: 'Late', location: 'Mumbai Office', note: 'Overslept.', approvalStatus: 'Approved', lastUpdated: '2026-06-16' },
  { id: 10, date: '2026-06-15', day: 'Monday', shift: 'General Shift', workMode: 'Remote', checkIn: '09:00 AM', checkOut: '06:00 PM', breakTime: '45m', totalHours: '8h 15m', productiveHours: '7h 30m', overtimeHours: '0', status: 'Present', location: 'Home', note: '', approvalStatus: 'Approved', lastUpdated: '2026-06-15' },
  { id: 11, date: '2026-06-13', day: 'Friday', shift: '-', workMode: '-', checkIn: '-', checkOut: '-', breakTime: '-', totalHours: '-', productiveHours: '-', overtimeHours: '-', status: 'On Leave', location: '-', note: 'Casual leave.', approvalStatus: 'Approved', lastUpdated: '2026-06-13' },
  { id: 12, date: '2026-06-10', day: 'Wednesday', shift: '-', workMode: '-', checkIn: '-', checkOut: '-', breakTime: '-', totalHours: '-', productiveHours: '-', overtimeHours: '-', status: 'Absent', location: '-', note: 'Sick. Informed manager.', approvalStatus: 'Pending', lastUpdated: '2026-06-10' }
];

export const leaveBalance = [
  { id: 1, leaveType: 'Casual Leave', totalAllowed: 12, used: 4, remaining: 8, pending: 1 },
  { id: 2, leaveType: 'Sick Leave', totalAllowed: 12, used: 2, remaining: 10, pending: 0 },
  { id: 3, leaveType: 'Paid Leave', totalAllowed: 15, used: 3, remaining: 12, pending: 1 },
  { id: 4, leaveType: 'Unpaid Leave', totalAllowed: 10, used: 0, remaining: 10, pending: 0 },
  { id: 5, leaveType: 'Work From Home', totalAllowed: 10, used: 2, remaining: 8, pending: 0 },
  { id: 6, leaveType: 'Half Day', totalAllowed: 5, used: 1, remaining: 4, pending: 0 }
];

export const leaveRequests = [
  { id: 1, leaveType: 'Casual Leave', fromDate: '2026-06-13', toDate: '2026-06-13', totalDays: 1, reason: 'Personal work.', status: 'Approved', appliedDate: '2026-06-12' },
  { id: 2, leaveType: 'Sick Leave', fromDate: '2026-06-10', toDate: '2026-06-10', totalDays: 1, reason: 'Not feeling well.', status: 'Pending', appliedDate: '2026-06-10' },
  { id: 3, leaveType: 'Paid Leave', fromDate: '2026-07-01', toDate: '2026-07-03', totalDays: 3, reason: 'Family function.', status: 'Pending', appliedDate: '2026-06-20' },
  { id: 4, leaveType: 'Work From Home', fromDate: '2026-06-22', toDate: '2026-06-22', totalDays: 1, reason: 'Internet upgrade at home.', status: 'Approved', appliedDate: '2026-06-21' }
];

export const monthlySummary = {
  totalWorkingDays: 22,
  presentDays: 20,
  absentDays: 2,
  lateDays: 3,
  halfDays: 1,
  leaveDays: 2,
  holidays: 6,
  totalWorkHours: 176,
  avgWorkHoursPerDay: 8,
  attendancePercentage: 92,
  punctualityScore: 85
};