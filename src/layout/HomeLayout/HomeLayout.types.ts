// Types for HomeLayout and home.json data

export interface HomeFeature {
  title: string;
  description: string;
  lucidIcon: keyof typeof import("lucide-react");
}

export interface HomeImage {
  src: string;
  alt: string;
}

export interface HomeLink {
  label: string;
  href: string;
}

export interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  features: HomeFeature[];
  image: HomeImage;
  links: HomeLink[];
}
