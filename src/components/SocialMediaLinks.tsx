
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialMediaLinks = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" asChild>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook className="h-5 w-5 text-primary hover:text-primary/80" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className="h-5 w-5 text-primary hover:text-primary/80" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="h-5 w-5 text-primary hover:text-primary/80" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin className="h-5 w-5 text-primary hover:text-primary/80" />
        </a>
      </Button>
    </div>
  );
};

export default SocialMediaLinks;
