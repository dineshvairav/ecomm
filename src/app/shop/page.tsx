
import ShopClient from './shop-client';
import type { Category, Brand } from '@/types';

const mockProducts = (categoryId: string, count: number, baseName: string, basePrice: number) => 
  Array.from({ length: count }, (_, i) => ({
    id: `${categoryId}-p${i + 1}`,
    name: `${baseName} ${i + 1}`,
    description: `This is a detailed description for ${baseName} ${i + 1}. It's a high-quality item with many great features.`,
    images: [`https://placehold.co/600x400.png?text=${encodeURIComponent(baseName)}+${i+1}`],
    category: categoryId,
    brand: `Brand ${String.fromCharCode(65 + (i % 3))}`, // Brand A, B, C
    mrp: parseFloat((basePrice * 1.2 * (1 + i * 0.05)).toFixed(2)),
    mop: parseFloat((basePrice * (1 + i * 0.05)).toFixed(2)),
    specialDiscount: (i % 2 === 0) ? 10 : undefined, // 10% discount for some
    wholesalePrice: parseFloat((basePrice * 0.7 * (1 + i * 0.05)).toFixed(2)),
    dataAiHint: "product electronics"
  }));

const mockCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', products: mockProducts('electronics', 12, "Gadget", 100), dataAiHint: "tech gadgets" },
  { id: 'fashion', name: 'Fashion', products: mockProducts('fashion', 15, "Apparel", 50), dataAiHint: "clothing style" },
  { id: 'home-goods', name: 'Home Goods', products: mockProducts('home-goods', 10, "Decor Item", 75), dataAiHint: "home decor" },
  { id: 'books', name: 'Books', products: mockProducts('books', 18, "Novel", 20), dataAiHint: "reading literature" },
  { id: 'sports', name: 'Sports', products: mockProducts('sports', 9, "Gear", 60), dataAiHint: "athletic equipment" },
];

const mockBrands: Brand[] = [
    { id: 'brand-a', name: 'AwesomeBrand', logoUrl: 'https://placehold.co/100x50.png?text=Brand+A', products: mockProducts('brand-a-prod', 8, "BrandA Item", 120), dataAiHint: "logo company" },
    { id: 'brand-b', name: 'BestChoice', logoUrl: 'https://placehold.co/100x50.png?text=Brand+B', products: mockProducts('brand-b-prod', 10, "BrandB Item", 90), dataAiHint: "logo company"  },
    { id: 'brand-c', name: 'CoolStuff Inc.', logoUrl: 'https://placehold.co/100x50.png?text=Brand+C', products: mockProducts('brand-c-prod', 7, "BrandC Item", 150), dataAiHint: "logo company"  },
    { id: 'brand-d', name: 'DailyNeeds Co.', logoUrl: 'https://placehold.co/100x50.png?text=Brand+D', products: mockProducts('brand-d-prod', 12, "BrandD Item", 40), dataAiHint: "logo company"  },
];


export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ShopClient categories={mockCategories} brands={mockBrands} />
    </div>
  );
}
