import React from 'react';
import type { Payment } from '../types';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/formatters';

interface PaymentHistoryProps {
  history: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Payment History</h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Principal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">New Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {history.length > 0 ? (
                history.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{formatDate(payment.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.principalPaid)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.newBalance)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-500">No payment history yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PaymentHistory;
