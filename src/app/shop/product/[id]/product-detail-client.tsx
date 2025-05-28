
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ShoppingCart, Tag, Truck, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { Product, UserRole } from '@/types';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as UserRole;
    setUserRole(storedUserType || 'guest');
  }, []);

  let displayPrice: string | number = product.mop || product.mrp;
  let originalPrice: string | number | undefined = product.mrp !== product.mop ? product.mrp : undefined;
  let priceLabel = "Price";
  let discountInfo: string | null = null;

  if (userRole === 'guest') {
    displayPrice = product.mop || product.mrp;
    originalPrice = product.mrp !== product.mop ? product.mrp : undefined;
    priceLabel = "Market Price";
  } else if (userRole === 'user') {
    const basePrice = product.mop || product.mrp;
    if (product.specialDiscount) {
      displayPrice = basePrice * (1 - product.specialDiscount / 100);
      discountInfo = `${product.specialDiscount}% off!`;
    } else {
      displayPrice = basePrice;
    }
    originalPrice = basePrice;
    priceLabel = "Your Price";
  } else if (userRole === 'dealer') {
    displayPrice = product.wholesalePrice || product.mop || product.mrp;
    originalPrice = product.mop !== displayPrice ? product.mop : (product.mrp !== displayPrice ? product.mrp : undefined);
    priceLabel = "Wholesale Price";
  }
  
  displayPrice = parseFloat(displayPrice.toString()).toFixed(2);
  if (originalPrice && parseFloat(originalPrice.toString()).toFixed(2) === displayPrice) {
    originalPrice = undefined; // Don't show original if it's same as display
  } else if (originalPrice) {
    originalPrice = parseFloat(originalPrice.toString()).toFixed(2);
  }

  const handleAddToCart = () => {
    toast({
      title: `${product.name} added to cart!`,
      description: "Continue shopping or proceed to checkout.",
      action: (
        <Link href="/shop" passHref>
          <Button variant="outline" size="sm">
            Okay
          </Button>
        </Link>
      ),
    });
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={product.images[selectedImageIndex]}
              alt={`${product.name} - view ${selectedImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              priority={selectedImageIndex === 0}
              data-ai-hint={product.dataAiHint || "product image"}
            />
            {product.images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80" onClick={prevImage}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80" onClick={nextImage}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${selectedImageIndex === index ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-muted-foreground/50'}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${index+1}`} width={100} height={100} className="w-full h-full object-cover" data-ai-hint="product thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</CardTitle>
              <CardDescription className="text-md text-muted-foreground">
                Category: {product.category} | Brand: {product.brand}
              </CardDescription>
               <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">(123 Reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{priceLabel}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${displayPrice}</span>
                  {originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
                  )}
                </div>
                {discountInfo && (
                  <div className="mt-1 text-sm font-medium text-green-600 flex items-center">
                    <Tag className="h-4 w-4 mr-1" /> {discountInfo}
                  </div>
                )}
                {product.mrp && userRole !== 'guest' && <p className="text-xs text-muted-foreground mt-1">MRP: ${product.mrp.toFixed(2)}</p>}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  <span>In Stock - Ships within 24 hours</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Truck className="h-5 w-5 mr-2 text-primary" />
                  <span>Free standard shipping on orders over $50</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full text-lg py-6" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

