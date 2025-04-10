'use client';

import useAuth from '@/hooks/use-auth';
import React, { createContext, useContext } from 'react';

type UserType = {
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPreferences: { enable2FA: boolean };
};

type AuthContextType = {
  user?: UserType;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  const user = data?.data?.user;

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UseAuthContext must be used inside an AuthProvider');
  }
  return context;
};
