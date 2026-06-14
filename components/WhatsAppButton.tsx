import { Flame } from 'lucide-react';

export default function WhatsAppButton() {
  const WHATSAPP_NUMBER = '972501234567'; // Replace with actual number
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-crimson border-2 border-gold text-gold shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-all duration-300 hover:scale-110 hover:bg-crimson-dark hover:shadow-[0_0_30px_rgba(201,168,76,0.8)] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-nearblack group"
      aria-label="Contact on WhatsApp"
    >
      {/* Glow aura */}
      <span className="absolute inset-0 rounded-full bg-gold/10 animate-ping opacity-75 group-hover:animate-none"></span>
      
      {/* Flame Icon */}
      <Flame className="h-7 w-7 fill-current transition-transform duration-300 group-hover:scale-105 group-hover:text-gold-light" />
    </a>
  );
}
