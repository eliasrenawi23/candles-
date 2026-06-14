import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Playfair_Display, Inter } from 'next/font/google';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "LUMIÈRE Candles | Premium Handmade Candles",
    he: "נרות LUMIÈRE | נרות פריมיום בעבודת יד",
    ar: "شموع LUMIÈRE | شموع فاخرة مصنوعة يدوياً"
  };
  const descriptions: Record<string, string> = {
    en: "Luxury handmade soy wax candles poured with love and devotion. Experience the soothing aroma and warm candlelit glow.",
    he: "נרות שעוות סויה יוקרתיים בעבודת יד שנמזגו באהבה ומסירות. חוו ארומה מרגיעה וזוהר נרות חם.",
    ar: "شموع شمع الصويا الفاخرة المصنوعة يدوياً بحب وتفانٍ. استمتع بالرائحة المهدئة وتوهج الشموع الدافئ."
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    icons: {
      icon: '/favicon.ico',
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get translation messages for the provider
  const messages = await getMessages();
  
  // Set text direction based on locale
  const dir = locale === 'he' || locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-nearblack text-cream selection:bg-gold selection:text-nearblack font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
