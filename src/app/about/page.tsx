
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb, Building } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About E-Commerce Hub</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn more about our journey, mission, and the values that drive us to provide you with the best online shopping experience.
        </p>
      </section>

      <section className="mb-16">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  E-Commerce Hub started with a simple idea: to make online shopping easy, accessible, and enjoyable for everyone. Founded in [Year], we've grown from a small startup to a bustling online marketplace, connecting customers with quality products from trusted sellers.
                </p>
                <p className="text-muted-foreground">
                  Our platform is built on cutting-edge technology, ensuring a seamless and secure shopping experience. We are passionate about innovation and continuously strive to improve our services.
                </p>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Our Team Working"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md object-cover"
                  data-ai-hint="team collaboration"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Target className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To empower customers by providing a diverse range of high-quality products at competitive prices, backed by exceptional customer service.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To be the leading e-commerce platform known for innovation, reliability, and customer satisfaction globally.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Customer-centricity, Integrity, Innovation, Quality, and Community Engagement.</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center">
        <Building className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold text-foreground mb-4">Join Our Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We are more than just an e-commerce platform; we are a community of shoppers, sellers, and enthusiasts. Follow us on social media and subscribe to our newsletter for the latest updates, offers, and news.
        </p>
        {/* SocialMediaLinks could be re-imported here or rely on footer */}
      </section>
    </div>
  );
}
