export type View = 'dashboard' | 'details' | 'payment' | 'history' | 'schedule';

export interface Loan {
  id: string;
  lenderName: string;
  principal: number;
  interestRate: number; // Annual Percentage Rate (APR)
  termMonths: number;
  startDate: Date;
  monthlyPayment: number;
  remainingBalance: number;
  totalInterestPaid: number;
  nextPaymentDate: Date;
  nextPaymentAmount: number;
  paidMonths: number;
}

export interface Payment {
  id: string;
  date: Date;
  amount: number;
  principalPaid: number;
  interestPaid: number;
  newBalance: number;
}

export enum PaymentStatus {
    Paid = 'Paid',
    Upcoming = 'Upcoming',
    Overdue = 'Overdue'
}

export interface ScheduledPayment {
  paymentNumber: number;
  dueDate: Date;
  paymentAmount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  status: PaymentStatus;
}
