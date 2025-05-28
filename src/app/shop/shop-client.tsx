
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import type { Category, Product, UserRole, Brand } from '@/types';

interface ShopClientProps {
  categories: Category[];
  brands: Brand[];
}

const ITEMS_PER_VIEW = 5;

const ProductCard = ({ product, userRole }: { product: Product; userRole: UserRole }) => {
  let displayPrice: string | number = product.mop || product.mrp;
  let originalPrice: string | number | undefined = product.mrp !== product.mop ? product.mrp : undefined;
  let priceLabel = "Price";

  if (userRole === 'guest') {
    displayPrice = product.mop || product.mrp;
    originalPrice = product.mrp !== product.mop ? product.mrp : undefined;
    priceLabel = "Our Price";
  } else if (userRole === 'user') {
    displayPrice = product.specialDiscount 
      ? (product.mop || product.mrp) * (1 - product.specialDiscount / 100) 
      : (product.mop || product.mrp);
    originalPrice = (product.mop || product.mrp);
    if (product.specialDiscount) priceLabel = "Special Price";
  } else if (userRole === 'dealer') {
    displayPrice = product.wholesalePrice || product.mop || product.mrp;
    originalPrice = product.mop !== displayPrice ? product.mop : (product.mrp !== displayPrice ? product.mrp : undefined);
    priceLabel = "Wholesale Price";
  }
  
  displayPrice = parseFloat(displayPrice.toString()).toFixed(2);
  if (originalPrice) originalPrice = parseFloat(originalPrice.toString()).toFixed(2);


  return (
    <Card className="w-full min-w-[200px] sm:min-w-[240px] max-w-xs flex-shrink-0 snap-start overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link href={`/shop/product/${product.id}`} className="block">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
          data-ai-hint={product.dataAiHint || "product item"}
        />
      </Link>
      <CardHeader className="p-3 sm:p-4">
        <Link href={`/shop/product/${product.id}`} className="block">
          <CardTitle className="text-base sm:text-lg font-semibold leading-tight hover:text-primary truncate" title={product.name}>
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground">{product.brand}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="text-sm sm:text-base font-bold text-primary">
          {priceLabel}: ${displayPrice}
        </div>
        {originalPrice && displayPrice !== originalPrice && (
          <div className="text-xs sm:text-sm text-muted-foreground line-through">
            MRP: ${originalPrice}
          </div>
        )}
        {userRole === 'user' && product.specialDiscount && (
           <div className="text-xs text-green-600 font-medium">{product.specialDiscount}% off!</div>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t mt-auto">
        <Link href={`/shop/product/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full text-xs sm:text-sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const HorizontalScroller = ({ title, children, dataAiHint }: { title: string, children: React.ReactNode, dataAiHint?: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll by 80% of visible width
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
        <div className="hidden sm:flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => scroll('left')} aria-label={`Scroll ${title} left`}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll('right')} aria-label={`Scroll ${title} right`}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
        <div ref={scrollRef} className="flex gap-4 sm:gap-6 snap-x snap-mandatory overflow-x-auto pb-2" data-ai-hint={dataAiHint}>
          {children}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </div>
  );
};


export default function ShopClient({ categories, brands }: ShopClientProps) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [visibleProducts, setVisibleProducts] = useState<Record<string, number>>({}); // categoryId/brandId -> count

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as UserRole;
    setUserRole(storedUserType || 'guest'); // Default to guest if not set
    
    const initialVisibleState: Record<string, number> = {};
    categories.forEach(cat => initialVisibleState[cat.id] = ITEMS_PER_VIEW);
    brands.forEach(brand => initialVisibleState[brand.id] = ITEMS_PER_VIEW);
    setVisibleProducts(initialVisibleState);

  }, [categories, brands]);

  const showMoreProducts = (id: string, totalProducts: number) => {
    setVisibleProducts(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || ITEMS_PER_VIEW) + ITEMS_PER_VIEW, totalProducts)
    }));
  };
  
  const showLessProducts = (id: string) => {
     setVisibleProducts(prev => ({
      ...prev,
      [id]: Math.max(ITEMS_PER_VIEW, (prev[id] || ITEMS_PER_VIEW) - ITEMS_PER_VIEW)
    }));
  }

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">Our Shop</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">Browse through our wide selection of products.</p>
      
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Shop by Category</h2>
        {categories.map((category) => (
          <div key={category.id} className="mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">{category.name}</h3>
            <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
              <div className="flex gap-4 sm:gap-6 snap-x snap-mandatory overflow-x-auto pb-2" data-ai-hint={category.dataAiHint}>
                {category.products.slice(0, visibleProducts[category.id] || ITEMS_PER_VIEW).map((product) => (
                  <ProductCard key={product.id} product={product} userRole={userRole} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
            <div className="mt-4 flex justify-end space-x-2">
              {(visibleProducts[category.id] || ITEMS_PER_VIEW) > ITEMS_PER_VIEW && (
                <Button variant="outline" onClick={() => showLessProducts(category.id)}>
                  <Minus className="mr-2 h-4 w-4" /> View Less
                </Button>
              )}
              {(visibleProducts[category.id] || ITEMS_PER_VIEW) < category.products.length && (
                <Button variant="default" onClick={() => showMoreProducts(category.id, category.products.length)}>
                  View More <Plus className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Brands Section */}
       <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Shop by Brand</h2>
         {brands.map((brand) => (
          <div key={brand.id} className="mb-10">
            <div className="flex items-center mb-4">
              {brand.logoUrl && <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={80} height={40} className="mr-4 object-contain" data-ai-hint="brand logo"/>}
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{brand.name}</h3>
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
              <div className="flex gap-4 sm:gap-6 snap-x snap-mandatory overflow-x-auto pb-2" data-ai-hint={brand.dataAiHint}>
                {brand.products.slice(0, visibleProducts[brand.id] || ITEMS_PER_VIEW).map((product) => (
                  <ProductCard key={product.id} product={product} userRole={userRole} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
            <div className="mt-4 flex justify-end space-x-2">
              {(visibleProducts[brand.id] || ITEMS_PER_VIEW) > ITEMS_PER_VIEW && (
                <Button variant="outline" onClick={() => showLessProducts(brand.id)}>
                  <Minus className="mr-2 h-4 w-4" /> View Less
                </Button>
              )}
              {(visibleProducts[brand.id] || ITEMS_PER_VIEW) < brand.products.length && (
                <Button variant="default" onClick={() => showMoreProducts(brand.id, brand.products.length)}>
                  View More <Plus className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
