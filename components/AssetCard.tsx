import React from 'react';
// FIX: Import AssetType to use it for type-safe icon mapping.
import { Asset, AssetStatus, AssetType } from '../types';

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
}

const statusColorMap: Record<AssetStatus, string> = {
  [AssetStatus.Available]: 'bg-status-available',
  [AssetStatus.InUse]: 'bg-status-in-use',
  [AssetStatus.Maintenance]: 'bg-status-maintenance',
  [AssetStatus.Retired]: 'bg-status-retired',
};

const LaptopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
);
const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);
const OtherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.92a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m15.45-1.5H6.225a4.5 4.5 0 0 1-4.332-2.328l-1.18-2.361a4.5 4.5 0 0 1 2.36-5.845l.13-.065A4.5 4.5 0 0 1 6.225 3h11.55a4.5 4.5 0 0 1 4.332 2.328l1.18 2.361a4.5 4.5 0 0 1-2.36 5.845l-.13.065Z" />
    </svg>
);
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 0 0 .41-1.412A9.995 9.995 0 0 0 10 12c-2.31 0-4.438.784-6.131 2.095Z" />
  </svg>
);


const AssetCard: React.FC<AssetCardProps> = ({ asset, onEdit, onDelete }) => {
  const { name, type, serialNumber, assignedTo, status, description, imageUrl, id } = asset;

  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  // FIX: Used AssetType enum for keys for better type safety.
  const typeIcons: Record<AssetType, React.ReactElement> = {
    [AssetType.Laptop]: <LaptopIcon className="h-6 w-6 text-gray-500" />,
    [AssetType.Camera]: <CameraIcon className="h-6 w-6 text-gray-500" />,
    [AssetType.Phone]: <PhoneIcon className="h-6 w-6 text-gray-500" />,
    [AssetType.Other]: <OtherIcon className="h-6 w-6 text-gray-500" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        <span
          className={`absolute top-2 right-2 text-xs font-semibold text-white px-2 py-1 rounded-full ${statusColorMap[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          {typeIcons[type]}
          <p className="ml-2 text-sm font-semibold text-gray-600">{type}</p>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-2">SN: {serialNumber}</p>
        <p className="text-sm text-gray-600 flex-grow mb-4">{description}</p>
        
        <div className="border-t border-gray-200 pt-3 mt-auto">
            <div className="flex items-center text-sm text-gray-700">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>{assignedTo || 'Unassigned'}</span>
            </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(asset)}
          className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
