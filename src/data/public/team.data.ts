import type { TeamData } from "../../interfaces/public/team.interface";

export const teamData: TeamData = {
  title: "Los mejores del oficio",
  subtitle: "Nuestro Equipo",
  members: [
    {
      name: "Ray Gomez",
      role: "Fundador & Master Barber",
      rating: 5,
      reviews: 142,
      specialties: ["Fade", "Diseños", "Barba"],
      instagram: "@ray.barber",
    },
    {
      name: "Carlos Vega",
      role: "Senior Barber",
      rating: 3.9,
      reviews: 98,
      specialties: ["Clásicos", "Color", "Pompadour"],
      instagram: "@carlos.cuts",
    },
    {
      name: "Diego Ruiz",
      role: "Barber Specialist",
      rating: 4.8,
      reviews: 76,
      specialties: ["Texturizados", "Afeitado", "Cejas"],
      instagram: "@diego.style",
    },
  ],
};
