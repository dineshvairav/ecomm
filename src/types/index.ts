
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  mrp: number; // Maximum Retail Price
  mop?: number; // Market Operating Price (for guests and users)
  specialDiscount?: number; // Percentage or amount (for signed-in users)
  wholesalePrice?: number; // (for dealer users)
  dataAiHint?: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
  dataAiHint?: string;
}

export interface Brand {
    id: string;
    name: string;
    logoUrl?: string;
    products: Product[];
    dataAiHint?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string; // Mock URL for download
  size: string; // e.g., "2.5 MB"
  uploadedAt: string; // e.g., "2023-10-26"
}

export type UserRole = 'guest' | 'user' | 'dealer' | null;
