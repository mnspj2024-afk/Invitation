export interface GuestRSVP {
  id: string;
  name: string;
  status: 'hadir' | 'ragu' | 'tidak_hadir';
  pax: number;
  message: string;
  createdAt: string;
}

export interface PackingItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  optional?: boolean;
  packed: boolean;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
}
