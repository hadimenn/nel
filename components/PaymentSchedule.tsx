import React from 'react';
import type { ScheduledPayment, View } from '../types';
import { PaymentStatus } from '../types';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/formatters';

interface PaymentScheduleProps {
  schedule: ScheduledPayment[];
  setActiveView: (view: View) => void;
}

const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.Paid:
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>;
        case PaymentStatus.Upcoming:
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>;
        case PaymentStatus.Overdue:
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Overdue</span>;
        default:
            return null;
    }
};

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ schedule, setActiveView }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Payment Schedule</h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Principal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {schedule.map((payment) => (
                <tr key={payment.paymentNumber} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{payment.paymentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(payment.dueDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.paymentAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.principal)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatCurrency(payment.remainingBalance)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{getStatusBadge(payment.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.status === PaymentStatus.Upcoming && (
                      <button
                        onClick={() => setActiveView('payment')}
                        className="text-brand-secondary hover:text-brand-dark font-semibold"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSchedule;
