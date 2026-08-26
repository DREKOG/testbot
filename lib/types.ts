export interface GeneralSettings {
  serverName: string;
  serverIp: string;
  serverPort: string;
  description: string;
  logoUrl: string;
  discordUrl: string;
  voteUrl: string;
}

export interface HeroSettings {
  headline: string;
  subheadline: string;
  backgroundImageUrl: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-style icon key, we map to emoji/svg fallback
  order: number;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date
}

export interface Rule {
  id: string;
  text: string;
  order: number;
}

export interface StorePackage {
  id: string;
  name: string;
  price: string;
  currency: string;
  benefits: string[];
  imageUrl: string;
  highlighted: boolean;
  order: number;
}

export interface SiteData {
  general: GeneralSettings;
  hero: HeroSettings;
  features: Feature[];
  news: NewsPost[];
  rules: Rule[];
  store: StorePackage[];
}
