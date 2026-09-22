// src/utils/authUtils.js
import { authUsers } from '../data/authUsersData';

const AUTH_STORAGE_KEY = 'pms_auth_user';

/**
 * Authenticate user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {object|null} User object without password or null
 */
export const loginUser = (email, password) => {
  const user = authUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) return null;

  // Return user without password
  const { password: _, ...safeUser } = user;
  return safeUser;
};

/**
 * Save authenticated user to localStorage
 * @param {object} user 
 */
export const setAuthUser = (user) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving auth user to localStorage:', error);
  }
};

/**
 * Get authenticated user from localStorage
 * @returns {object|null} Parsed user object or null
 */
export const getAuthUser = () => {
  try {
    const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error reading auth user from localStorage:', error);
    removeAuthUser();
    return null;
  }
};

/**
 * Remove authenticated user from localStorage
 */
export const removeAuthUser = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing auth user from localStorage:', error);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthUser();
};

/**
 * Check if user has one of the allowed roles
 * @param {object} user 
 * @param {string[]} allowedRoles 
 * @returns {boolean}
 */
export const hasRole = (user, allowedRoles) => {
  if (!user || !allowedRoles || allowedRoles.length === 0) return false;
  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z]/g, '');
  const actual = normalize(user.role || user.user_role);
  return allowedRoles.some(role => {
    const expected = normalize(role);
    if (expected === 'teammember') return ['teammember', 'team', 'teammembers'].includes(actual);
    if (expected === 'projectmanager') return ['projectmanager', 'manager'].includes(actual);
    return actual === expected;
  });
};

/**
 * Get dashboard path based on user role
 * @param {string} role 
 * @returns {string} Dashboard path
 */
export const getDashboardPathByRole = (role) => {
  const key = String(role || '').toLowerCase().replace(/[^a-z]/g, '');
  if (key === 'admin') return '/admin/dashboard';
  if (key === 'projectmanager' || key === 'manager') return '/manager/dashboard';
  if (key === 'teammember' || key === 'team' || key === 'teammembers') return '/team/dashboard';
  if (key === 'client') return '/client/dashboard';
  return '/';
};