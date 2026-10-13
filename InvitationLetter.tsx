import React from 'react';
import { Sparkles, ArrowDown, Heart, Compass, Users } from 'lucide-react';

interface InvitationLetterProps {
  guestName: string;
  onExploreDetails: () => void;
}

export const InvitationLetter: React.FC<InvitationLetterProps> = ({
  guestName,
  onExploreDetails,
}) => {
  return (
    <section 
      id="invitation-letter-section"
      className="relative min-h-screen py-16 px-4 flex items-center justify-center bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#F3ECE4] overflow-hidden"
    >
      {/* Subtle organic light reflections */}
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-[#E3EDE4]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-[#F9E9DF]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-3xl mx-auto z-10">
        
        {/* Editorial Chapter Indicator */}
        <div className="text-center mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#667B68] bg-[#EBF1EC] px-3.5 py-1 rounded-full border border-[#D5E1D7]">
            Surat Resmi Undangan
          </span>
        </div>

        {/* Parchment Letter Container */}
        <div className="relative bg-[#FFFDF8] rounded-3xl shadow-2xl border border-[#E6D9CB] p-7 sm:p-12 md:p-16 transition-all">
          
          {/* Subtle Vintage Letter Header Decoration */}
          <div className="flex items-center justify-between border-b border-[#EFE4D6] pb-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#596E5C]" />
              <span className="text-xs tracking-widest uppercase font-semibold text-[#8C7A6A]">
                The Official Letter
              </span>
            </div>
            <div className="font-serif italic text-sm text-[#796758]">
              Sentul, Bogor · 2026
            </div>
          </div>

          {/* Multilingual Greetings requested by user */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center flex-wrap gap-2 sm:gap-3 bg-[#F6F0E7] px-4 py-2.5 rounded-2xl border border-[#E7DBCF] mb-4">
              <span className="text-sm sm:text-base font-semibold text-[#382D24] flex items-center gap-1.5">
                <span>🇰🇷</span> ANNYEONG!
              </span>
              <span className="text-[#C4B3A2]">·</span>
              <span className="text-sm sm:text-base font-semibold text-[#382D24] flex items-center gap-1.5">
                <span>🇨🇳</span> NI HAO!
              </span>
              <span className="text-[#C4B3A2]">·</span>
              <span className="text-sm sm:text-base font-semibold text-[#382D24] flex items-center gap-1.5">
                <span>🇯🇵</span> KONNICHIWA!
              </span>
            </div>

            <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl text-[#362A21] font-bold tracking-tight">
              Salam hangat untuk seluruh keluarga YAMIHI! <span className="inline-block animate-pulse">💖</span>
            </h2>

            {guestName && guestName !== 'Keluarga Besar YAMIHI' && (
              <p className="mt-3 text-sm sm:text-base font-medium text-[#596E5C]">
                Teruntuk sahabat kami: <span className="underline decoration-[#95AFA7] decoration-2 font-semibold text-[#3B2F25]">{guestName}</span>
              </p>
            )}
          </div>

          {/* Core Letter Body (User Prompt verbatim) */}
          <div className="space-y-6 text-[#4F3F32] font-sans text-base sm:text-lg leading-relaxed sm:leading-loose">
            
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#596E5C]">
              Dengan penuh sukacita, kami mengundang teman-teman YAMIHI untuk hadir dalam acara <strong className="font-semibold text-[#2C2119]">Reuni YAMIHI 2026</strong>, sebuah kesempatan istimewa untuk kembali berkumpul, mempererat tali silaturahmi, berbagi cerita, dan menciptakan kenangan indah bersama.
            </p>

            <div className="p-5 sm:p-6 bg-[#F8F4ED]/80 rounded-2xl border border-[#EAE0D3] my-6">
              <p className="italic text-[#46382D]">
                "Mari sejenak meluangkan waktu dari kesibukan masing-masing untuk menikmati kebersamaan melalui berbagai kegiatan seru, mulai dari BBQ, makan bersama, games seru, hingga menikmati waktu santai di villa asri kawasan Sentul." <span className="inline-block not-italic">🥰</span>
              </p>
            </div>

            <p>
              Kami sangat berharap kehadiran teman-teman dapat menambah kehangatan dan kemeriahan acara ini. Jadi, mari berkumpul kembali dan ciptakan momen yang berkesan bersama keluarga YAMIHI! <span className="inline-block">🫶🏻</span>
            </p>
          </div>

          {/* Letter Closing & Sign-off */}
          <div className="mt-10 pt-8 border-t border-[#EFE4D6] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-[#857364] font-medium">Tertanda dengan cinta,</div>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#536854] font-bold mt-1">
                Panitia Reuni YAMIHI 2026
              </div>
              <div className="text-xs text-[#8F7D6D] mt-0.5">A Time to Reconnect, A Moment to Remember</div>
            </div>

            {/* Wax seal imprint */}
            <div className="flex items-center gap-3 bg-[#FAF6F0] px-4 py-2 rounded-2xl border border-[#E3D8CC]">
              <div className="w-10 h-10 rounded-full bg-[#8E4334] text-[#FFFDF8] flex items-center justify-center font-serif font-bold text-xs shadow-inner">
                YMH
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-[#3C2E24]">Villa Sakala Home</div>
                <div className="text-[#7A6A5B]">21 Nov 2026</div>
              </div>
            </div>
          </div>

          {/* Explore Details CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={onExploreDetails}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#596E5C] hover:bg-[#4A5D4D] text-[#FFFDF8] font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <span>Lihat Detail Acara, Lokasi & Biaya</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            <p className="text-xs text-[#8D7D6E] mt-2">
              Villa, Google Maps, Biaya Rp400k, Fasilitas & Checklist Barang Bawaan
            </p>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E6D9CC] text-center">
            <Compass className="w-5 h-5 text-[#596E5C] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#382B21]">Sentul Sakala Home</div>
            <div className="text-[11px] text-[#7A695B]">Udara sejuk & villa privat</div>
          </div>
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E6D9CC] text-center">
            <Heart className="w-5 h-5 text-[#884B3B] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#382B21]">BBQ & Keakraban</div>
            <div className="text-[11px] text-[#7A695B]">Makan bersama & curhat santai</div>
          </div>
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E6D9CC] text-center">
            <Users className="w-5 h-5 text-[#596E5C] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#382B21]">Kenangan Abadi</div>
            <div className="text-[11px] text-[#7A695B]">Games, foto & tawa bersama</div>
          </div>
        </div>

      </div>
    </section>
  );
};
