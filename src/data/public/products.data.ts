import type { ProductsData } from "../../interfaces/public/product.interface";

export const productsData: ProductsData = {
  title: "Nuestros Productos",
  subtitle: "Lo que ofrecemos",
  products: [
    {
      name: "Pomada Mate",
      description: "Fijación fuerte con acabado mate. Control todo el día",
      price: "$120",
      category: "Fijación",
    },
    {
      name: "Aceite de Barba",
      description: "Hidrata y suaviza la barba. Aroma cítrico fresco",
      price: "$95",
      category: "Barba",
    },
    {
      name: "Shampoo Premium",
      description: "Limpieza profunda con extracto de menta y queratina",
      price: "$110",
      category: "Cabello",
    },
    {
      name: "Cera Brillante",
      description: "Acabado brillante con fijación media. Fórmula flexible",
      price: "$100",
      category: "Fijación",
    },
    {
      name: "Bálsamo Post-Afeitado",
      description: "Calma la piel sensible después del afeitado con navaja.",
      price: "$85",
      category: "Afeitado",
    },
    {
      name: "Gel Modelador",
      description: "Control extremo para peinados definidos y duraderos",
      price: "$75",
      category: "Fijación",
    },
  ],
};
