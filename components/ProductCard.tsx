'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from '@/i18n/routing';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const tProducts = useTranslations('Products');
  const tCatalog = useTranslations('Catalog');
  const tCategories = useTranslations('Categories');

  // Load translations dynamically using ID
  const name = tProducts(`${product.id}.name`);
  const description = tProducts(`${product.id}.description`);
  const categoryLabel = tCategories(product.category);

  const locale = useLocale();
  const { addItem, setDrawerOpen } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name,
      price: product.price,
      image: product.image
    });
    setDrawerOpen(true);
  };

  const addToCartText = locale === 'he' ? 'הוסף לעגלה' : locale === 'ar' ? 'أضف إلى السلة' : 'Add to Cart';

  const priceFormatted = tCatalog('priceSuffix', { price: product.price });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-charcoal/40 transition-all duration-500 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)]">
      <Link href={`/catalog/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${name} details`} />
      
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-nearblack">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nearblack/90 via-transparent to-transparent opacity-80"></div>
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 rounded-full bg-crimson/90 border border-gold/20 px-3 py-1 text-xs font-semibold tracking-wider text-gold shadow-md uppercase">
          {categoryLabel}
        </span>

        {/* Out of Stock Overlay */}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-nearblack/80 backdrop-blur-[2px]">
            <span className="rounded-md border border-red-500/30 bg-red-950/80 px-4 py-2 text-sm font-bold tracking-widest text-red-400 uppercase shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-6 space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold tracking-wide text-cream group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          <span className="font-serif text-lg font-bold text-gold shrink-0">
            {priceFormatted}
          </span>
        </div>
        
        <p className="text-sm leading-relaxed text-cream/70 line-clamp-3 flex-1">
          {description}
        </p>

        {/* CTA Button */}
        {product.available ? (
          <button
            onClick={handleAddToCart}
            className="relative z-20 flex items-center justify-center gap-2 rounded-md bg-[#c9a84c] hover:bg-[#d8bd70] border border-[#c9a84c] text-stone-900 font-semibold py-3 px-4 shadow-md transition-all duration-300 transform group-hover:translate-y-0"
          >
            <ShoppingCart className="h-5 w-5 fill-current" />
            <span className="tracking-wide text-sm">{addToCartText}</span>
          </button>
        ) : (
          <button
            disabled
            className="relative z-20 flex items-center justify-center gap-2 rounded-md bg-stone-900/40 border border-[#c9a84c]/10 text-cream/30 font-semibold py-3 px-4 cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5 opacity-30" />
            <span className="tracking-wide text-sm">{addToCartText}</span>
          </button>
        )}
      </div>
    </div>
  );
}
