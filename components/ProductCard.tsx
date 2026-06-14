'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

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

  // WhatsApp configuration
  const WHATSAPP_NUMBER = '972501234567'; // Replace with actual number
  
  // Format WhatsApp message depending on language
  // Fallback if translations don't have custom message template yet
  const getWhatsAppLink = () => {
    let messageText = `Hi, I'm interested in ${name} from LUMIÈRE Candles`;
    
    try {
      const locale = tCatalog('title') === 'הקولקציה שלנו' ? 'he' : tCatalog('title') === 'مجموعتنا' ? 'ar' : 'en';
      if (locale === 'he') {
        messageText = `שלום, אני מעוניין/ת ב-${name} מנרות LUMIÈRE`;
      } else if (locale === 'ar') {
        messageText = `مرحباً، أنا مهتم بشراء ${name} من شموع LUMIÈRE`;
      }
    } catch (e) {
      // ignore
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
  };

  const priceFormatted = tCatalog('priceSuffix', { price: product.price });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-charcoal/40 transition-all duration-500 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)]">
      
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
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-gold hover:bg-gold-light border border-gold text-nearblack font-semibold py-3 px-4 shadow-md transition-all duration-300 transform group-hover:translate-y-0"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span className="tracking-wide text-sm">{tCatalog('orderWhatsApp')}</span>
          </a>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 rounded-md bg-nearblack/40 border border-gold/10 text-cream/30 font-semibold py-3 px-4 cursor-not-allowed"
          >
            <MessageCircle className="h-5 w-5 opacity-30" />
            <span className="tracking-wide text-sm">{tCatalog('orderWhatsApp')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
