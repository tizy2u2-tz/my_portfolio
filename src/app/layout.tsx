import type { Metadata } from 'next';
import { Space_Grotesk, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

const displayFont = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
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
