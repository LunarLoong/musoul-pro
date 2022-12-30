const USERNAME_KEY = 'USERNAME';
const ROLE_KEY = 'ROLE';

export const getUsername = () => localStorage.getItem(USERNAME_KEY);

export const setUsername = (username: string) => localStorage.setItem(USERNAME_KEY, username);

export const removeUsername = () => localStorage.removeItem(USERNAME_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const setRole = (role: string) => localStorage.setItem(ROLE_KEY, role);

export const removeRole = () => localStorage.removeItem(ROLE_KEY);
