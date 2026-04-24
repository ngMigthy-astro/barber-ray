import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}
