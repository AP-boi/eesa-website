import React, { useState } from 'react';
import {
  X, LogIn, UserPlus, GraduationCap, CheckCircle2, AlertCircle, Mail, User, Phone
} from 'lucide-react';
import { supabase, sendLoginNotificationEmail } from '@/lib/supabase';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { PasswordInput } from '@/components/ui/PasswordInput';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: { email: string; fullName?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setErrorMsg(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    // Name validation for signup
    if (mode === 'signup' && !fullName.trim()) {
      setNameError('Full name is required for registration.');
      isValid = false;
    }

    if (!isValid) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        let loggedInName = fullName || email.split('@')[0];

        if (import.meta.env.VITE_SUPABASE_URL) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
          });
          if (!error && data?.user) {
            loggedInName = data.user.user_metadata?.full_name || email.split('@')[0];
          }
        }
        
        // Trigger automated background login notification to user's email
        sendLoginNotificationEmail(email.trim(), loggedInName, 'login_alert');

        setSuccessMsg(`Welcome back, ${loggedInName}!`);
        setTimeout(() => {
          onSuccess({ email: email.trim(), fullName: loggedInName });
          onClose();
        }, 700);

      } else {
        let registeredName = fullName.trim() || email.split('@')[0];

        if (import.meta.env.VITE_SUPABASE_URL) {
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                full_name: fullName.trim(),
                phone: phone.trim()
              }
            }
          });
          if (!error && data?.user) {
            registeredName = data.user.user_metadata?.full_name || fullName.trim();
          }
        }

        // Trigger automated welcome & confirmation email to user's email
        sendLoginNotificationEmail(email.trim(), registeredName, 'signup_welcome');

        setSuccessMsg(`Student account created successfully for ${registeredName}!`);
        setTimeout(() => {
          onSuccess({ email: email.trim(), fullName: registeredName });
          onClose();
        }, 700);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className={`bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-2 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400 mb-1">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Student & Alumni Login' : 'Create Student Account'}
          </h3>
          <p className="text-xs text-slate-300">
            {mode === 'login'
              ? 'Access course materials, mock test reports & schedules'
              : 'Join EESA Academy West Delhi for test prep & fluency'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-800 p-1 rounded-xl mt-4 border border-slate-700">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
                setEmailError(null);
                setPasswordError(null);
                setNameError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
                setSuccessMsg(null);
                setEmailError(null);
                setPasswordError(null);
                setNameError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-blue-600 dark:text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    placeholder="e.g. Vikramaditya Singh"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all`}
                  />
                </div>
                {nameError && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Mobile Number (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98101 26691"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Email Address <span className="text-blue-600 dark:text-blue-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="student@gmail.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                  emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                } rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all`}
              />
            </div>
            {emailError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <PasswordInput
              label="Password *"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              error={passwordError}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2 flex justify-center">
            <StatefulButton
              onClick={handleSubmit}
              className="w-full py-3 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </StatefulButton>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                      setEmailError(null);
                      setPasswordError(null);
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Sign Up Now
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                      setEmailError(null);
                      setPasswordError(null);
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
