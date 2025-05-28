
"use client";
import Link from 'next/link';
import AppLogo from '@/components/AppLogo';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary" onClick={onClick}>
      {children}
    </Button>
  </Link>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    // Optionally redirect to home or refresh
    window.location.href = '/';
  };
  
  const closeSheet = () => setIsSheetOpen(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/files', label: 'Downloads' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" passHref className="flex items-center">
          <AppLogo size={28} textClassName="text-lg sm:text-xl" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map(item => <NavLink key={item.href} href={item.href}>{item.label}</NavLink>)}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                <UserCircle className="mr-2 h-4 w-4" />
                {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : 'Profile'}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin" passHref>
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="relative hidden">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">0</span>
          </Button>
          
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center mb-4">
                     <Link href="/" passHref onClick={closeSheet}>
                        <AppLogo size={28} textClassName="text-lg"/>
                     </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  {navItems.map(item => <NavLink key={item.href} href={item.href} onClick={closeSheet}>{item.label}</NavLink>)}
                  <div className="pt-4 border-t border-border">
                  {isLoggedIn ? (
                    <>
                       <div className="flex items-center mb-2">
                        <UserCircle className="mr-2 h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : 'Profile'}</span>
                       </div>
                      <Button variant="outline" className="w-full" onClick={() => {handleSignOut(); closeSheet();}}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/signin" passHref onClick={closeSheet}>
                      <Button variant="default" className="w-full">Sign In</Button>
                    </Link>
                  )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
