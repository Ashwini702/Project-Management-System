// src/data/clientData.js
export const clientStatsData = [
  {
    id: 1,
    title: 'Total Clients',
    value: 28,
    icon: 'FiUsers',
    description: 'All registered clients',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Active Clients',
    value: 20,
    icon: 'FiUserCheck',
    description: 'Currently engaged',
    color: 'success'
  },
  {
    id: 3,
    title: 'Pending Clients',
    value: 5,
    icon: 'FiClock',
    description: 'Awaiting onboarding',
    color: 'warning'
  },
  {
    id: 4,
    title: 'Completed Projects',
    value: 42,
    icon: 'FiCheckCircle',
    description: 'Successfully delivered',
    color: 'info'
  },
  {
    id: 5,
    title: 'Pending Feedback',
    value: 8,
    icon: 'FiMessageSquare',
    description: 'Awaiting response',
    color: 'purple'
  },
  {
    id: 6,
    title: 'Total Revenue',
    value: '₹8,75,000',
    icon: 'FiDollarSign',
    description: 'From all projects',
    color: 'danger'
  }
];

export const industries = ['IT', 'Education', 'Healthcare', 'Retail', 'Finance', 'Real Estate', 'Manufacturing'];

export const projectsForClients = [
  'Website Redesign',
  'Mobile App UI',
  'CRM Development',
  'ERP System',
  'Cyber Security Audit',
  'Digital Marketing Campaign',
  'E-commerce Platform',
  'Healthcare Portal'
];

export const clientsData = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    company: 'TechCorp India Pvt Ltd',
    email: 'rajesh.sharma@techcorp.in',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    industry: 'IT',
    assignedProjects: ['Website Redesign', 'Mobile App UI'],
    completedProjects: 3,
    pendingFeedback: 1,
    status: 'Active',
    paymentStatus: 'Paid',
    projectValue: 350000,
    paidAmount: 350000,
    pendingAmount: 0,
    lastCommunication: '2026-06-19 14:30',
    createdDate: '2025-03-15',
    notes: 'Premium client with multiple ongoing projects. Requires priority support.',
    feedbacks: [
      { id: 1, message: 'The new homepage design looks great! Minor tweak needed in the footer section.', project: 'Website Redesign', date: '2026-06-18', status: 'Resolved' },
      { id: 2, message: 'Mobile app navigation needs to be more intuitive. Please add bottom tabs.', project: 'Mobile App UI', date: '2026-06-15', status: 'Approved' }
    ],
    communications: [
      { id: 1, title: 'Project Update Meeting', type: 'Meeting', date: '2026-06-19', notes: 'Discussed website progress and upcoming milestones.', teamMember: 'Michael Roberts' },
      { id: 2, title: 'Design Approval', type: 'Email', date: '2026-06-17', notes: 'Sent final design mockups for approval.', teamMember: 'Lisa Martinez' },
      { id: 3, title: 'Quick Feedback Call', type: 'Call', date: '2026-06-15', notes: 'Client requested changes in color scheme.', teamMember: 'Emily Davidson' }
    ]
  },
  {
    id: 2,
    name: 'Priya Patel',
    company: 'EduTech Solutions Ltd',
    email: 'priya.patel@edutech.com',
    phone: '+91 87654 32109',
    city: 'Bangalore',
    industry: 'Education',
    assignedProjects: ['CRM Development', 'Digital Marketing Campaign'],
    completedProjects: 5,
    pendingFeedback: 2,
    status: 'Active',
    paymentStatus: 'Partial',
    projectValue: 280000,
    paidAmount: 180000,
    pendingAmount: 100000,
    lastCommunication: '2026-06-18 11:00',
    createdDate: '2025-01-20',
    notes: 'Long-term client interested in LMS development as next phase.',
    feedbacks: [
      { id: 1, message: 'CRM system needs better reporting features. Please add custom report builder.', project: 'CRM Development', date: '2026-06-16', status: 'Pending' },
      { id: 2, message: 'Marketing campaign results are impressive. Continue with the same strategy.', project: 'Digital Marketing Campaign', date: '2026-06-14', status: 'Approved' }
    ],
    communications: [
      { id: 1, title: 'CRM Demo Session', type: 'Meeting', date: '2026-06-16', notes: 'Showed CRM prototype. Client excited about automation features.', teamMember: 'Patricia Garcia' },
      { id: 2, title: 'Campaign Performance Report', type: 'Email', date: '2026-06-14', notes: 'Shared monthly marketing analytics report.', teamMember: 'Robert Wilson' }
    ]
  },
  {
    id: 3,
    name: 'Dr. Ankit Gupta',
    company: 'MediCare Hospitals Group',
    email: 'ankit.gupta@medicare.in',
    phone: '+91 76543 21098',
    city: 'Delhi',
    industry: 'Healthcare',
    assignedProjects: ['Healthcare Portal'],
    completedProjects: 2,
    pendingFeedback: 0,
    status: 'Active',
    paymentStatus: 'Paid',
    projectValue: 520000,
    paidAmount: 520000,
    pendingAmount: 0,
    lastCommunication: '2026-06-19 09:00',
    createdDate: '2025-06-10',
    notes: 'HIPAA compliance is critical. All data must be stored on Indian servers.',
    feedbacks: [
      { id: 1, message: 'Patient records module is working perfectly. Very satisfied with the security features.', project: 'Healthcare Portal', date: '2026-06-17', status: 'Resolved' }
    ],
    communications: [
      { id: 1, title: 'Security Compliance Review', type: 'Meeting', date: '2026-06-19', notes: 'Reviewed HIPAA compliance requirements.', teamMember: 'Security Expert' },
      { id: 2, title: 'Weekly Progress Update', type: 'Call', date: '2026-06-17', notes: 'Portal development on track.', teamMember: 'Michael Roberts' }
    ]
  },
  {
    id: 4,
    name: 'Vikram Mehta',
    company: 'RetailMax Stores',
    email: 'vikram.mehta@retailmax.com',
    phone: '+91 65432 10987',
    city: 'Hyderabad',
    industry: 'Retail',
    assignedProjects: ['Mobile App UI', 'E-commerce Platform'],
    completedProjects: 1,
    pendingFeedback: 1,
    status: 'Active',
    paymentStatus: 'Pending',
    projectValue: 420000,
    paidAmount: 0,
    pendingAmount: 420000,
    lastCommunication: '2026-06-15 16:00',
    createdDate: '2025-09-05',
    notes: 'New client. Payment expected after first milestone delivery.',
    feedbacks: [
      { id: 1, message: 'E-commerce platform UI needs more product showcase options.', project: 'E-commerce Platform', date: '2026-06-15', status: 'Pending' }
    ],
    communications: [
      { id: 1, title: 'Project Kickoff', type: 'Meeting', date: '2026-06-15', notes: 'Discussed project scope and timeline.', teamMember: 'Emily Davidson' },
      { id: 2, title: 'Contract Signing', type: 'Email', date: '2026-06-10', notes: 'Sent final contract for signatures.', teamMember: 'Jennifer Lee' }
    ]
  },
  {
    id: 5,
    name: 'Sneha Reddy',
    company: 'FinanceHub Pvt Ltd',
    email: 'sneha.reddy@financehub.in',
    phone: '+91 54321 09876',
    city: 'Chennai',
    industry: 'Finance',
    assignedProjects: ['ERP System', 'Cyber Security Audit'],
    completedProjects: 4,
    pendingFeedback: 0,
    status: 'Active',
    paymentStatus: 'Paid',
    projectValue: 650000,
    paidAmount: 650000,
    pendingAmount: 0,
    lastCommunication: '2026-06-18 13:00',
    createdDate: '2025-02-28',
    notes: 'Enterprise client. Requires dedicated project manager and weekly reports.',
    feedbacks: [
      { id: 1, message: 'ERP system integration completed successfully. Finance team is happy.', project: 'ERP System', date: '2026-06-18', status: 'Resolved' },
      { id: 2, message: 'Security audit report is comprehensive. Please schedule follow-up review.', project: 'Cyber Security Audit', date: '2026-06-16', status: 'Approved' }
    ],
    communications: [
      { id: 1, title: 'ERP Go-Live Meeting', type: 'Meeting', date: '2026-06-18', notes: 'ERP system went live. Minor issues resolved on spot.', teamMember: 'Emily Davidson' },
      { id: 2, title: 'Audit Report Discussion', type: 'Call', date: '2026-06-16', notes: 'Discussed security vulnerabilities and remediation plan.', teamMember: 'Security Expert' }
    ]
  },
  {
    id: 6,
    name: 'Amit Khanna',
    company: 'RealEstate Pro',
    email: 'amit.khanna@realestatepro.com',
    phone: '+91 43210 98765',
    city: 'Pune',
    industry: 'Real Estate',
    assignedProjects: ['Website Redesign'],
    completedProjects: 0,
    pendingFeedback: 0,
    status: 'Pending',
    paymentStatus: 'Pending',
    projectValue: 180000,
    paidAmount: 0,
    pendingAmount: 180000,
    lastCommunication: '2026-06-12 10:00',
    createdDate: '2025-11-20',
    notes: 'Project starting next month. Contract under review.',
    feedbacks: [],
    communications: [
      { id: 1, title: 'Initial Consultation', type: 'Meeting', date: '2026-06-12', notes: 'Discussed requirements and project scope.', teamMember: 'Michael Roberts' },
      { id: 2, title: 'Proposal Sent', type: 'Email', date: '2026-06-10', notes: 'Sent detailed project proposal with timeline and cost estimate.', teamMember: 'Jennifer Lee' }
    ]
  },
  {
    id: 7,
    name: 'Kavita Joshi',
    company: 'Manufacturing Corp India',
    email: 'kavita.joshi@manufacturing.in',
    phone: '+91 32109 87654',
    city: 'Ahmedabad',
    industry: 'Manufacturing',
    assignedProjects: ['ERP System'],
    completedProjects: 2,
    pendingFeedback: 1,
    status: 'Active',
    paymentStatus: 'Overdue',
    projectValue: 380000,
    paidAmount: 150000,
    pendingAmount: 230000,
    lastCommunication: '2026-06-14 15:30',
    createdDate: '2025-04-18',
    notes: 'Payment delayed due to internal approval process. Follow up required.',
    feedbacks: [
      { id: 1, message: 'Inventory module needs customization for our warehouse setup.', project: 'ERP System', date: '2026-06-14', status: 'Approved' }
    ],
    communications: [
      { id: 1, title: 'Payment Follow-up', type: 'Call', date: '2026-06-14', notes: 'Discussed pending payment. Client promised to clear by next week.', teamMember: 'Accountant Smith' },
      { id: 2, title: 'ERP Customization Review', type: 'Meeting', date: '2026-06-10', notes: 'Reviewed customization requirements.', teamMember: 'Thomas Wright' }
    ]
  },
  {
    id: 8,
    name: 'Deepak Verma',
    company: 'IT Solutions Co',
    email: 'deepak.verma@itsolutions.com',
    phone: '+91 21098 76543',
    city: 'Kolkata',
    industry: 'IT',
    assignedProjects: ['Cyber Security Audit', 'CRM Development'],
    completedProjects: 6,
    pendingFeedback: 2,
    status: 'Active',
    paymentStatus: 'Partial',
    projectValue: 450000,
    paidAmount: 300000,
    pendingAmount: 150000,
    lastCommunication: '2026-06-17 11:45',
    createdDate: '2025-01-05',
    notes: 'Loyal client. Has referred 3 other companies.',
    feedbacks: [
      { id: 1, message: 'Security audit found critical vulnerabilities. Please prioritize fixing.', project: 'Cyber Security Audit', date: '2026-06-17', status: 'Pending' },
      { id: 2, message: 'CRM workflow automation is excellent. Team productivity increased by 40%.', project: 'CRM Development', date: '2026-06-15', status: 'Resolved' }
    ],
    communications: [
      { id: 1, title: 'Vulnerability Report', type: 'Email', date: '2026-06-17', notes: 'Sent detailed vulnerability report with remediation steps.', teamMember: 'Security Expert' },
      { id: 2, title: 'CRM Training Session', type: 'Meeting', date: '2026-06-15', notes: 'Conducted CRM training for client team.', teamMember: 'Patricia Garcia' },
      { id: 3, title: 'Referral Thank You', type: 'Call', date: '2026-06-12', notes: 'Thanked client for referrals.', teamMember: 'Michael Roberts' }
    ]
  },
  {
    id: 9,
    name: 'Neha Agarwal',
    company: 'StyleHub Fashion',
    email: 'neha.agarwal@stylehub.in',
    phone: '+91 10987 65432',
    city: 'Jaipur',
    industry: 'Retail',
    assignedProjects: ['E-commerce Platform'],
    completedProjects: 1,
    pendingFeedback: 1,
    status: 'Active',
    paymentStatus: 'Paid',
    projectValue: 290000,
    paidAmount: 290000,
    pendingAmount: 0,
    lastCommunication: '2026-06-16 14:00',
    createdDate: '2025-08-22',
    notes: 'E-commerce platform delivery scheduled next month.',
    feedbacks: [
      { id: 1, message: 'Product catalog management needs bulk upload feature.', project: 'E-commerce Platform', date: '2026-06-16', status: 'Pending' }
    ],
    communications: [
      { id: 1, title: 'Feature Request Discussion', type: 'Call', date: '2026-06-16', notes: 'Client requested bulk upload and AI recommendations.', teamMember: 'David Thompson' }
    ]
  },
  {
    id: 10,
    name: 'Suresh Nair',
    company: 'Global Education Trust',
    email: 'suresh.nair@globaledu.org',
    phone: '+91 09876 54321',
    city: 'Trivandrum',
    industry: 'Education',
    assignedProjects: ['Digital Marketing Campaign'],
    completedProjects: 0,
    pendingFeedback: 0,
    status: 'Inactive',
    paymentStatus: 'Overdue',
    projectValue: 120000,
    paidAmount: 60000,
    pendingAmount: 60000,
    lastCommunication: '2026-06-05 09:00',
    createdDate: '2025-12-10',
    notes: 'Project on hold due to client internal restructuring.',
    feedbacks: [],
    communications: [
      { id: 1, title: 'Project Status Update', type: 'Email', date: '2026-06-05', notes: 'Client informed about temporary project suspension.', teamMember: 'Robert Wilson' }
    ]
  },
  {
    id: 11,
    name: 'Meera Kapoor',
    company: 'Kapoor & Associates',
    email: 'meera.kapoor@kapoorlegal.com',
    phone: '+91 98760 12345',
    city: 'Lucknow',
    industry: 'Finance',
    assignedProjects: ['CRM Development'],
    completedProjects: 0,
    pendingFeedback: 0,
    status: 'Pending',
    paymentStatus: 'Pending',
    projectValue: 210000,
    paidAmount: 0,
    pendingAmount: 210000,
    lastCommunication: '2026-06-10 12:00',
    createdDate: '2026-02-15',
    notes: 'New client onboarding. KYC documents pending.',
    feedbacks: [],
    communications: [
      { id: 1, title: 'Onboarding Call', type: 'Call', date: '2026-06-10', notes: 'Explained onboarding process and timeline.', teamMember: 'Jennifer Lee' }
    ]
  },
  {
    id: 12,
    name: 'Arun Shetty',
    company: 'Coastal Builders Ltd',
    email: 'arun.shetty@coastalbuilders.com',
    phone: '+91 87650 98765',
    city: 'Mangalore',
    industry: 'Real Estate',
    assignedProjects: ['Website Redesign', 'Digital Marketing Campaign'],
    completedProjects: 3,
    pendingFeedback: 0,
    status: 'Completed',
    paymentStatus: 'Paid',
    projectValue: 550000,
    paidAmount: 550000,
    pendingAmount: 0,
    lastCommunication: '2026-06-19 10:00',
    createdDate: '2025-05-10',
    notes: 'All projects completed. Exploring next phase collaboration.',
    feedbacks: [
      { id: 1, message: 'Excellent work on website redesign. Our online inquiries increased by 60%.', project: 'Website Redesign', date: '2026-06-19', status: 'Resolved' },
      { id: 2, message: 'Marketing campaign ROI exceeded expectations. 5x return on investment.', project: 'Digital Marketing Campaign', date: '2026-06-18', status: 'Approved' }
    ],
    communications: [
      { id: 1, title: 'Project Closure Meeting', type: 'Meeting', date: '2026-06-19', notes: 'Successfully closed all active projects. Client very satisfied.', teamMember: 'Michael Roberts' },
      { id: 2, title: 'Next Phase Discussion', type: 'Call', date: '2026-06-18', notes: 'Discussed potential ERP implementation for next year.', teamMember: 'Emily Davidson' }
    ]
  }
];

export const billingSummary = {
  totalRevenue: 875000,
  pendingRevenue: 320000,
  overdueRevenue: 290000,
  paidClients: 8,
  pendingPayments: 3,
  overduePayments: 2,
  totalInvoices: 35
};