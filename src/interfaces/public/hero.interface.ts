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
  ctas: HeroCTA[];
  stats: HeroStat[];
}
