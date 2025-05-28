
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Gift, Truck } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    icon: <Gift className="h-16 w-16 text-primary" />,
    title: "Discover Amazing Products",
    description: "Explore a vast collection of items curated just for you. Find everything you need in one place.",
    image: "https://placehold.co/600x400.png?text=Products",
    dataAiHint: "shopping variety"
  },
  {
    icon: <CheckCircle className="h-16 w-16 text-primary" />,
    title: "Seamless & Secure Checkout",
    description: "Enjoy a hassle-free and secure payment process. Your data is always protected with us.",
    image: "https://placehold.co/600x400.png?text=Secure+Checkout",
    dataAiHint: "secure payment"
  },
  {
    icon: <Truck className="h-16 w-16 text-primary" />,
    title: "Fast & Reliable Delivery",
    description: "Get your orders delivered to your doorstep quickly and efficiently. Track your package in real-time.",
    image: "https://placehold.co/600x400.png?text=Fast+Delivery",
    dataAiHint: "delivery shipping"
  },
];

export default function OnboardingClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/auth/signin');
    }
  };

  const slide = slides[currentSlide];

  return (
    <Card className="w-full max-w-md shadow-2xl transform transition-all duration-500 ease-in-out">
      <CardHeader className="items-center text-center p-6">
        <div className="mb-4">{slide.icon}</div>
        <CardTitle className="text-2xl font-bold">{slide.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center p-6">
        <Image 
          src={slide.image} 
          alt={slide.title} 
          width={600} 
          height={400} 
          className="rounded-md mb-6 aspect-video object-cover"
          data-ai-hint={slide.dataAiHint}
        />
        <CardDescription className="text-md text-muted-foreground">
          {slide.description}
        </CardDescription>
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6">
        <Button onClick={handleNext} className="w-full text-lg py-6">
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
