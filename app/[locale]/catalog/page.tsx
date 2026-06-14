import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CatalogFilterList from '@/components/CatalogFilterList';
import productsData from '@/data/products.json';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Product Catalog | LUMIÈRE Candles",
    he: "קטלוג מוצרים | נרות LUMIÈRE",
    ar: "كتالوج المنتجات | شموع LUMIÈRE"
  };
  const descriptions: Record<string, string> = {
    en: "Explore our collection of premium handmade candles. Classic Scented, Special Edition, and Aromatherapy candles.",
    he: "חקרו את קולקציית נרות הפרימיום שלנו בעבודת יד. נרות ריחניים קלאסיים, מהדורות מיוחדות וארומתרפיה.",
    ar: "اكتشف مجموعتنا من الشموع الفاخرة المصنوعة يدوياً. شموع معطرة كلاسيكية، إصدارات خاصة، وشموع العلاج العطري."
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('Catalog');

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-nearblack py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide text-gold">
              {t('title')}
            </h1>
            <p className="text-cream/80 text-base md:text-lg font-light leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="mx-auto w-20 h-0.5 bg-gold/30"></div>
          </div>

          {/* Interactive Catalog Filter List */}
          <CatalogFilterList products={productsData} />

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
