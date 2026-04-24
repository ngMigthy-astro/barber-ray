import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface ServicesData {
  title: string;
  subtitle: string;
  services: Service[];
}
