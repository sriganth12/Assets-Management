
export enum AssetType {
  Laptop = 'Laptop',
  Camera = 'Camera',
  Phone = 'Phone',
  Other = 'Other',
}

export enum AssetStatus {
  Available = 'Available',
  InUse = 'In Use',
  Maintenance = 'Maintenance',
  Retired = 'Retired',
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  serialNumber: string;
  assignedTo: string;
  purchaseDate: string;
  status: AssetStatus;
  description: string;
  imageUrl: string;
}
