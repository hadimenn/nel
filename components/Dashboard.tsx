import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Loan, ScheduledPayment } from '../types';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/formatters';

interface DashboardProps {
  loan: Loan;
  paymentSchedule: ScheduledPayment[];
}

const Dashboard: React.FC<DashboardProps> = ({ loan, paymentSchedule }) => {
  const payoffProgress = (loan.principal - loan.remainingBalance) / loan.principal * 100;

  const chartData = paymentSchedule.map(p => ({
    name: `Month ${p.paymentNumber}`,
    Balance: p.remainingBalance > 0 ? p.remainingBalance : 0,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Remaining Balance">
            <p className="text-3xl font-bold text-brand-primary">{formatCurrency(loan.remainingBalance)}</p>
            <p className="text-sm text-slate-500">out of {formatCurrency(loan.principal)}</p>
        </Card>
        <Card title="Next Payment">
            <p className="text-3xl font-bold text-slate-800">{formatCurrency(loan.nextPaymentAmount)}</p>
            <p className="text-sm text-slate-500">Due on {formatDate(loan.nextPaymentDate)}</p>
        </Card>
        <Card title="Loan Payoff Progress">
          <div className="w-full bg-slate-200 rounded-full h-2.5 my-2">
            <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${payoffProgress.toFixed(2)}%` }}></div>
          </div>
          <p className="text-right text-lg font-bold text-slate-800">{payoffProgress.toFixed(2)}%</p>
        </Card>
      </div>

      <Card title="Loan Balance Over Time">
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value as number, 0)}/>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="Balance" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
