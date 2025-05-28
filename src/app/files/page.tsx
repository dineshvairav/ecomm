
import FileManagementClient from './file-management-client';
import type { UploadedFile } from '@/types';

const mockFiles: UploadedFile[] = [
  { id: 'pdf1', name: 'Product Catalog 2024.pdf', type: 'pdf', url: '#', size: '5.2 MB', uploadedAt: '2024-07-01' },
  { id: 'img1', name: 'New Collection Banner.png', type: 'image', url: '#', size: '1.5 MB', uploadedAt: '2024-07-05' },
  { id: 'pdf2', name: 'User Manual - Gadget X.pdf', type: 'pdf', url: '#', size: '2.1 MB', uploadedAt: '2024-06-20' },
  { id: 'img2', name: 'Promotional Poster.jpg', type: 'image', url: '#', size: '3.0 MB', uploadedAt: '2024-06-15' },
  { id: 'pdf3', name: 'Warranty Information.pdf', type: 'pdf', url: '#', size: '0.5 MB', uploadedAt: '2024-05-10' },
];

export default function FileManagementPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <FileManagementClient initialFiles={mockFiles} />
    </div>
  );
}
