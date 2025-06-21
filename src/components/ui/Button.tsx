"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'card';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  animate?: boolean;
  cardContent?: React.ReactNode; // For complex card-like content
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'ghost',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  href,
  target,
  rel,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  type = 'button',
  animate = true,
  cardContent,
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all',
    'duration-300',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'gradient-border-hover',
  ];

  // Size variants
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm', 'gap-1.5'],
    md: ['px-4', 'py-2', 'text-sm', 'gap-2'],
    lg: ['px-6', 'py-3', 'text-base', 'gap-2.5'],
  };

  // Variant classes - using CSS classes instead of inline styles
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    outline: 'button-outline nav-gradient-border',
    ghost: 'button-ghost',
    card: 'button-card',
  };

  const classes = [
    ...baseClasses,
    ...sizeClasses[size],
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
        </svg>
      )}
      {cardContent ? (
        cardContent
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  const buttonProps = {
    className: classes,
    disabled: disabled || loading,
    onClick: onClick,
  };

  if (href) {
    const Component = animate ? motion.a : 'a';
    return (
      <Component
        href={href}
        target={target}
        rel={rel}
        {...buttonProps}
        {...(animate && {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        })}
      >
        {content}
      </Component>
    );
  }

  const Component = animate ? motion.button : 'button';
  return (
    <Component
      type={type}
      {...buttonProps}
      {...(animate && {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      })}
    >
      {content}
    </Component>
  );
};

export default Button; 