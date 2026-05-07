import { Brush, Scissors, Sparkles, Wind } from "lucide-react";
import type { ServicesData } from "../../interfaces/public/service.interface";

export const servicesData: ServicesData = {
  title: "Nuestros Servicios",
  subtitle: "Lo que ofrecemos",
  services: [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      icon: Scissors,
      name: "Corte Clásico",
      description: "Corte tradicional con acabado perfecto a tijera o maquina",
      price: "$80",
      duration: "30 min",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      icon: Brush,
      name: "Corte + Barba",
      description: "Combo completo: corte de cabello y perfilado de barba",
      price: "$130",
      duration: "50 min",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      icon: Sparkles,
      name: "Afeitado Clásico",
      description:
        "Afeitado tradicional con navaja, toalla caliente y crema premium",
      price: "$90",
      duration: "40 min",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      icon: Wind,
      name: "Tinte + Corte",
      description:
        "Color personalizado con productos profesionales y corte incluido",
      price: "$200",
      duration: "90 min",
    },
  ],
};
