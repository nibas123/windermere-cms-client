"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Set to false since we're bypassing auth
  const router = useRouter();

  const refreshUser = async () => {
    try {
      // Check if we're in the browser before accessing localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userProfile = await apiClient.getUserProfile();
          setUser(userProfile);
        }
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If token is invalid, clear it (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    // Since we're in development/testing mode, skip auth initialization
    // const initializeAuth = async () => {
    //   // Only run on client side
    //   if (typeof window !== 'undefined') {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //       try {
    //         await refreshUser();
    //       } catch (error) {
    //         console.error('Failed to initialize auth:', error);
    //         localStorage.removeItem('authToken');
    //       }
    //     }
    //   }
    //   setLoading(false);
    // };

    // initializeAuth();
    
    // For testing - just set loading to false immediately
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      console.log(response);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await apiClient.register(email, password, name);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    // Only access localStorage in browser
    if (typeof window !== 'undefined') {
      router.push('/auth/signin');
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 