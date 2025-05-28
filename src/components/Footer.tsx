
import Link from 'next/link';
import AppLogo from '@/components/AppLogo';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link href="/" passHref className="mb-4">
              <AppLogo textClassName="text-lg" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for amazing products and deals.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">Shop</Link></li>
              <li><Link href="/files" className="text-sm text-muted-foreground hover:text-primary">Downloads</Link></li>
              <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-md font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary shrink-0" />
                123 E-Commerce St, Web City, 10101
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary">(123) 456-7890</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary shrink-0" />
                <a href="mailto:info@ecommercehub.com" className="hover:text-primary">info@ecommercehub.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-foreground mb-4">Follow Us</h3>
            <SocialMediaLinks />
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} E-Commerce Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
