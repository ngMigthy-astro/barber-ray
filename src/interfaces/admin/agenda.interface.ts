export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface AgendaAppointment {
  id: string;
  user_id: string;
  client_name?: string; 
  client_email?: string;
  service: {
    name: string;
    duration: string;
    price: string;
  };
  barber: {
    name: string;
  };
  appointment_date: string;
  status: AppointmentStatus;
}
