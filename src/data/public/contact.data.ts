import type { ContactData } from "../../interfaces/public/contact.interface";

export const contactData: ContactData = {
  address: "Calle Principal #123, Col. Centro, Ciudad de México",
  phone: "+52 55 1234 5678",
  schedule: [
    { days: "Lun – Vie", hours: "9:00am – 8:00pm" },
    { days: "Sáb", hours: "9:00am – 6:00pm" },
    { days: "Dom", hours: "10:00am – 3:00pm" },
  ],
};
