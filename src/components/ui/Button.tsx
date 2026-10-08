import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, to, onClick, variant = 'primary', className, type = 'button', disabled }: ButtonProps) {
  const btnClass = clsx(styles.button, styles[`variant-${variant}`], className);

  if (to) {
    return (
      <Link to={to} className={btnClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={btnClass} disabled={disabled}>
      {children}
    </button>
  );
}