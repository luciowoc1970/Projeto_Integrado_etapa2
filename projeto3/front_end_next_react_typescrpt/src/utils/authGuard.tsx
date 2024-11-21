"use client";

import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuth } from './authContext';

const publicRoutes = [ '/login' ];

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthGuard;