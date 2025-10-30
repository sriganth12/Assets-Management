
import React from 'react';
import { Asset } from '../types';
import AssetCard from './AssetCard';

interface AssetListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onEdit, onDelete }) => {
  if (assets.length === 0) {
    return (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No assets found</h3>
            <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
            </p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AssetList;
