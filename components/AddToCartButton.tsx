'use client';

import { useCartStore } from '../store/cartStore';
import { useTranslations } from 'next-intl';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    available: boolean;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const t = useTranslations('ProductDetails');
  const { addItem, setDrawerOpen } = useCartStore();

  if (!product.available) {
    return (
      <button disabled className="w-full py-4 px-6 bg-cream/10 text-cream/50 uppercase tracking-widest font-semibold cursor-not-allowed">
        {t('outOfStock')}
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        setDrawerOpen(true);
      }}
      className="w-full py-4 px-6 bg-gold text-nearblack hover:bg-cream hover:text-nearblack uppercase tracking-widest font-semibold transition-colors duration-300 shadow-lg shadow-gold/10"
    >
      {t('addToCart')}
    </button>
  );
}
