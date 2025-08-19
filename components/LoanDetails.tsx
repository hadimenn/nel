import React from 'react';
import type { Loan } from '../types';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/formatters';

interface LoanDetailsProps {
  loan: Loan;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 px-4 border-b border-slate-200 last:border-b-0">
        <dt className="text-sm font-medium text-slate-500 w-full sm:w-1/3">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:w-2/3 font-semibold">{value}</dd>
    </div>
);

const LoanDetails: React.FC<LoanDetailsProps> = ({ loan }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Loan Details</h2>
      <Card>
        <dl>
            <DetailItem label="Loan ID" value={loan.id} />
            <DetailItem label="Lender Name" value={loan.lenderName} />
            <DetailItem label="Original Principal" value={formatCurrency(loan.principal)} />
            <DetailItem label="Loan Term" value={`${loan.termMonths} months (${loan.termMonths / 12} years)`} />
            <DetailItem label="Start Date" value={formatDate(loan.startDate)} />
            <DetailItem label="Standard Monthly Payment" value={formatCurrency(loan.monthlyPayment)} />
            <DetailItem label="Remaining Balance" value={formatCurrency(loan.remainingBalance)} />
            <DetailItem label="Months Paid" value={`${loan.paidMonths} of ${loan.termMonths}`} />
        </dl>
      </Card>
    </div>
  );
};

export default LoanDetails;
