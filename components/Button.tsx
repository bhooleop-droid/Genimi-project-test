import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  glow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-nexus-accent hover:from-indigo-500 hover:to-purple-500 text-white border border-transparent",
    secondary: "bg-nexus-cyan text-black hover:bg-cyan-300 border border-transparent",
    outline: "bg-transparent border border-gray-700 text-gray-300 hover:border-nexus-accent hover:text-white hover:bg-white/5",
    danger: "bg-red-600 text-white hover:bg-red-500 border border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base tracking-wide",
  };

  const glowStyle = glow ? "shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;