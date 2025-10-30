import React, { useState, useEffect } from 'react';
import { Asset, AssetType, AssetStatus } from '../types';
import { generateAssetDescription } from '../services/geminiService';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (asset: Asset) => void;
  assetToEdit: Asset | null;
}

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const AssetModal: React.FC<AssetModalProps> = ({ isOpen, onClose, onSave, assetToEdit }) => {
  const [formData, setFormData] = useState<Omit<Asset, 'id' | 'imageUrl'>>({
    name: '',
    type: AssetType.Laptop,
    serialNumber: '',
    assignedTo: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    status: AssetStatus.Available,
    description: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (assetToEdit) {
      setFormData({
        name: assetToEdit.name,
        type: assetToEdit.type,
        serialNumber: assetToEdit.serialNumber,
        assignedTo: assetToEdit.assignedTo,
        purchaseDate: assetToEdit.purchaseDate,
        status: assetToEdit.status,
        description: assetToEdit.description,
      });
    } else {
      setFormData({
        name: '',
        type: AssetType.Laptop,
        serialNumber: '',
        assignedTo: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        status: AssetStatus.Available,
        description: '',
      });
    }
  }, [assetToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
        alert("Please enter an asset name first.");
        return;
    }
    setIsGenerating(true);
    const description = await generateAssetDescription(formData.name, formData.type);
    setFormData(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset: Asset = {
      id: assetToEdit ? assetToEdit.id : new Date().getTime().toString(),
      ...formData,
      imageUrl: assetToEdit?.imageUrl || `https://picsum.photos/seed/${formData.serialNumber || Math.random()}/400/300`,
    };
    onSave(newAsset);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{assetToEdit ? 'Edit Asset' : 'Add New Asset'}</h2>
        </div>
        {/* FIX: Added id to form to be associated with the submit button */}
        <form onSubmit={handleSubmit} id="asset-form" className="overflow-y-auto flex-grow">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Asset Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Asset Type</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                {Object.values(AssetType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number</label>
              <input type="text" name="serialNumber" id="serialNumber" value={formData.serialNumber} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
              <input type="text" name="assignedTo" id="assignedTo" placeholder="e.g., John Doe" value={formData.assignedTo} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">Purchase Date</label>
              <input type="date" name="purchaseDate" id="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                {Object.values(AssetStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"></textarea>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-brand-primary bg-blue-100 rounded-md hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-500 transition-all"
              >
                <SparklesIcon className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
          </div>
        </form>
        <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">Cancel</button>
          {/* FIX: Removed redundant onClick and pointed 'form' attribute to the correct form id */}
          <button type="submit" form="asset-form" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-blue-800">Save Asset</button>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;
