import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="px-4 py-3 sm:px-6 border-b border-slate-200">
          <h3 className="text-lg leading-6 font-medium text-slate-900">{title}</h3>
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
