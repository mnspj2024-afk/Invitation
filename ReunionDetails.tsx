import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  DollarSign, 
  Copy, 
  Check, 
  Share2, 
  Plus, 
  Trash2, 
  Clock, 
  Instagram, 
  UtensilsCrossed, 
  Flame, 
  Sparkles, 
  Shirt, 
  Smartphone, 
  Wind, 
  Pill, 
  Waves, 
  ShieldCheck,
  Send,
  MessageSquareHeart,
  ChevronRight
} from 'lucide-react';
import { PackingItem, GuestRSVP } from '../types';

const INITIAL_PACKING_ITEMS: PackingItem[] = [
  { id: '1', name: 'Pakaian ganti secukupnya (2 hari 1 malam)', icon: 'shirt', category: 'Pakaian', packed: false },
  { id: '2', name: 'Perlengkapan mandi & perawatan pribadi', icon: 'bottle', category: 'Pribadi', packed: false },
  { id: '3', name: 'Pakaian renang & kacamata renang', icon: 'swim', category: 'Olahraga', optional: true, packed: false },
  { id: '4', name: 'Charger HP atau power bank cadangan', icon: 'power', category: 'Elektronik', packed: false },
  { id: '5', name: 'Jaket atau pakaian hangat (Sentul berhawa dingin malam hari)', icon: 'jacket', category: 'Pakaian', packed: false },
  { id: '6', name: 'Obat-obatan pribadi atau vitamin harian', icon: 'pill', category: 'Kesehatan', packed: false },
];

const INITIAL_RSVPS: GuestRSVP[] = [
  {
    id: 'rsvp-1',
    name: 'Panitia Reuni YAMIHI',
    status: 'hadir',
    pax: 2,
    message: 'Sudah tidak sabar kumpul bareng lagi di Villa Sakala Home! Sampai jumpa semua teman-teman tercinta! ❤️',
    createdAt: 'Baru saja'
  },
  {
    id: 'rsvp-2',
    name: 'Kevin & Keluarga',
    status: 'hadir',
    pax: 2,
    message: 'Pasti hadir! Siap bawa gitar dan bantu bakar-bakar BBQ nanti malam 🔥',
    createdAt: '1 jam yang lalu'
  }
];

interface ReunionDetailsProps {
  guestName: string;
}

export const ReunionDetails: React.FC<ReunionDetailsProps> = ({ guestName }) => {
  // Countdown to Saturday, Nov 21, 2026 14:00 WIB
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Packing list state
  const [packingList, setPackingList] = useState<PackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('yamihi_packing_list');
      return saved ? JSON.parse(saved) : INITIAL_PACKING_ITEMS;
    } catch {
      return INITIAL_PACKING_ITEMS;
    }
  });
  const [newPackingItem, setNewPackingItem] = useState('');

  // RSVP Form state
  const [rsvps, setRsvps] = useState<GuestRSVP[]>(() => {
    try {
      const saved = localStorage.getItem('yamihi_rsvps');
      if (saved) {
        const parsed: GuestRSVP[] = JSON.parse(saved);
        return parsed.filter(item => item.id !== 'rsvp-3' && !item.name.toLowerCase().includes('sarah amanda'));
      }
      return INITIAL_RSVPS;
    } catch {
      return INITIAL_RSVPS;
    }
  });
  const [rsvpName, setRsvpName] = useState(guestName !== 'Keluarga Besar YAMIHI' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [rsvpPax, setRsvpPax] = useState<number>(1);
  const [rsvpMessage, setRsvpMessage] = useState<string>('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Bank Copy State
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Calculator Pax
  const [calcPax, setCalcPax] = useState<number>(1);

  // Update Countdown
  useEffect(() => {
    const targetDate = new Date('2026-11-21T14:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save packing list
  useEffect(() => {
    try {
      localStorage.setItem('yamihi_packing_list', JSON.stringify(packingList));
    } catch {
      // storage unavailable
    }
  }, [packingList]);

  // Save RSVPs
  useEffect(() => {
    try {
      localStorage.setItem('yamihi_rsvps', JSON.stringify(rsvps));
    } catch {
      // storage unavailable
    }
  }, [rsvps]);

  const togglePackingItem = (id: string) => {
    setPackingList(prev =>
      prev.map(item => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingItem.trim()) return;
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newPackingItem.trim(),
      icon: 'sparkle',
      category: 'Pribadi',
      packed: false,
    };
    setPackingList(prev => [...prev, newItem]);
    setNewPackingItem('');
  };

  const handleDeletePackingItem = (id: string) => {
    setPackingList(prev => prev.filter(item => item.id !== id));
  };

  const packedCount = packingList.filter(item => item.packed).length;
  const packedPercent = Math.round((packedCount / (packingList.length || 1)) * 100);

  const handleCopy = (text: string, bankLabel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankLabel);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const newRsvp: GuestRSVP = {
      id: Date.now().toString(),
      name: rsvpName.trim(),
      status: rsvpStatus,
      pax: rsvpPax,
      message: rsvpMessage.trim() || 'Semoga reuni berjalan lancar dan penuh kenangan!',
      createdAt: 'Baru saja'
    };

    setRsvps(prev => [newRsvp, ...prev]);
    setRsvpSubmitted(true);
    setRsvpMessage('');
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  const shareToWhatsapp = () => {
    const text = encodeURIComponent(
      `💌 *UNDANGAN REUNI YAMIHI 2026*\n\n` +
      `"A Time to Reconnect, A Moment to Remember" 🏡✨\n\n` +
      `🏡 *Tempat:* Villa Sentul Sakala Home\n` +
      `📅 *Tanggal:* Sabtu, 21 November 2026\n` +
      `💰 *Biaya:* Rp400.000/orang (Villa, 3x Makan, BBQ, Games, Fasilitas Lengkap)\n\n` +
      `📌 *Lokasi:* https://maps.app.goo.gl/BrV8kxh1rgCfQ6Ut5\n` +
      `📸 *Referensi:* https://www.instagram.com/p/DeOrV2oyN01/\n\n` +
      `Yuk buka undangan lengkapnya dan konfirmasi kehadiranmu di sini:`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Reuni YAMIHI 2026'
  )}&dates=20261121T070000Z/20261122T050000Z&details=${encodeURIComponent(
    'Reuni YAMIHI 2026 di Villa Sentul Sakala Home. A Time to Reconnect, A Moment to Remember! Biaya Rp400.000/orang include BBQ & penginapan.'
  )}&location=${encodeURIComponent('Villa Sentul Sakala Home, Sentul, Bogor')}`;

  return (
    <section id="details-section" className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAF7F2] text-[#362A21]">
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">

        {/* SECTION 1: COUNTDOWN TIMER & INTRO */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF1EC] text-xs font-semibold uppercase tracking-wider text-[#546A56] border border-[#D5E1D7]">
            <Clock className="w-3.5 h-3.5" />
            <span>Menuju Reuni YAMIHI 2026</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#32251B] tracking-tight">
            A Time to Reconnect, A Moment to Remember
          </h2>

          <p className="text-sm sm:text-base text-[#6E5D4F] max-w-xl mx-auto">
            Hitung mundur waktu berkumpul kembali di Villa Sentul Sakala Home pada Sabtu, 21 November 2026.
          </p>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto pt-4">
            <div className="bg-[#FFFDF9] border border-[#E5D7C9] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
              <div className="font-serif-title text-2xl sm:text-4xl font-bold text-[#4B5E4E] tabular-nums">
                {timeLeft.days}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#847262] mt-1">
                Hari
              </div>
            </div>
            <div className="bg-[#FFFDF9] border border-[#E5D7C9] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
              <div className="font-serif-title text-2xl sm:text-4xl font-bold text-[#4B5E4E] tabular-nums">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#847262] mt-1">
                Jam
              </div>
            </div>
            <div className="bg-[#FFFDF9] border border-[#E5D7C9] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
              <div className="font-serif-title text-2xl sm:text-4xl font-bold text-[#4B5E4E] tabular-nums">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#847262] mt-1">
                Menit
              </div>
            </div>
            <div className="bg-[#FFFDF9] border border-[#E5D7C9] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
              <div className="font-serif-title text-2xl sm:text-4xl font-bold text-[#4B5E4E] tabular-nums">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#847262] mt-1">
                Detik
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: VILLA INFORMATION & MAPS */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DDCE] shadow-xl overflow-hidden">
          {/* Villa Hero Visual Header */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <img
              src="/src/assets/images/villa_sakala_hero_1791869985995.jpg"
              alt="Villa Sentul Sakala Home"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium mb-1">
                <MapPin className="w-4 h-4 text-[#A8C7AF]" />
                <span>Sentul, Bogor, Jawa Barat</span>
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Villa Sentul Sakala Home
              </h3>
              <p className="text-white/80 text-xs sm:text-sm max-w-xl mt-1">
                Villa privat asri dengan infinity pool, deck kayu jati, pemandangan bukit Sentul yang sejuk, dan suasana hangat untuk reconnect.
              </p>
            </div>
          </div>

          {/* Villa Quick Stats & Action Links */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Date & Location Specifics */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-[#8C7A6B] tracking-wider">
                      Hari & Tanggal
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-[#32251B]">
                      Sabtu, 21 November 2026
                    </div>
                    <div className="text-xs text-[#736254]">
                      Waktu Check-in: 14.00 WIB · Check-out: Minggu, 22 Nov 12.00 WIB
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-[#8C7A6B] tracking-wider">
                      Alamat & Lokasi
                    </div>
                    <div className="text-base font-semibold text-[#32251B]">
                      Villa Sentul Sakala Home
                    </div>
                    <div className="text-xs text-[#736254] leading-relaxed">
                      Kawasan Perbukitan Sentul, Babakan Madang, Bogor, Jawa Barat
                    </div>
                  </div>
                </div>
              </div>

              {/* Villa Interior Photo & Highlight */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DDCE] bg-[#F7F2EC] group">
                <img
                  src="/src/assets/images/villa_living_lounge_1791869985905.jpg"
                  alt="Interior & Lounge Villa Sakala Home"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-white/95 border-t border-[#E8DDCE] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#4D3C2F]">Spacious Living & Pool Deck</span>
                  <span className="text-[11px] text-[#546A56] font-semibold">Private & Cozy</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (Google Maps, Instagram & Calendar) */}
            <div className="pt-4 border-t border-[#EFE4D6] flex flex-wrap gap-3">
              <a
                href="https://maps.app.goo.gl/BrV8kxh1rgCfQ6Ut5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#596E5C] hover:bg-[#485A4A] text-white text-xs sm:text-sm font-medium shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <a
                href="https://www.instagram.com/p/DeOrV2oyN01/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF4ED] hover:bg-[#F3E8DC] text-[#7A4032] border border-[#DECFBD] text-xs sm:text-sm font-medium transition-all"
              >
                <Instagram className="w-4 h-4 text-[#BA5A45]" />
                <span>Lihat Referensi Villa Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF4ED] hover:bg-[#F3E8DC] text-[#362A21] border border-[#DECFBD] text-xs sm:text-sm font-medium transition-all"
              >
                <Calendar className="w-4 h-4 text-[#596E5C]" />
                <span>Simpan ke Google Calendar</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 3: BIAYA KEIKUTSERTAAN & INKLUSI */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DDCE] shadow-xl p-6 sm:p-9 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#EFE4D6] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] text-xs font-semibold uppercase tracking-wider text-[#546A56] mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Investasi Kebersamaan</span>
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#32251B]">
                Biaya Keikutsertaan
              </h3>
              <p className="text-sm text-[#736254] mt-1">
                Biaya all-in transparan untuk seluruh akomodasi, konsumsi, dan keseruan acara.
              </p>
            </div>

            {/* Price Tag */}
            <div className="bg-[#F8F4ED] border border-[#E2D5C6] rounded-2xl p-4 sm:p-5 text-right sm:text-left md:text-right shrink-0">
              <div className="text-xs text-[#877565] uppercase font-semibold tracking-wider">
                Tarif Per Orang
              </div>
              <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#4B5E4E] tracking-tight mt-0.5">
                Rp400.000
                <span className="text-sm font-sans font-normal text-[#736254]"> / orang</span>
              </div>
            </div>
          </div>

          {/* Included Amenities Checklist */}
          <div className="mt-8">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#8A7869] mb-4">
              Biaya tersebut sudah mencakup:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-[#FAF6F0] p-4 rounded-xl border border-[#EADBCC]">
                <div className="w-8 h-8 rounded-lg bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#32251B]">Sewa Villa & Fasilitas Lengkap</div>
                  <div className="text-xs text-[#736254] mt-0.5">Private pool, living room ber-AC, kamar nyaman, dan gazebo santai.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#FAF6F0] p-4 rounded-xl border border-[#EADBCC]">
                <div className="w-8 h-8 rounded-lg bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#32251B]">3 Kali Makan, Snack & Minuman</div>
                  <div className="text-xs text-[#736254] mt-0.5">Makan siang, makan malam lezat, sarapan pagi, snack sore & coffee break.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#FAF6F0] p-4 rounded-xl border border-[#EADBCC]">
                <div className="w-8 h-8 rounded-lg bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-[#BA5A45]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#32251B]">BBQ Night & Air Mineral Sepuasnya</div>
                  <div className="text-xs text-[#736254] mt-0.5">Daging panggang, sosis, jagung bakar bumbu spesial saat malam hari.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#FAF6F0] p-4 rounded-xl border border-[#EADBCC]">
                <div className="w-8 h-8 rounded-lg bg-[#EBF1EC] text-[#546A56] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#B88C5A]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#32251B]">Games, Hiburan & Biaya Kebersihan</div>
                  <div className="text-xs text-[#736254] mt-0.5">Hadiah kuis seru, perlengkapan games, sound system & maintenance villa.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator & Payment Transfer Details */}
          <div className="mt-8 pt-8 border-t border-[#EFE4D6] grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Interactive Calculator */}
            <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E5D7C7]">
              <div className="text-xs uppercase font-semibold text-[#877565] tracking-wider mb-2">
                Simulasi Biaya Pendaftaran
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#4E3E32] font-medium">Jumlah Peserta:</span>
                <div className="flex items-center bg-white border border-[#D5C7B7] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setCalcPax(Math.max(1, calcPax - 1))}
                    className="px-3 py-1 text-sm font-bold text-[#596E5C] hover:bg-[#F3EFE9]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-bold text-[#32251B] tabular-nums">
                    {calcPax} orang
                  </span>
                  <button
                    onClick={() => setCalcPax(calcPax + 1)}
                    className="px-3 py-1 text-sm font-bold text-[#596E5C] hover:bg-[#F3EFE9]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5D7C7] flex items-baseline justify-between">
                <span className="text-xs text-[#736254]">Total Pembayaran:</span>
                <span className="font-serif-title text-xl font-bold text-[#4B5E4E]">
                  Rp{(calcPax * 400000).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Bank Transfer Info */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-semibold text-[#877565] tracking-wider">
                Rekening Pembayaran:
              </div>

              {/* Bank BCA */}
              <div className="bg-white p-4 rounded-xl border border-[#E5D7C7] flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-sm font-bold text-[#1B355B]">BCA · 6042095008</div>
                  <div className="text-xs text-[#524135] font-medium mt-0.5">a.n. Xinaretha Verra</div>
                </div>
                <button
                  onClick={() => handleCopy('6042095008', 'BCA')}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF4ED] hover:bg-[#F3EBE1] text-[#4A3C31] text-xs font-medium flex items-center gap-1.5 border border-[#DFD1C1] transition-all cursor-pointer"
                >
                  {copiedBank === 'BCA' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#596E5C]" />
                      <span>Salin Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: PERLENGKAPAN YANG PERLU DIBAWA (INTERACTIVE CHECKLIST) */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DDCE] shadow-xl p-6 sm:p-9 md:p-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE4D6] pb-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] text-xs font-semibold uppercase tracking-wider text-[#546A56] mb-2">
                <Shirt className="w-3.5 h-3.5" />
                <span>Travel Packing Checklist</span>
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#32251B]">
                Perlengkapan yang Perlu Dibawa
              </h3>
              <p className="text-sm text-[#736254] mt-0.5">
                Centang barang yang sudah kamu siapkan agar liburan villa semakin nyaman dan tenang.
              </p>
            </div>

            {/* Progress Badge */}
            <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-[#E3D6C6] text-right sm:text-right shrink-0">
              <div className="text-xs font-semibold text-[#806E5E]">Kesiapan Barang</div>
              <div className="text-sm font-bold text-[#546A56] mt-0.5">
                {packedCount} dari {packingList.length} Siap ({packedPercent}%)
              </div>
              {/* Mini progress bar */}
              <div className="w-32 bg-[#E6D9CB] h-1.5 rounded-full overflow-hidden mt-1.5 ml-auto">
                <div
                  className="bg-[#596E5C] h-full transition-all duration-300"
                  style={{ width: `${packedPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {packingList.map(item => (
              <div
                key={item.id}
                onClick={() => togglePackingItem(item.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  item.packed
                    ? 'bg-[#EBF2EC] border-[#B7D2BC] text-[#364939]'
                    : 'bg-[#FAF6F0] border-[#E8DDCE] hover:border-[#D5C4B1] text-[#3F3126]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.packed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4D6D51] shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#B2A08E] shrink-0" />
                  )}
                  <div>
                    <span className={`text-sm font-medium ${item.packed ? 'line-through text-[#6F8272]' : ''}`}>
                      {item.name}
                    </span>
                    {item.optional && (
                      <span className="ml-2 text-[10px] text-[#A67554] font-semibold bg-[#F9EFE7] px-1.5 py-0.5 rounded">
                        Opsional
                      </span>
                    )}
                  </div>
                </div>

                {/* Custom items delete button */}
                {parseInt(item.id) > 10 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePackingItem(item.id);
                    }}
                    className="text-[#B29D8D] hover:text-red-700 p-1"
                    title="Hapus barang ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Custom Item */}
          <form onSubmit={handleAddPackingItem} className="mt-6 pt-4 border-t border-[#EFE4D6] flex items-center gap-2">
            <input
              type="text"
              value={newPackingItem}
              onChange={(e) => setNewPackingItem(e.target.value)}
              placeholder="Tambahkan perlengkapan pribadi lainnya..."
              className="flex-1 bg-white border border-[#D5C7B7] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3E3025] focus:outline-none focus:ring-2 focus:ring-[#596E5C]"
            />
            <button
              type="submit"
              className="bg-[#596E5C] hover:bg-[#485A4A] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </form>
        </div>


        {/* SECTION 6: RSVP & BUKU TAMU / PESAN KENANGAN */}
        <div id="rsvp-form" className="bg-[#FFFDF9] rounded-3xl border border-[#E8DDCE] shadow-xl p-6 sm:p-9 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EC] text-xs font-semibold uppercase tracking-wider text-[#546A56] mb-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>Konfirmasi Kehadiran</span>
                </div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#32251B]">
                  Buku Tamu & RSVP
                </h3>
                <p className="text-sm text-[#736254] mt-1">
                  Mohon konfirmasi kehadiranmu sebelum 10 November 2026 demi kelancaran akomodasi villa dan catering.
                </p>
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#796758] mb-1.5">
                    Nama Lengkap / Panggilan
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Maya & Budi"
                    className="w-full bg-white border border-[#D5C7B7] rounded-xl px-4 py-2.5 text-sm text-[#3E3025] focus:outline-none focus:ring-2 focus:ring-[#596E5C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#796758] mb-1.5">
                    Status Kehadiran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('hadir')}
                      className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                        rsvpStatus === 'hadir'
                          ? 'bg-[#596E5C] text-white border-[#485A4A] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#4A3B30] border-[#D5C7B7] hover:bg-[#F3EFE9]'
                      }`}
                    >
                      Pasti Hadir ✨
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('ragu')}
                      className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                        rsvpStatus === 'ragu'
                          ? 'bg-[#B48450] text-white border-[#9E7241] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#4A3B30] border-[#D5C7B7] hover:bg-[#F3EFE9]'
                      }`}
                    >
                      Masih Ragu 🤔
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('tidak_hadir')}
                      className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                        rsvpStatus === 'tidak_hadir'
                          ? 'bg-[#8F5244] text-white border-[#7B4438] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#4A3B30] border-[#D5C7B7] hover:bg-[#F3EFE9]'
                      }`}
                    >
                      Belum Bisa 🥺
                    </button>
                  </div>
                </div>

                {rsvpStatus === 'hadir' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#796758] mb-1.5">
                      Jumlah Peserta
                    </label>
                    <select
                      value={rsvpPax}
                      onChange={(e) => setRsvpPax(parseInt(e.target.value))}
                      className="w-full bg-white border border-[#D5C7B7] rounded-xl px-4 py-2.5 text-sm text-[#3E3025] focus:outline-none focus:ring-2 focus:ring-[#596E5C]"
                    >
                      <option value={1}>1 Orang (Sendiri)</option>
                      <option value={2}>2 Orang (Bawa Pasangan / Teman)</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#796758] mb-1.5">
                    Pesan / Doa / Harapan untuk Reuni YAMIHI
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan kangen atau pesan hangatmu di sini..."
                    className="w-full bg-white border border-[#D5C7B7] rounded-xl p-3 text-sm text-[#3E3025] focus:outline-none focus:ring-2 focus:ring-[#596E5C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#596E5C] hover:bg-[#475A48] text-white font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Kirim Konfirmasi Kehadiran</span>
                </button>

                {rsvpSubmitted && (
                  <div className="p-3 bg-[#EBF1EC] border border-[#B7D2BC] rounded-xl text-xs text-[#364939] font-medium text-center animate-fadeIn">
                    Terima kasih! Konfirmasi kehadiran dan ucapanmu telah berhasil dicatat. 💖
                  </div>
                )}
              </form>
            </div>

            {/* Live Message Board Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFE4D6] pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquareHeart className="w-4 h-4 text-[#884B3B]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#796758]">
                    Dinding Harapan & Ucapan Teman ({rsvps.length})
                  </span>
                </div>
              </div>

              {/* Scrollable Guestbook Cards */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
                {rsvps.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8DDCE] space-y-2 hover:border-[#D5C4B1] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-sm text-[#32251B] flex items-center gap-1.5">
                          <span>{entry.name}</span>
                          {entry.status === 'hadir' && (
                            <span className="text-[10px] bg-[#EBF1EC] text-[#546A56] px-2 py-0.2 rounded-full border border-[#D5E1D7]">
                              Hadir ({entry.pax} pax)
                            </span>
                          )}
                          {entry.status === 'ragu' && (
                            <span className="text-[10px] bg-[#F7EFE4] text-[#A67554] px-2 py-0.2 rounded-full border border-[#E9DAC8]">
                              Masih Ragu
                            </span>
                          )}
                          {entry.status === 'tidak_hadir' && (
                            <span className="text-[10px] bg-[#F9ECE9] text-[#935245] px-2 py-0.2 rounded-full border border-[#E8D1CB]">
                              Berhalangan
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#968474]">{entry.createdAt}</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#544336] italic font-sans leading-relaxed">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 7: BAGIKAN KE WHATSAPP & FOOTER */}
        <div className="bg-gradient-to-r from-[#536854] via-[#5F7761] to-[#4D614E] text-[#FAF6F0] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Bagikan ke Sahabat YAMIHI Lainnya
          </h3>
          <p className="text-xs sm:text-sm text-[#E2EBE3] max-w-lg mx-auto">
            Ajak teman-teman seangkatan dan keluarga YAMIHI untuk bergabung. Sebarkan kehangatan dan kebersamaan di grup WhatsApp kita!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={shareToWhatsapp}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FAF6F0] hover:bg-white text-[#4A5D4E] font-semibold text-sm sm:text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#596E5C]" />
              <span>Bagikan Undangan via WhatsApp</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/20 text-xs text-[#D8E4DA] space-y-1">
            <div>Panitia Reuni YAMIHI 2026 · Villa Sentul Sakala Home</div>
            <div>A Time to Reconnect, A Moment to Remember 🏡✨</div>
          </div>
        </div>

      </div>
    </section>
  );
};
