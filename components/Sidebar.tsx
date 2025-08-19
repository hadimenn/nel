import React from 'react';
import type { View } from '../types';
import { DashboardIcon, DetailsIcon, PaymentIcon, HistoryIcon, ScheduleIcon, LogoutIcon } from './icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'details', label: 'Loan Details', icon: DetailsIcon },
  { id: 'payment', label: 'Make Payment', icon: PaymentIcon },
  { id: 'history', label: 'Payment History', icon: HistoryIcon },
  { id: 'schedule', label: 'Payment Schedule', icon: ScheduleIcon },
] as const;


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  return (
    <aside className="w-64 bg-brand-primary text-white flex-shrink-0 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-blue-900">
        <h1 className="text-xl font-bold tracking-wider">LoanPal</h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                    activeView === item.id
                      ? 'bg-brand-secondary'
                      : 'hover:bg-brand-dark'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4">
          <button
              onClick={onLogout}
              className="w-full flex items-center p-3 my-1 rounded-lg transition-colors duration-200 hover:bg-brand-dark"
          >
              <LogoutIcon className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
      <div className="p-4 border-t border-blue-900 text-center text-xs text-blue-300">
        <p>&copy; {new Date().getFullYear()} LoanPal Inc.</p>
        <p>Your trusted payment partner.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
