import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'dark';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = true,
  variant = 'default',
  onClick,
}: CardProps) {
  const base =
    variant === 'dark'
      ? 'bg-dark-card text-card-white border-2 border-accent-orange/30 rounded-sm p-4'
      : 'bg-card-white text-dark-bg border-2 border-dark-border rounded-sm p-4';

  return (
    <div
      className={`${base} ${hover ? 'pixel-shadow-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
