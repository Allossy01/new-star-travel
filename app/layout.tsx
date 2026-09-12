import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { BookingsProvider } from '@/lib/BookingsContext';
import { PackagesProvider } from '@/lib/PackagesContext';
import { FAQProvider } from '@/lib/FAQContext';

export const metadata: Metadata = {
  title: 'New Star Travel — Hajj & Umrah Packages',
  description: 'Your trusted partner for Hajj and Umrah. Premium packages from Algeria with 5-star hotels, flights, and professional guides.',
  keywords: 'Hajj, Umrah, travel agency, Algeria, Makkah, Madinah, pilgrimage',
  openGraph: {
    title: 'New Star Travel — Hajj & Umrah Packages',
    description: 'Your trusted partner for Hajj and Umrah. Premium packages from Algeria.',
    type: 'website',
    locale: 'en_US',
    siteName: 'New Star Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Star Travel — Hajj & Umrah Packages',
    description: 'Premium Hajj & Umrah packages from Algeria.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <BookingsProvider>
            <PackagesProvider>
              {children}
            </PackagesProvider>
          </BookingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
