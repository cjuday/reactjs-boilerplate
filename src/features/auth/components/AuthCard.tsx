import type { PropsWithChildren } from 'react';

export default function AuthCard({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-md rounded-card bg-surface p-8 shadow-card">
      {children}
    </div>
  );
}