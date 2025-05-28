
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Info, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import AppLogo from '@/components/AppLogo';

export default function HomePage() {
  const features = [
    { title: "Wide Product Range", description: "Explore thousands of products across various categories.", icon: <ShoppingBag className="h-8 w-8 text-primary" /> },
    { title: "Exclusive Deals", description: "Get access to special discounts and offers daily.", icon: <Star className="h-8 w-8 text-primary" /> },
    { title: "Fast Shipping", description: "Quick and reliable delivery to your doorstep.", icon: <ArrowRight className="h-8 w-8 text-primary" /> },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container px-4 md:px-6 text-center">
          <div className="mb-8">
            <AppLogo size={64} className="mx-auto" textClassName="text-5xl sm:text-6xl md:text-7xl" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground mb-4">
            Welcome to E-Commerce Hub
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
            Discover an unparalleled shopping experience. Quality products, unbeatable prices, and exceptional service await you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Know More <Info className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-foreground">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products (Placeholder) */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-foreground">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Image 
                  src={`https://placehold.co/600x400.png?text=Product+${i}`} 
                  alt={`Featured Product ${i}`} 
                  width={600} 
                  height={400} 
                  className="w-full h-48 object-cover"
                  data-ai-hint="product retail"
                />
                <CardHeader>
                  <CardTitle className="text-lg">Product Name {i}</CardTitle>
                  <CardDescription className="text-primary font-semibold">$XX.XX</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/shop" passHref className="w-full">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Link href="/shop" passHref>
              <Button size="lg" variant="default">
                Explore All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
