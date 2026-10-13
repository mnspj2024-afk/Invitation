import React from 'react';

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
  onOpenInvitation: () => void;
  isOpened: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo, onOpenInvitation, isOpened }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DDCE]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif-title text-base sm:text-lg font-bold tracking-tight text-[#3B2E24] whitespace-nowrap shrink-0 hover:text-[#596E5C] transition-colors"
        >
          Reuni YAMIHI 2026
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#6E5D4F]">
          <button
            onClick={() => onScrollTo('invitation-letter-section')}
            className="hover:text-[#3B2E24] transition-colors whitespace-nowrap shrink-0"
          >
            Surat Undangan
          </button>
          <button
            onClick={() => onScrollTo('details-section')}
            className="hover:text-[#3B2E24] transition-colors whitespace-nowrap shrink-0"
          >
            Villa & Lokasi
          </button>
          <button
            onClick={() => onScrollTo('details-section')}
            className="hover:text-[#3B2E24] transition-colors whitespace-nowrap shrink-0"
          >
            Biaya & Fasilitas
          </button>
          <button
            onClick={() => onScrollTo('details-section')}
            className="hover:text-[#3B2E24] transition-colors whitespace-nowrap shrink-0"
          >
            Checklist Barang
          </button>
          <button
            onClick={() => onScrollTo('rsvp-form')}
            className="hover:text-[#3B2E24] transition-colors whitespace-nowrap shrink-0"
          >
            RSVP Kehadiran
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {isOpened ? (
            <button
              onClick={() => onScrollTo('rsvp-form')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#596E5C] hover:bg-[#485A4A] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              RSVP Sekarang
            </button>
          ) : (
            <button
              onClick={onOpenInvitation}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#596E5C] hover:bg-[#485A4A] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              Buka Undangan 💌
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
