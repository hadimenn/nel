import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback((email, password) => {
    setIsLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@loanpal.com' && password === 'password') {
          setIsAuthenticated(true);
          setIsLoading(false);
          resolve();
        } else {
          const errMessage = 'Invalid email or password.';
          setError(errMessage);
          setIsLoading(false);
          reject(new Error(errMessage));
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout, isLoading, error };
};
