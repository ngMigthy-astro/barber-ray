export interface HeroCTA {
  text: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image_url?: string;
  badge?: string;           // Nuevo
  guarantee_text?: string;  // Nuevo
  ctas: HeroCTA[];
  stats: HeroStat[];
}
