import React, { useState, useCallback } from 'react';
import type { View } from './types';
import { useLoan } from './hooks/useLoan';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LoanDetails from './components/LoanDetails';
import MakePayment from './components/MakePayment';
import PaymentHistory from './components/PaymentHistory';
import PaymentSchedule from './components/PaymentSchedule';
import Login from './components/Login';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const { 
    loan, 
    paymentHistory, 
    paymentSchedule, 
    makePayment, 
    isLoading: isLoanLoading,
    error: loanError 
  } = useLoan();

  const {
    isAuthenticated,
    login,
    logout,
    isLoading: isAuthLoading,
    error: authError
  } = useAuth();

  const renderView = useCallback(() => {
    if (!loan) {
      return <div className="p-8 text-center text-slate-500">Loading loan data...</div>;
    }
    
    switch (activeView) {
      case 'dashboard':
        return <Dashboard loan={loan} paymentSchedule={paymentSchedule} />;
      case 'details':
        return <LoanDetails loan={loan} />;
      case 'payment':
        return <MakePayment loan={loan} makePayment={makePayment} isLoading={isLoanLoading} />;
      case 'history':
        return <PaymentHistory history={paymentHistory} />;
      case 'schedule':
        return <PaymentSchedule schedule={paymentSchedule} setActiveView={setActiveView} />;
      default:
        return <Dashboard loan={loan} paymentSchedule={paymentSchedule} />;
    }
  }, [activeView, loan, paymentSchedule, makePayment, isLoanLoading, paymentHistory]);

  if (!isAuthenticated) {
    return <Login onLogin={login} isLoading={isAuthLoading} error={authError} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={logout} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {loanError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">{loanError}</div>}
        {renderView()}
      </main>
    </div>
  );
};

export default App;