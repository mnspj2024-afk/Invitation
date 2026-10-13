import React from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface OpeningEnvelopeProps {
  guestName?: string;
  onUpdateGuestName?: (name: string) => void;
  onOpenInvitation: () => void;
  isOpened: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  onOpenInvitation,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20 overflow-hidden bg-gradient-to-b from-[#FDF5F2] via-[#FAF4ED] to-[#F5EFEB]">
      {/* Decorative organic background aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#EED9D2]/40 via-[#E8EFE9]/50 to-[#EFE1D4]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-4 right-8 w-32 h-32 bg-[#E2ECE3]/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-44 h-44 bg-[#F7E7E2]/70 rounded-full blur-2xl pointer-events-none" />

      {/* Main container */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center z-10">
        
        {/* Top Tagline (No date, cost, or location) */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E3D6C8] shadow-xs text-xs font-medium text-[#657866] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B68D5D]" />
          <span className="tracking-widest uppercase">Undangan Eksklusif Reuni 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[#3B2E24] font-bold tracking-tight leading-tight max-w-3xl mb-3">
          Selamat! Kamu diundang ke <span className="text-[#566D5B] italic font-serif">Reuni YAMIHI 2026</span>
        </h1>
        
        <p className="font-sans text-sm sm:text-base md:text-lg text-center text-[#6E5D4F] max-w-xl mb-8 leading-relaxed">
          A Time to Reconnect, A Moment to Remember 🏡✨
        </p>

        {/* ENVELOPE & POSTCARD SHOWCASE */}
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#E8DDD1] p-6 sm:p-9 md:p-11 transition-all duration-500">
          
          {/* Vintage Envelope Postal Header (No date, cost, or location) */}
          <div className="flex items-start justify-between border-b border-[#EFE5DA] pb-5 mb-6 gap-3">
            
            {/* Postal Seal & Airmail Stamp */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#596E5C] text-[#FAF6F0] flex flex-col items-center justify-center shadow-xs border border-[#485B4B]">
                <span className="text-[10px] font-bold tracking-widest leading-none">YAMIHI</span>
                <span className="text-xs font-serif font-semibold mt-0.5">2026</span>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-wider text-[#8C7A6B] uppercase">Air Mail · Special Delivery</div>
                <div className="text-xs text-[#524337] font-medium">
                  Official Invitation Letter
                </div>
              </div>
            </div>

            {/* Vintage Stamp Graphic (No price/cost, no location) */}
            <div className="relative group shrink-0">
              <div className="w-16 sm:w-20 h-20 sm:h-24 bg-[#FAF5EE] border-2 border-dashed border-[#CCA891] p-1.5 flex flex-col items-center justify-between text-center shadow-xs rotate-2 transition-transform duration-300 hover:rotate-0">
                <span className="text-[9px] font-mono tracking-wider text-[#937C6C] uppercase">PAR AVION</span>
                <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#EBF0EC] rounded-xs my-0.5 border border-[#D5DFD7]">
                  <Heart className="w-5 h-5 text-[#884B3B] fill-[#EACDC6]" />
                </div>
                <span className="text-[8px] font-semibold tracking-widest text-[#6E5D4F]">POSTAGE</span>
              </div>
            </div>
          </div>

          {/* Direct Recipient Box: Langsung "KELUARGA BESAR YAMIHI" */}
          <div className="bg-[#F8F4ED] rounded-xl p-4 sm:p-5 border border-[#E3D7C9] mb-8 relative">
            <div className="mb-1.5">
              <span className="text-xs font-medium text-[#7A6A5C] uppercase tracking-wider">
                Kepada Sahabat Tercinta:
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="font-serif-title text-xl sm:text-2xl md:text-3xl font-bold text-[#3B2E24] tracking-tight">
                KELUARGA BESAR YAMIHI
              </div>
              <span className="text-xs text-[#8A796B] italic font-handwriting text-base hidden sm:inline">
                Special Guests
              </span>
            </div>
          </div>

          {/* POLAROID PHOTOS PREVIEW (Vintage memory styling) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            
            {/* Polaroid 1: Friends Memories */}
            <div className="bg-white p-3 pb-4 rounded-lg shadow-md border border-[#EBE3D7] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-square w-full rounded overflow-hidden bg-[#F3ECE4]">
                <img
                  src="/src/assets/images/polaroid_friends_1791869985491.jpg"
                  alt="Kenangan Teman YAMIHI"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#FAF6F0]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-medium text-[#4B3B2F] border border-[#E2D5C7]">
                  Kenangan Manis
                </div>
              </div>
              <div className="pt-2 text-center">
                <p className="font-handwriting text-lg text-[#44352A] leading-none">
                  Keluarga Besar YAMIHI ♡
                </p>
                <p className="text-[11px] text-[#867566] mt-0.5">Cerita yang tak pernah usai</p>
              </div>
            </div>

            {/* Polaroid 2: BBQ Night Preview */}
            <div className="bg-white p-3 pb-4 rounded-lg shadow-md border border-[#EBE3D7] transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-square w-full rounded overflow-hidden bg-[#F3ECE4]">
                <img
                  src="/src/assets/images/polaroid_bbq_1791869985326.jpg"
                  alt="Malam BBQ Reuni Seru"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#FAF6F0]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-medium text-[#4B3B2F] border border-[#E2D5C7]">
                  Sunset BBQ & Chill
                </div>
              </div>
              <div className="pt-2 text-center">
                <p className="font-handwriting text-lg text-[#44352A] leading-none">
                  BBQ Party & Fun Games 🔥
                </p>
                <p className="text-[11px] text-[#867566] mt-0.5">Suasana hangat penuh tawa</p>
              </div>
            </div>
          </div>

          {/* WAX SEAL CALL TO ACTION BUTTON */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={onOpenInvitation}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#536854] via-[#5F7761] to-[#4D614E] text-[#FFFDF9] font-medium text-base sm:text-lg shadow-lg hover:shadow-xl hover:from-[#475A48] hover:to-[#415342] transition-all duration-300 transform active:scale-95 cursor-pointer border border-[#6B846D]"
            >
              {/* Wax Seal Icon */}
              <div className="w-8 h-8 rounded-full bg-[#8E4334] border border-[#A65B4C] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                <Mail className="w-4 h-4 text-[#FFF2EE]" />
              </div>

              <span className="tracking-wide font-serif">BUKA UNDANGAN</span>
              <span className="text-xl">💌</span>

              {/* Decorative subtle shine */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>

            <p className="text-xs text-[#827263] mt-3 flex items-center gap-1.5">
              <span>Klik tombol di atas untuk membuka surat</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
