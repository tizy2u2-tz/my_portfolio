import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Tonya Zenin | Design Portfolio',
  description: 'Senior multi-disciplinary designer specializing in brand, digital, and campaign work.',
  keywords: ['designer', 'brand design', 'motion design', 'digital design', 'portfolio'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen">
        {/* Grain texture overlay */}
        <div className="grain" aria-hidden="true" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content with page transitions */}
        <PageTransition>
          <main className="pt-20">
            {children}
          </main>
        </PageTransition>
      </body>
    </html>
  );
}
