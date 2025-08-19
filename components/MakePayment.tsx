import React, { useState } from 'react';
import type { Loan } from '../types';
import Card from './Card';
import Modal from './Modal';
import { formatCurrency, formatDate } from '../utils/formatters';

interface MakePaymentProps {
  loan: Loan;
  makePayment: (amount: number) => Promise<void>;
  isLoading: boolean;
}

const MakePayment: React.FC<MakePaymentProps> = ({ loan, makePayment, isLoading }) => {
  const [paymentAmount, setPaymentAmount] = useState<string>(loan.nextPaymentAmount.toFixed(2));
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastPaidAmount, setLastPaidAmount] = useState(0);

  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid payment amount.');
      return;
    }
    
    try {
      await makePayment(amount);
      setLastPaidAmount(amount);
      setIsModalOpen(true);
      setPaymentAmount(loan.nextPaymentAmount.toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 text-center">Make a Payment</h2>
        <Card>
          <div className="p-6">
            <div className="text-center mb-6">
                <p className="text-sm text-slate-500">Next payment of {formatCurrency(loan.nextPaymentAmount)} is due on {formatDate(loan.nextPaymentDate)}</p>
                <p className="text-lg font-semibold">Current Balance: <span className="text-brand-primary">{formatCurrency(loan.remainingBalance)}</span></p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="paymentAmount" className="block text-sm font-medium text-slate-700">Payment Amount</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₦</span>
                    </div>
                    <input
                        type="text"
                        name="paymentAmount"
                        id="paymentAmount"
                        className="block w-full rounded-md border-slate-300 pl-7 pr-12 focus:border-brand-secondary focus:ring-brand-secondary sm:text-lg"
                        value={paymentAmount}
                        onChange={handlePaymentAmountChange}
                        aria-describedby="payment-amount"
                        disabled={isLoading}
                    />
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                <button type="button" onClick={() => setPaymentAmount(loan.monthlyPayment.toFixed(2))} className="text-sm py-1 px-3 bg-slate-200 hover:bg-slate-300 rounded-full" disabled={isLoading}>Pay Minimum</button>
                <button type="button" onClick={() => setPaymentAmount((loan.monthlyPayment + 5000).toFixed(2))} className="text-sm py-1 px-3 bg-slate-200 hover:bg-slate-300 rounded-full" disabled={isLoading}>+ ₦5000</button>
                <button type="button" onClick={() => setPaymentAmount((loan.monthlyPayment + 10000).toFixed(2))} className="text-sm py-1 px-3 bg-slate-200 hover:bg-slate-300 rounded-full" disabled={isLoading}>+ ₦10000</button>
              </div>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-slate-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Submit Payment'}
              </button>
            </form>
          </div>
        </Card>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
            <p className="mt-2 text-slate-600">Your payment of {formatCurrency(lastPaidAmount)} has been processed.</p>
            <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-primary text-base font-medium text-white hover:bg-brand-dark focus:outline-none"
            >
                Close
            </button>
        </div>
      </Modal>
    </>
  );
};

export default MakePayment;
