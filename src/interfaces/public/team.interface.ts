export interface TeamMember {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  specialties: string[];
  instagram: string;
}

export interface TeamData {
  title: string;
  subtitle: string;
  members: TeamMember[];
}
