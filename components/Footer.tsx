import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Navbar');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/15 bg-nearblack py-12 text-cream/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Brand Name */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-gold hover:text-gold-light transition-colors">
            {t('brandName')}
          </Link>
          <p className="text-xs uppercase tracking-widest text-cream/40">
            Handcrafted Luxury Soy Candles
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto w-24 h-px bg-gold/30"></div>

        {/* Copyright */}
        <p className="text-xs tracking-wider">
          &copy; {year} {t('brandName')} Candles. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
