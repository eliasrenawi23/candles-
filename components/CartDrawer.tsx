'use client';

import { useCartStore } from '../store/cartStore';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={() => setDrawerOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800">
          <h2 className="text-2xl font-serif text-[#c9a84c]">Your Cart</h2>
          <button 
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-stone-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-stone-400 mt-10">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                <div className="relative w-20 h-24 bg-stone-800 rounded-lg overflow-hidden shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-white">{item.name}</h3>
                    <p className="text-[#c9a84c] mt-1">₪{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-stone-900 rounded-full px-3 py-1 border border-stone-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-stone-400 hover:text-white disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-stone-400 hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-[#8b1c31] transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-800 bg-stone-900">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-400">Subtotal</span>
              <span className="text-2xl font-serif text-[#c9a84c]">₪{subtotal}</span>
            </div>
            <button 
              onClick={() => setDrawerOpen(false)}
              className="w-full py-4 bg-[#c9a84c] text-stone-950 font-medium rounded-xl hover:bg-[#d8bd70] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
