
import React from 'react';

interface HeaderProps {
  onAddNew: () => void;
}

const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.998a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 .521-1.43L4.5 10.5h15l.729 2.22a2.25 2.25 0 0 1 .521 1.43ZM5.25 12.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H5.25ZM10.5 12.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H10.5ZM15.75 12.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5a2.25 2.25 0 0 0-2.25 2.25v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v.75a.75.75 0 0 0 1.5 0v-.75a2.25 2.25 0 0 0-2.25-2.25H4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.75a3 3 0 0 0-6 0h6Z" />
    </svg>
);

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onAddNew }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <BriefcaseIcon className="h-8 w-8 text-brand-primary" />
            <h1 className="text-2xl font-bold text-gray-800">
              Company Asset Manager
            </h1>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-primary rounded-lg shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Asset</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
