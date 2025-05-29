
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ShoppingCart, Tag, Truck } from 'lucide-react';
import ProductDetailClient from './product-detail-client';
import type { Product } from '@/types';

// Mock data fetching function - in a real app, this would fetch from Supabase
async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // Find product in mock categories (this is very inefficient, just for demo)
   const mockProducts = (categoryId: string, count: number, baseName: string, basePrice: number) => 
    Array.from({ length: count }, (_, i) => ({
      id: `${categoryId}-p${i + 1}`,
      name: `${baseName} ${i + 1}`,
      description: `This is a detailed description for ${baseName} ${i + 1}. It's a high-quality item with many great features including feature A, benefit B, and characteristic C. Perfect for daily use or as a gift. Made from premium materials for durability and comfort. Available in various colors and sizes.`,
      images: [
        `https://placehold.co/600x400.png?text=${encodeURIComponent(baseName)}+${i+1}`,
        `https://placehold.co/600x400.png?text=${encodeURIComponent(baseName)}+${i+1}+View+2`,
        `https://placehold.co/600x400.png?text=${encodeURIComponent(baseName)}+${i+1}+View+3`,
      ],
      category: categoryId,
      brand: `Brand ${String.fromCharCode(65 + (i % 3))}`,
      mrp: parseFloat((basePrice * 1.2 * (1 + i * 0.05)).toFixed(2)),
      mop: parseFloat((basePrice * (1 + i * 0.05)).toFixed(2)),
      specialDiscount: (i % 2 === 0) ? 10 : undefined,
      wholesalePrice: parseFloat((basePrice * 0.7 * (1 + i * 0.05)).toFixed(2)),
      dataAiHint: "product detail"
    }));
  
  const allMockProducts: Product[] = [
    ...mockProducts('electronics', 12, "Gadget", 100),
    ...mockProducts('fashion', 15, "Apparel", 50),
    ...mockProducts('home-goods', 10, "Decor Item", 75),
    ...mockProducts('books', 18, "Novel", 20),
    ...mockProducts('sports', 9, "Gear", 60),
    ...mockProducts('brand-a-prod', 8, "BrandA Item", 120),
    ...mockProducts('brand-b-prod', 10, "BrandB Item", 90),
    ...mockProducts('brand-c-prod', 7, "BrandC Item", 150),
    ...mockProducts('brand-d-prod', 12, "BrandD Item", 40),
  ];

  const product = allMockProducts.find(p => p.id === id);
  return product || null;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link href="/shop" passHref className="mt-4 inline-block">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

// This function is needed for `next build` to generate static paths if you are not using dynamic rendering.
// For this demo, we will assume dynamic rendering on demand.
// export async function generateStaticParams() {
//   // For a real app, fetch all product IDs here
//   const mockProductIds = ['electronics-p1', 'fashion-p1', 'home-goods-p1']; // Example IDs
//   return mockProductIds.map((id) => ({ id }));
// }

