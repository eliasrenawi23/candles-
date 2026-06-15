'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { Menu, X, ChevronDown, Globe, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { items, setDrawerOpen } = useCartStore();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const locales = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'he', label: 'עברית', flag: '🇮🇱' },
    { code: 'ar', label: 'عربي', flag: '🇸🇦' }
  ];

  const currentLang = locales.find(l => l.code === locale) || locales[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gold/15 bg-nearblack/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/30 p-0.5 bg-crimson transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="LUMIÈRE logo"
                  fill
                  className="object-cover rounded-full"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                {t('brandName')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium tracking-wider text-cream/80 hover:text-gold transition-colors duration-200"
            >
              {t('home')}
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-medium tracking-wider text-cream/80 hover:text-gold transition-colors duration-200"
            >
              {t('catalog')}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-gold/20 bg-nearblack/50 px-4 py-1.5 text-sm font-medium text-cream hover:bg-gold/10 hover:border-gold/40 transition-all duration-300"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-4 w-4 text-gold" />
                <span>{currentLang.label}</span>
                <ChevronDown className={`h-3 w-3 text-gold transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-gold/20 bg-nearblack/95 p-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => handleLanguageChange(loc.code)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors duration-150 ${
                        locale === loc.code
                          ? 'bg-gold/10 text-gold'
                          : 'text-cream/80 hover:bg-gold/5 hover:text-cream'
                      }`}
                      style={{ direction: loc.code === 'he' || loc.code === 'ar' ? 'rtl' : 'ltr' }}
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-cream hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a84c] text-xs font-bold text-stone-900">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart Button Mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-1.5 text-cream hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a84c] text-[10px] font-bold text-stone-900">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Quick Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-nearblack/50 px-3 py-1 text-xs font-medium text-cream hover:bg-gold/10"
              >
                <Globe className="h-3.5 w-3.5 text-gold" />
                <span>{currentLang.code.toUpperCase()}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md border border-gold/20 bg-nearblack/95 p-1 shadow-lg z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => handleLanguageChange(loc.code)}
                      className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-cream/90 hover:bg-gold/10"
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-1.5 text-cream/80 hover:text-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="border-t border-gold/10 bg-nearblack md:hidden animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2.5 text-base font-medium text-cream/85 hover:bg-gold/5 hover:text-gold transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2.5 text-base font-medium text-cream/85 hover:bg-gold/5 hover:text-gold transition-colors"
            >
              {t('catalog')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
