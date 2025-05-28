
import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google'; // Changed Geist to Inter and Open_Sans
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Using Inter as primary sans-serif
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans', // Open Sans for body/descriptions
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: 'E-Commerce Hub',
  description: 'Your premier destination for online shopping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${openSans.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
