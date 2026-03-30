'use client';

import useAuthStore from '@/stores/useAuthStore';

interface AdminActionsProps {
  children: React.ReactNode;
}

export default function AdminActions({ children }: AdminActionsProps) {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  if (!isAdmin) return null;
  return <>{children}</>;
}
