import { useState, useEffect, useCallback } from 'react';
import type { Loan, Payment, ScheduledPayment } from '../types';
import { PaymentStatus } from '../types';

const INITIAL_PRINCIPAL = 3000000;
const INITIAL_INTEREST_RATE = 0; // Annual percentage
const INITIAL_TERM_YEARS = 5;

// Utility to add months to a date
const addMonths = (date: Date, months: number): Date => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

// Function to calculate monthly payment (M)
const calculateMonthlyPayment = (principal: number, annualRate: number, termYears: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  if (monthlyRate === 0) return principal / numberOfPayments;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return parseFloat(payment.toFixed(2));
};

// Function to generate the full amortization schedule
const generateSchedule = (loanData: Omit<Loan, 'remainingBalance' | 'totalInterestPaid' | 'nextPaymentDate' | 'nextPaymentAmount' | 'paidMonths'>): ScheduledPayment[] => {
  const schedule: ScheduledPayment[] = [];
  let balance = loanData.principal;
  const monthlyRate = loanData.interestRate / 100 / 12;

  for (let i = 0; i < loanData.termMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = loanData.monthlyPayment - interest;
    balance -= principalPaid;

    // Handle last payment adjustment
    let paymentAmount = loanData.monthlyPayment;
    if (i === loanData.termMonths - 1 && balance < 0.01 && balance > -0.01) {
        paymentAmount += balance;
        balance = 0;
    }

    schedule.push({
      paymentNumber: i + 1,
      dueDate: addMonths(loanData.startDate, i + 1),
      paymentAmount: paymentAmount,
      interest: parseFloat(interest.toFixed(2)),
      principal: parseFloat(principalPaid.toFixed(2)),
      remainingBalance: parseFloat(balance.toFixed(2)),
      status: PaymentStatus.Upcoming,
    });
  }
  return schedule;
};


const monthlyPayment = calculateMonthlyPayment(INITIAL_PRINCIPAL, INITIAL_INTEREST_RATE, INITIAL_TERM_YEARS);
const startDate = new Date();
startDate.setDate(1);

const initialLoan: Loan = {
  id: 'LN123456789',
  lenderName: 'Digital Bank Corp.',
  principal: INITIAL_PRINCIPAL,
  interestRate: INITIAL_INTEREST_RATE,
  termMonths: INITIAL_TERM_YEARS * 12,
  startDate: startDate,
  monthlyPayment: monthlyPayment,
  remainingBalance: INITIAL_PRINCIPAL,
  totalInterestPaid: 0,
  nextPaymentDate: addMonths(startDate, 1),
  nextPaymentAmount: monthlyPayment,
  paidMonths: 0
};

export const useLoan = () => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [paymentSchedule, setPaymentSchedule] = useState<ScheduledPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching initial data
    const schedule = generateSchedule(initialLoan);
    setLoan(initialLoan);
    setPaymentSchedule(schedule);
  }, []);

  const makePayment = useCallback((amount: number) => {
    setIsLoading(true);
    setError(null);
    
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => { // Simulate API call
            try {
                if (!loan) throw new Error("Loan data not available.");

                const monthlyRate = loan.interestRate / 100 / 12; // Will be 0
                const interestForMonth = loan.remainingBalance * monthlyRate; // Will be 0
                
                const principalPaid = amount - interestForMonth;
                const newBalance = loan.remainingBalance - principalPaid;

                const newPayment: Payment = {
                    id: `PAY${Date.now()}`,
                    date: new Date(),
                    amount,
                    principalPaid: parseFloat(principalPaid.toFixed(2)),
                    interestPaid: parseFloat(interestForMonth.toFixed(2)),
                    newBalance: parseFloat(newBalance.toFixed(2)),
                };
                
                const nextUnpaidIndex = paymentSchedule.findIndex(p => p.status === PaymentStatus.Upcoming);
                if (nextUnpaidIndex === -1) {
                    throw new Error("Loan has been fully paid.");
                }

                const updatedSchedule = [...paymentSchedule];
                updatedSchedule[nextUnpaidIndex] = {
                    ...updatedSchedule[nextUnpaidIndex],
                    status: PaymentStatus.Paid,
                };
                
                setPaymentHistory(prev => [...prev, newPayment]);
                setPaymentSchedule(updatedSchedule);

                const nextPayment = updatedSchedule.find(p => p.status === PaymentStatus.Upcoming);
                
                setLoan(prev => prev ? ({
                    ...prev,
                    remainingBalance: newBalance > 0 ? newBalance : 0,
                    totalInterestPaid: prev.totalInterestPaid + interestForMonth,
                    nextPaymentDate: nextPayment ? nextPayment.dueDate : prev.nextPaymentDate,
                    nextPaymentAmount: nextPayment ? nextPayment.paymentAmount : 0,
                    paidMonths: prev.paidMonths + 1
                }) : null);

                setIsLoading(false);
                resolve();
            } catch (e: any) {
                setError(e.message || "An unexpected error occurred.");
                setIsLoading(false);
                reject(e);
            }
        }, 1000);
    });
  }, [loan, paymentSchedule]);

  return { loan, paymentHistory, paymentSchedule, makePayment, isLoading, error };
};
