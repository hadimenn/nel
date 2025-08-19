import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }
    try {
      await onLogin(email, password);
    } catch (err) {
      // Error is handled by the useAuth hook and passed as a prop
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-primary tracking-wider">LoanPal</h1>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">Sign in to your account</h2>
            <p className="mt-2 text-sm text-slate-600">Use <span className="font-semibold">user@loanpal.com</span> and <span className="font-semibold">password</span> to login.</p>
            <p className="mt-2 text-sm text-slate-600">
              You can access the application at this{' '}
              <a 
                href="https://aistudio.google.com/app/apps/drive/1kTQ1NKHMy9ZXPL0Kj5Qznb7RaJs0hfnM?showPreview=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-brand-primary hover:text-brand-dark"
              >
                link
              </a>.
            </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            {(error || localError) && <p className="text-sm text-red-600 text-center">{error || localError}</p>}


            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-slate-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;