import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tonya Zenin | Design Portfolio',
  description: 'Senior multi-disciplinary designer specializing in brand, digital, and campaign work.',
  keywords: ['designer', 'brand design', 'motion design', 'digital design', 'portfolio'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Grain texture overlay */}
        <div className="grain" aria-hidden="true" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content with page transitions */}
        <PageTransition>
          <main>
            {children}
          </main>
        </PageTransition>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
