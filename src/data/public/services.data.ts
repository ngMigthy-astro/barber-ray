import { Brush, Scissors, Sparkles, Wind } from "lucide-react";
import type { ServicesData } from "../../interfaces/public/service.interface";

export const servicesData: ServicesData = {
  title: "Nuestros Servicios",
  subtitle: "Lo que ofrecemos",
  services: [
    {
      icon: Scissors,
      name: "Corte Clásico",
      description: "Corte tradicional con acabado perfecto a tijera o maquina",
      price: "$80",
      duration: "30 min",
    },
    {
      icon: Brush,
      name: "Corte + Barba",
      description: "Combo completo: corte de cabello y perfilado de barba",
      price: "$130",
      duration: "50 min",
    },
    {
      icon: Sparkles,
      name: "Afeitado Clásico",
      description:
        "Afeitado tradicional con navaja, toalla caliente y crema premium",
      price: "$90",
      duration: "40 min",
    },
    {
      icon: Wind,
      name: "Tinte + Corte",
      description:
        "Color personalizado con productos profesionales y corte incluido",
      price: "$200",
      duration: "90 min",
    },
  ],
};
