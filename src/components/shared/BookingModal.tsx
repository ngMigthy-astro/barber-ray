import { useState, useEffect, useRef } from "react";
import useFocusTrap from "../../lib/hooks/useFocusTrap";
import {
  Calendar,
  Clock,
  Scissors,
  Check,
  ChevronLeft,
  X,
  Loader2,
  Sparkles,
  Wind,
  Brush,
  Zap,
  Info,
  AlertCircle,
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import type { AppUser } from "../../interfaces/auth/user.interface";
import type { Service } from "../../interfaces/public/service.interface";
import type { TeamMember } from "../../interfaces/public/team.interface";

// Browser client that inherits the session from Astro/SSR cookies
const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

interface DBService extends Service {
  readonly id: string;
  readonly icon_name: string;
}

// Mapa de iconos para convertir string a componente
const IconMap: Record<string, any> = {
  Scissors,
  Sparkles,
  Wind,
  Brush,
  Zap,
  Info,
};

interface DBBarber extends TeamMember {
  readonly id: string;
  readonly image_url?: string;
}

interface ActiveAppointment {
  date: Date;
  duration: number;
}

function getBusinessHours(dateStr: string) {
  if (!dateStr) return { startHour: 9, endHour: 20 };
  const date = new Date(`${dateStr}T12:00:00`);
  const day = date.getDay();
  if (day === 0) return { startHour: 10, endHour: 15 }; // Domingo
  if (day === 6) return { startHour: 9, endHour: 18 };  // Sábado
  return { startHour: 9, endHour: 20 }; // Lunes a Viernes
}

function generateTimeSlots(dateStr: string, serviceDuration: number) {
  const { startHour, endHour } = getBusinessHours(dateStr);
  const slots: string[] = [];
  
  let currentMins = startHour * 60;
  // Duración del servicio + 5 minutos de colchón
  const totalDuration = serviceDuration + 5;
  const endMins = endHour * 60 - totalDuration;
  
  while (currentMins <= endMins) {
    const h = Math.floor(currentMins / 60);
    const m = currentMins % 60;
    slots.push(
      h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0")
    );
    currentMins += 15; // Intervalos de 15 minutos
  }
  return slots;
}

function isSlotOccupied(
  slotTime: string,
  selectedDate: string,
  serviceDuration: number,
  existingAppointments: ActiveAppointment[]
) {
  const proposedStart = new Date(`${selectedDate}T${slotTime}:00Z`).getTime();
  const proposedEnd = proposedStart + (serviceDuration + 5) * 60 * 1000;
  
  // Si el slot ya pasó en tiempo real, lo marcamos como ocupado/deshabilitado
  const now = new Date().getTime();
  if (proposedStart < now) {
    return true;
  }
  
  return existingAppointments.some((app) => {
    const existingStart = app.date.getTime();
    const existingEnd = existingStart + (app.duration + 5) * 60 * 1000;
    
    // Condición de solape de intervalos
    return proposedStart < existingEnd && existingStart < proposedEnd;
  });
}

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly services: readonly DBService[];
  readonly team: readonly DBBarber[];
  readonly user: AppUser | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  services,
  team,
  user,
}: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [success, setSuccess] = useState(false);

  // Activamos el focus trap cuando el modal de reserva está abierto
  const bookingModalRef = useFocusTrap(isOpen);

  // Cerrar modal al presionar la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const [selectedService, setSelectedService] = useState<DBService | null>(
    null,
  );
  const [selectedBarber, setSelectedBarber] = useState<DBBarber | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [existingAppointments, setExistingAppointments] = useState<ActiveAppointment[]>([]);



  // Effect to fetch occupied appointments
  useEffect(() => {
    if (selectedBarber && selectedDate && isOpen) {
      checkAvailability();
    }
  }, [selectedBarber, selectedDate, isOpen]);

  async function checkAvailability() {
    if (!selectedBarber || !selectedDate) return;
    setFetchingSlots(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          appointment_date,
          status,
          service:service_id(duration)
        `)
        .eq("barber_id", selectedBarber.id)
        .neq("status", "cancelled")
        .filter("appointment_date", "gte", `${selectedDate}T00:00:00Z`)
        .filter("appointment_date", "lte", `${selectedDate}T23:59:59Z`);

      if (error) throw error;

      if (data) {
        const apps = data.map((app: any) => {
          const rawDur = app.service?.duration || "30";
          const duration = Number.parseInt(String(rawDur).replace(/[^0-9]/g, ""), 10) || 30;
          return {
            date: new Date(app.appointment_date),
            duration: duration,
          };
        });
        setExistingAppointments(apps);
      }
    } finally {
      setFetchingSlots(false);
    }
  }

  const handleBooking = async () => {
    if (!user || !selectedService || !selectedBarber) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("appointments").insert([
        {
          user_id: user.id,
          service_id: selectedService.id,
          barber_id: selectedBarber.id,
          appointment_date: `${selectedDate}T${selectedTime}:00Z`,
          status: "pending",
        },
      ]);

      if (error) {
        throw error;
      }
      setSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      alert(
        `Error al reservar: ${message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate("");
    setSelectedTime("");
    setExistingAppointments([]);
    onClose();
  };

  // Human-friendly formatting helpers
  const getFriendlyDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(`${dateStr}T12:00:00`);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getFriendlyTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const h = Number.parseInt(hours);
    const ampm = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={bookingModalRef}
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
    >
      <button
        type="button"
        className="absolute inset-0 bg-bg/80 backdrop-blur-md w-full h-full border-none cursor-default"
        onClick={resetAndClose}
        aria-label="Cerrar modal"
      />

      <dialog 
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative bg-surface border border-glass-border w-full max-w-2xl max-h-[85vh] rounded-5xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300"
      >
        {success ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <Check className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-text uppercase">
                ¡Cita Agendada!
              </h2>
              <p className="text-text-muted">
                Te esperamos el{" "}
                <span className="text-text font-bold capitalize">
                  {getFriendlyDate(selectedDate)}
                </span>{" "}
                a las{" "}
                <span className="text-text font-bold">
                  {getFriendlyTime(selectedTime)}
                </span>
              </p>
            </div>
            <button onClick={resetAndClose} className="btn-premium px-12">
              Entendido
            </button>
          </div>
        ) : (
          <>
            <div className="p-5 sm:p-8 border-b border-glass-border flex flex-col sm:flex-row items-start sm:items-center justify-between bg-surface/50 gap-4 sm:gap-0">
              <div className="w-full flex justify-between items-center sm:block">
                <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-black text-text uppercase tracking-tighter">
                  Reserva tu Cita
                </h2>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${step >= i ? "w-8 bg-primary" : "w-4 bg-primary/10"}`}
                    ></div>
                  ))}
                </div>
              </div>
              <button
                onClick={resetAndClose}
                aria-label="Cerrar modal"
                className="hidden sm:block p-3 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-2xs font-black text-primary uppercase tracking-ultra mb-4 text-center">
                    ¿Qué servicio necesitas?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const ServiceIcon =
                        IconMap[service.icon_name] || Scissors;
                      return (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service);
                            setStep(2);
                          }}
                          aria-pressed={selectedService?.id === service.id}
                          className={`flex items-center gap-4 p-4 rounded-3xl border transition-all text-left group ${selectedService?.id === service.id ? "border-primary bg-primary/5 shadow-blood-sm" : "border-glass-border bg-surface hover:border-primary/50"}`}
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedService?.id === service.id ? "bg-primary text-white" : "bg-bg text-primary group-hover:bg-primary/20"}`}
                          >
                            <ServiceIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-text group-hover:text-primary transition-colors">
                              {service.name}
                            </p>
                            <p className="text-2xs text-text-muted font-black uppercase">
                              ${String(service.price).replace(/[^0-9]/g, "")} • {String(service.duration).toLowerCase().includes("min") ? service.duration : `${service.duration} min`}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-2xs font-black text-primary uppercase tracking-ultra text-center">
                    Elige a tu barbero de confianza
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {team.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => {
                          setSelectedBarber(barber);
                          setStep(3);
                        }}
                        aria-pressed={selectedBarber?.id === barber.id}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${selectedBarber?.id === barber.id ? "border-primary bg-primary/5 shadow-blood-sm" : "border-glass-border bg-surface hover:border-primary/50"}`}
                      >
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-bg flex items-center justify-center text-primary font-black text-2xl border-2 border-primary/20 overflow-hidden">
                            {barber.image_url ? (
                              <img
                                src={barber.image_url}
                                alt={barber.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              barber.name.charAt(0)
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-surface"></div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-text text-sm">
                            {barber.name}
                          </p>
                          <p className="text-2xs text-primary font-black uppercase tracking-tighter">
                            {barber.role}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex items-center gap-4 p-4 bg-bg rounded-3xl border border-glass-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text">
                        {selectedService?.name}
                      </p>
                      <p className="text-2xs text-text-muted font-black uppercase">
                        Con {selectedBarber?.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-4">
                      <label
                        htmlFor="date"
                        className="text-2xs font-black text-text-muted uppercase tracking-ultra px-1"
                      >
                        Selecciona el Día
                      </label>
                      <div className="flex overflow-x-auto pb-4 gap-2 snap-x no-scrollbar sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
                        {(() => {
                          const days = [];
                          for (let i = 0; i < 14; i++) {
                            const date = new Date();
                            date.setDate(date.getDate() + i);
                            days.push({
                              fullDate: date.toISOString().split("T")[0],
                              dayName: date.toLocaleDateString("es-ES", {
                                weekday: "short",
                              }),
                              dayNumber: date.getDate(),
                              monthName: date.toLocaleDateString("es-ES", {
                                month: "short",
                              }),
                            });
                          }
                          return days.map((day) => {
                            const isSelected = selectedDate === day.fullDate;
                            return (
                              <button
                                key={day.fullDate}
                                type="button"
                                onClick={() => {
                                  setSelectedDate(day.fullDate);
                                  setSelectedTime("");
                                }}
                                aria-pressed={isSelected}
                                className={`shrink-0 snap-start min-w-17.5 sm:min-w-0 p-3 flex flex-col items-center justify-center rounded-2xl border transition-all relative overflow-hidden group ${
                                  isSelected
                                    ? "border-primary bg-primary/10 shadow-blood-sm scale-105"
                                    : "border-glass-border bg-surface hover:border-primary/40"
                                }`}
                              >
                                <span
                                  className={`text-2xs font-black uppercase tracking-tighter ${isSelected ? "text-primary" : "text-text-muted"}`}
                                >
                                  {day.dayName}
                                </span>
                                <span className="text-xl font-black text-text leading-none my-1">
                                  {day.dayNumber}
                                </span>
                                <span className="text-2xs font-bold uppercase text-text-muted tracking-tighter">
                                  {day.monthName}
                                </span>
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-2xs font-black text-text-muted uppercase tracking-ultra px-1">
                        Hora Disponible{" "}
                        {fetchingSlots && (
                          <Loader2 className="inline w-3 h-3 animate-spin ml-2" />
                        )}
                      </label>
                      {selectedDate ? (
                        <div className="grid grid-cols-3 gap-2">
                          {(() => {
                            const serviceDuration = selectedService
                              ? Number.parseInt(String(selectedService.duration).replace(/[^0-9]/g, ""), 10) || 30
                              : 30;
                            const slots = generateTimeSlots(selectedDate, serviceDuration);
                            if (slots.length === 0) {
                              return (
                                <div className="col-span-3 text-center py-4 text-xs font-bold text-text-muted">
                                  No hay horarios disponibles para este día
                                </div>
                              );
                            }
                            return slots.map((time) => {
                              const isOccupied = isSlotOccupied(
                                time,
                                selectedDate,
                                serviceDuration,
                                existingAppointments
                              );
                              const isSelected = selectedTime === time;

                              let buttonStyles = "";

                              if (isOccupied) {
                                buttonStyles =
                                  "bg-surface-hover border-glass-border text-text-muted/40 cursor-not-allowed line-through";
                              } else if (isSelected) {
                                buttonStyles =
                                  "bg-primary border-primary text-white shadow-blood-md";
                              } else {
                                buttonStyles =
                                  "border-glass-border hover:border-primary/50 text-text-muted";
                              }

                              return (
                                <button
                                  key={time}
                                  disabled={isOccupied}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  aria-pressed={isSelected}
                                  className={`py-2 rounded-xl border text-2xs font-black transition-all ${buttonStyles}`}
                                >
                                  {isOccupied ? "Ocupado" : time}
                                </button>
                              );
                            });
                          })()}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 bg-surface/50 rounded-2xl border border-dashed border-primary/10">
                          <Calendar className="w-8 h-8 text-text-muted/30 mb-2" />
                          <p className="text-2xs text-text-muted/40 font-bold uppercase">
                            Elige un día primero
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-8 border-t border-glass-border bg-surface/50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-2xs font-black uppercase text-text-muted hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Volver
                </button>
              ) : (
                <div></div>
              )}

              {step === 3 ? (
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || loading}
                  className="btn-premium w-full sm:w-auto min-w-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Finalizar Reserva"
                  )}
                </button>
              ) : (
                <div className="text-2xs font-black text-text-muted uppercase tracking-ultra flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> Completa los pasos
                </div>
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
