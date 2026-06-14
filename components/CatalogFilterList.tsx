'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard, { Product } from './ProductCard';

interface CatalogFilterListProps {
  products: Product[];
}

export default function CatalogFilterList({ products }: CatalogFilterListProps) {
  const tCatalog = useTranslations('Catalog');
  const tCategories = useTranslations('Categories');

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: tCatalog('all') },
    { id: 'classic', label: tCategories('classic') },
    { id: 'special', label: tCategories('special') },
    { id: 'therapy', label: tCategories('therapy') }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="space-y-12">
      
      {/* Category Filter Bar */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-cream/40 font-semibold">
          {tCatalog('filterLabel')}
        </span>
        <div className="flex flex-wrap justify-center gap-3 bg-charcoal/20 border border-gold/10 p-1.5 rounded-full max-w-2xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2.5 text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gold text-nearblack shadow-md shadow-gold/20'
                  : 'text-cream/80 hover:bg-gold/5 hover:text-gold'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 animate-in fade-in duration-300">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gold/10 rounded-lg bg-charcoal/10">
          <p className="text-cream/60 text-lg font-light">
            {tCatalog('noProducts')}
          </p>
        </div>
      )}
      
    </div>
  );
}
