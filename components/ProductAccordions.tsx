'use client';

import { useState } from 'react';
import { ChevronDown, Wind, Droplets, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ScentNotes {
  top: string[];
  middle: string[];
  base: string[];
}

interface ProductAccordionsProps {
  scentNotes: ScentNotes;
  ingredients: string;
}

export default function ProductAccordions({ scentNotes, ingredients }: ProductAccordionsProps) {
  const t = useTranslations('ProductDetails');
  const [openSection, setOpenSection] = useState<string | null>('scent');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: 'scent',
      title: t('scentProfile'),
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Wind className="w-5 h-5 text-gold mt-0.5 opacity-80" />
            <div>
              <span className="block text-sm font-semibold text-cream/90">{t('topNotes')}</span>
              <span className="text-sm text-cream/70">{scentNotes.top.join(', ')}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 text-gold mt-0.5 opacity-80" />
            <div>
              <span className="block text-sm font-semibold text-cream/90">{t('middleNotes')}</span>
              <span className="text-sm text-cream/70">{scentNotes.middle.join(', ')}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Leaf className="w-5 h-5 text-gold mt-0.5 opacity-80" />
            <div>
              <span className="block text-sm font-semibold text-cream/90">{t('baseNotes')}</span>
              <span className="text-sm text-cream/70">{scentNotes.base.join(', ')}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ingredients',
      title: t('ingredients'),
      content: (
        <p className="text-sm text-cream/70 leading-relaxed">{ingredients}</p>
      )
    },
    {
      id: 'care',
      title: t('burnCare'),
      content: (
        <ul className="text-sm text-cream/70 space-y-2 list-disc list-inside">
          <li>Trim the wick to 1/4 inch before every burn.</li>
          <li>Allow the wax to melt to the edges of the jar on the first burn.</li>
          <li>Never leave a burning candle unattended.</li>
          <li>Keep away from drafts, children, and pets.</li>
        </ul>
      )
    },
    {
      id: 'shipping',
      title: t('shipping'),
      content: (
        <p className="text-sm text-cream/70 leading-relaxed">
          Free standard shipping on all orders over $100. Returns are accepted within 14 days of delivery for unused products in their original packaging.
        </p>
      )
    }
  ];

  return (
    <div className="border-t border-gold/20 mt-8 divide-y divide-gold/10">
      {sections.map((section) => (
        <div key={section.id} className="py-4">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full text-left focus:outline-none group"
          >
            <span className="font-serif text-lg tracking-wide text-cream/90 group-hover:text-gold transition-colors">
              {section.title}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gold transition-transform duration-300 ${
                openSection === section.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openSection === section.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}
