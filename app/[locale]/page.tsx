import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowDown, Flame } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tCatalog = await getTranslations('Catalog');

  // Slice first 3 products for featured section
  const featuredProducts = productsData.filter(p => p.available).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-nearblack">
        {/* Hero Section */}
        <section className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
          
          {/* Radial Gradient Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,15,26,0.45)_0%,rgba(26,10,10,1)_75%)] z-0"></div>

          {/* Golden Flicker Glow Aura behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[320px] h-[320px] rounded-full bg-gold/5 blur-[80px] animate-candle-glow z-0"></div>

          <div className="relative z-10 flex flex-col items-center max-w-3xl space-y-8">
            
            {/* Centered Logo with Flicker/Glow Animation */}
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border border-gold/20 p-2 bg-gradient-to-b from-crimson/30 to-nearblack shadow-[0_0_50px_rgba(107,15,26,0.3)] animate-flicker">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-gold/10">
                <Image
                  src="/logo.png"
                  alt="LUMIÈRE Logo"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>

            {/* Brand Title & Tagline */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-widest text-gold drop-shadow-md">
                LUMIÈRE
              </h1>
              <p className="font-serif text-lg md:text-2xl font-light tracking-widest text-cream/90 uppercase">
                {t('tagline')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 w-full max-w-md">
              <a
                href="#featured"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-gold hover:bg-gold-light border border-gold text-nearblack font-bold py-4 px-8 shadow-lg hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{t('cta')}</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
              <Link
                href="/catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-transparent hover:bg-gold/10 border border-gold/30 hover:border-gold text-gold font-bold py-4 px-8 transition-all duration-300"
              >
                <span>{tCatalog('all')}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Intro / Story Section */}
        <section className="relative bg-nearblack border-t border-gold/10 px-4 py-24">
          <div className="mx-auto max-w-4xl border border-gold/15 rounded-lg bg-charcoal/20 p-8 md:p-16 relative">
            {/* Decorative Gold Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/30 rounded-tl-md"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/30 rounded-tr-md"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/30 rounded-bl-md"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/30 rounded-br-md"></div>

            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Flame className="h-5 w-5 text-gold animate-pulse" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-gold">
                  {t('aboutTitle')}
                </h2>
                <Flame className="h-5 w-5 text-gold animate-pulse" />
              </div>
              <div className="h-px w-20 bg-gold/30 mx-auto"></div>
              <p className="text-base md:text-lg leading-relaxed text-cream/80 font-light">
                {t('aboutText1')}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-cream/80 font-light">
                {t('aboutText2')}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Catalog Section */}
        <section id="featured" className="border-t border-gold/10 bg-charcoal/10 px-4 py-24 scroll-mt-20">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-gold">
                {tCatalog('title')}
              </h2>
              <p className="text-cream/75 max-w-xl mx-auto font-light">
                {tCatalog('subtitle')}
              </p>
              <div className="mx-auto w-16 h-0.5 bg-gold/40"></div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View Full Catalog CTA */}
            <div className="text-center pt-8">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-crimson hover:bg-crimson-dark border border-gold/20 hover:border-gold text-cream font-bold py-4 px-10 shadow-lg hover:shadow-crimson/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {tCatalog('all')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
