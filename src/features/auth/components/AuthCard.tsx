import type { PropsWithChildren } from 'react';

export default function AuthCard({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-md rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] bg-[var(--surface)] p-8 transition-all duration-300">
      {children}
    </div>
  );
}