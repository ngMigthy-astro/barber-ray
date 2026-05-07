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
  badge?: string;
  guarantee_text?: string;
  ctas: HeroCTA[];
  stats: HeroStat[];
}
