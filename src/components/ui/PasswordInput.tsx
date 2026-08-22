import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  showIcon?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  showIcon = true,
  className = '',
  id = 'password-input',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {showIcon && (
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        )}

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`w-full ${
            showIcon ? 'pl-10' : 'pl-3.5'
          } pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
            error
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-blue-600'
          } rounded-xl text-sm outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <Eye className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 font-medium animate-fadeIn pt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
