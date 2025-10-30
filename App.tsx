
import React, { useState, useMemo } from 'react';
import { Asset, AssetType, AssetStatus } from './types';
import Header from './components/Header';
import AssetList from './components/AssetList';
import FilterControls from './components/FilterControls';
import AssetModal from './components/AssetModal';

// Mock initial data
const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3',
    type: AssetType.Laptop,
    serialNumber: 'C02Z1234ABCD',
    assignedTo: 'Alice Johnson',
    purchaseDate: '2023-11-01',
    status: AssetStatus.InUse,
    description: 'High-performance laptop for design and development tasks.',
    imageUrl: 'https://picsum.photos/seed/C02Z1234ABCD/400/300',
  },
  {
    id: '2',
    name: 'Sony Alpha 7 IV',
    type: AssetType.Camera,
    serialNumber: 'SN-A7IV-5678',
    assignedTo: 'Bob Williams',
    purchaseDate: '2023-05-15',
    status: AssetStatus.InUse,
    description: 'Full-frame mirrorless camera for professional photography and videography.',
    imageUrl: 'https://picsum.photos/seed/SN-A7IV-5678/400/300',
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    type: AssetType.Phone,
    serialNumber: 'IP15P-91011',
    assignedTo: '',
    purchaseDate: '2023-09-20',
    status: AssetStatus.Available,
    description: 'Company mobile phone for communication and testing.',
    imageUrl: 'https://picsum.photos/seed/IP15P-91011/400/300',
  },
    {
    id: '4',
    name: 'Dell XPS 15',
    type: AssetType.Laptop,
    serialNumber: 'DXPS15-121314',
    assignedTo: 'Charlie Brown',
    purchaseDate: '2022-08-10',
    status: AssetStatus.InUse,
    description: 'Windows laptop for general business and marketing use.',
    imageUrl: 'https://picsum.photos/seed/DXPS15-121314/400/300',
  },
  {
    id: '5',
    name: 'Logitech C920 Webcam',
    type: AssetType.Other,
    serialNumber: 'LOGI-C920-1516',
    assignedTo: '',
    purchaseDate: '2023-01-05',
    status: AssetStatus.Maintenance,
    description: 'Shared webcam for conference rooms, currently undergoing firmware update.',
    imageUrl: 'https://picsum.photos/seed/LOGI-C920-1516/400/300',
  },
   {
    id: '6',
    name: 'Old ThinkPad T480',
    type: AssetType.Laptop,
    serialNumber: 'TPT480-171819',
    assignedTo: '',
    purchaseDate: '2019-03-25',
    status: AssetStatus.Retired,
    description: 'Decommissioned laptop, scheduled for recycling.',
    imageUrl: 'https://picsum.photos/seed/TPT480-171819/400/300',
  },
];


function App() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAddNew = () => {
    setAssetToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (asset: Asset) => {
    setAssetToEdit(asset);
    setIsModalOpen(true);
  };

  const handleDelete = (assetId: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter(asset => asset.id !== assetId));
    }
  };

  const handleSave = (asset: Asset) => {
    const index = assets.findIndex(a => a.id === asset.id);
    if (index > -1) {
      const updatedAssets = [...assets];
      updatedAssets[index] = asset;
      setAssets(updatedAssets);
    } else {
      setAssets([asset, ...assets]);
    }
    setIsModalOpen(false);
  };
  
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchTermLower) ||
        asset.serialNumber.toLowerCase().includes(searchTermLower) ||
        asset.assignedTo.toLowerCase().includes(searchTermLower);
      
      const matchesType = typeFilter === 'all' || asset.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [assets, searchTerm, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header onAddNew={handleAddNew} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          assetCount={filteredAssets.length}
        />
        <AssetList assets={filteredAssets} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        assetToEdit={assetToEdit}
      />
    </div>
  );
}

export default App;
