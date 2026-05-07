import type { TeamData } from "../../interfaces/public/team.interface";

export const teamData: TeamData = {
  title: "Los mejores del oficio",
  subtitle: "Nuestro Equipo",
  members: [
    {
      id: "660e8400-e29b-41d4-a716-446655440001",
      name: "Ray Gomez",
      role: "Fundador & Master Barber",
      rating: 5,
      reviews: 142,
      specialties: ["Fade", "Diseños", "Barba"],
      instagram: "@ray.barber",
    },
    {
      id: "660e8400-e29b-41d4-a716-446655440002",
      name: "Carlos Vega",
      role: "Senior Barber",
      rating: 3.9,
      reviews: 98,
      specialties: ["Clásicos", "Color", "Pompadour"],
      instagram: "@carlos.cuts",
    },
    {
      id: "660e8400-e29b-41d4-a716-446655440003",
      name: "Diego Ruiz",
      role: "Barber Specialist",
      rating: 4.8,
      reviews: 76,
      specialties: ["Texturizados", "Afeitado", "Cejas"],
      instagram: "@diego.style",
    },
  ],
};
