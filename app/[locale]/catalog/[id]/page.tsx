import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import productsData from '@/data/products.json';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductGallery from '@/components/ProductGallery';
import ProductAccordions from '@/components/ProductAccordions';
import AddToCartButton from '@/components/AddToCartButton';

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const product = productsData.find((p) => p.id === id);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: 'Products.' + product.id });

  return {
    title: `${t('name')} | LUMIÈRE Candles`,
    description: t('description'),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const productData = productsData.find((p) => p.id === id);
  
  if (!productData) {
    notFound();
  }

  const t = await getTranslations('Products.' + productData.id);
  const tDetails = await getTranslations('ProductDetails');
  const tCatalog = await getTranslations('Catalog');

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-nearblack py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Gallery */}
            <div className="w-full">
              <ProductGallery image={productData.image} name={t('name')} />
            </div>

            {/* Right Column: Details */}
            <div className="w-full space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <p className="text-gold text-sm tracking-widest uppercase font-semibold">
                  {productData.category}
                </p>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-cream">
                  {t('name')}
                </h1>
                <p className="text-2xl font-light text-cream/90">
                  {tCatalog('priceSuffix', { price: productData.price })}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-cream/70 leading-relaxed font-light">
                {t('description')}
              </p>

              {/* Quick Specs */}
              <div className="flex gap-8 py-4 border-y border-gold/20">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-gold mb-1">{tDetails('burnTime')}</span>
                  <span className="text-sm text-cream/90">{productData.burnTime}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-gold mb-1">{tDetails('size')}</span>
                  <span className="text-sm text-cream/90">{productData.size}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="pt-4">
                <AddToCartButton 
                  product={{
                    ...productData,
                    name: t('name'),
                  }} 
                />
              </div>

              {/* Accordions */}
              <ProductAccordions 
                scentNotes={productData.scentNotes} 
                ingredients={productData.ingredients} 
              />

            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
