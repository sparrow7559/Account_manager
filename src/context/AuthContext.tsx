import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => boolean;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that manages authentication state
 * Uses localStorage to persist user sessions
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Register a new user
   * Stores user data in localStorage
   */
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return false; // User already exists
      }

      // Create new user object
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        password, // In production, this should be hashed
        firstName,
        lastName,
      };

      // Add new user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  /**
   * Login user with email and password
   * Validates credentials against stored users
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Find user with matching credentials
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Remove password from user object before storing in state
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  /**
   * Logout current user
   * Clears user from state and localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  /**
   * Update user information
   * Updates both state and localStorage
   */
  const updateUser = (updatedUser: Partial<User>): boolean => {
    try {
      if (!user) return false;

      // Update current user
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      // Update in users array
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const userIndex = users.findIndex((u: any) => u.id === user.id);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('users', JSON.stringify(users));
      }

      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use auth context
 * Throws error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
