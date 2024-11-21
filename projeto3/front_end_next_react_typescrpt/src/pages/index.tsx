"use client";

import React from 'react';
import AuthGuard from '../utils/authGuard';

const Index: React.FC = () => {
  return (
    <AuthGuard children={undefined}>
    </AuthGuard>
  );
};

export default Index;