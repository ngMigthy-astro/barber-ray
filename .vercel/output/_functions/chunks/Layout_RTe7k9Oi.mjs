import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, G as renderSlot, bb as renderHead, a6 as addAttribute, C as maybeRenderHead } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_DGDZclkY.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Check, X, Info, Zap, Brush, Wind, Sparkles, Scissors, Clock, Loader2, Calendar, ChevronLeft, AlertCircle, User, ChevronDown, LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
/* empty css                 */
import { r as renderScript } from './script_I6uDmxd2.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = globalThis.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = stored === "dark" || !stored && prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);
  const toggle = () => {
    const next = !isDark;
    const switchTheme = () => {
      setIsDark(next);
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    };
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(switchTheme);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Cambiar tema",
      className: "p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors",
      children: isDark ? /* @__PURE__ */ jsx(Sun, {}) : /* @__PURE__ */ jsx(Moon, {})
    }
  );
}

function useFocusTrap(isActive) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;
    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      "[tabindex='0']",
      "[contenteditable]"
    ].join(",");
    const previousActiveElement = document.activeElement;
    const focusableElements = container.querySelectorAll(focusableSelectors);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const elements = Array.from(
        container.querySelectorAll(focusableSelectors)
      );
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    };
  }, [isActive]);
  return containerRef;
}

const supabase = createBrowserClient(
  "https://sjjaracpnvlhcafzjjso.supabase.co",
  "sb_publishable_6kvaFF6obTbPYsg9DFdEIg_FrV1Gg2D"
);
const IconMap = {
  Scissors,
  Sparkles,
  Wind,
  Brush,
  Zap,
  Info
};
function getBusinessHours(dateStr) {
  if (!dateStr) return { startHour: 9, endHour: 20 };
  const date = /* @__PURE__ */ new Date(`${dateStr}T12:00:00`);
  const day = date.getDay();
  if (day === 0) return { startHour: 10, endHour: 15 };
  if (day === 6) return { startHour: 9, endHour: 18 };
  return { startHour: 9, endHour: 20 };
}
function generateTimeSlots(dateStr, serviceDuration) {
  const { startHour, endHour } = getBusinessHours(dateStr);
  const slots = [];
  let currentMins = startHour * 60;
  const totalDuration = serviceDuration + 5;
  const endMins = endHour * 60 - totalDuration;
  while (currentMins <= endMins) {
    const h = Math.floor(currentMins / 60);
    const m = currentMins % 60;
    slots.push(
      h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0")
    );
    currentMins += 15;
  }
  return slots;
}
function isSlotOccupied(slotTime, selectedDate, serviceDuration, existingAppointments) {
  const proposedStart = (/* @__PURE__ */ new Date(`${selectedDate}T${slotTime}:00Z`)).getTime();
  const proposedEnd = proposedStart + (serviceDuration + 5) * 60 * 1e3;
  const now = (/* @__PURE__ */ new Date()).getTime();
  if (proposedStart < now) {
    return true;
  }
  return existingAppointments.some((app) => {
    const existingStart = app.date.getTime();
    const existingEnd = existingStart + (app.duration + 5) * 60 * 1e3;
    return proposedStart < existingEnd && existingStart < proposedEnd;
  });
}
function BookingModal({
  isOpen,
  onClose,
  services,
  team,
  user
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [success, setSuccess] = useState(false);
  const bookingModalRef = useFocusTrap(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [isOpen]);
  const [selectedService, setSelectedService] = useState(
    null
  );
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [existingAppointments, setExistingAppointments] = useState([]);
  useEffect(() => {
    if (selectedBarber && selectedDate && isOpen) {
      checkAvailability();
    }
  }, [selectedBarber, selectedDate, isOpen]);
  async function checkAvailability() {
    if (!selectedBarber || !selectedDate) return;
    setFetchingSlots(true);
    try {
      const { data, error } = await supabase.from("appointments").select(`
          appointment_date,
          status,
          service:service_id(duration)
        `).eq("barber_id", selectedBarber.id).neq("status", "cancelled").filter("appointment_date", "gte", `${selectedDate}T00:00:00Z`).filter("appointment_date", "lte", `${selectedDate}T23:59:59Z`);
      if (error) throw error;
      if (data) {
        const apps = data.map((app) => {
          const rawDur = app.service?.duration || "30";
          const duration = Number.parseInt(String(rawDur).replace(/[^0-9]/g, ""), 10) || 30;
          return {
            date: new Date(app.appointment_date),
            duration
          };
        });
        setExistingAppointments(apps);
      }
    } catch (err) {
      console.error("Error checking availability:", err);
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
          status: "pending"
        }
      ]);
      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }
      setSuccess(true);
    } catch (error) {
      console.error("Full booking error:", error);
      const message = error instanceof Error ? error.message : "Error desconocido";
      alert(
        `Error al reservar: ${message}`
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
  const getFriendlyDate = (dateStr) => {
    if (!dateStr) return "";
    const date = /* @__PURE__ */ new Date(`${dateStr}T12:00:00`);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };
  const getFriendlyTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const h = Number.parseInt(hours);
    const ampm = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: bookingModalRef,
      className: "fixed inset-0 z-100 flex items-center justify-center p-4",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-bg/80 backdrop-blur-md w-full h-full border-none cursor-default",
            onClick: resetAndClose,
            "aria-label": "Cerrar modal"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "booking-modal-title",
            className: "relative bg-surface border border-glass-border w-full max-w-2xl max-h-[85vh] rounded-5xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300",
            children: success ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-6 animate-in zoom-in duration-500", children: [
              /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500", children: /* @__PURE__ */ jsx(Check, { className: "w-12 h-12" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-text uppercase", children: "¡Cita Agendada!" }),
                /* @__PURE__ */ jsxs("p", { className: "text-text-muted", children: [
                  "Te esperamos el",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-text font-bold capitalize", children: getFriendlyDate(selectedDate) }),
                  " ",
                  "a las",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-text font-bold", children: getFriendlyTime(selectedTime) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: resetAndClose, className: "btn-premium px-12", children: "Entendido" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-8 border-b border-glass-border flex flex-col sm:flex-row items-start sm:items-center justify-between bg-surface/50 gap-4 sm:gap-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-center sm:block", children: [
                  /* @__PURE__ */ jsx("h2", { id: "booking-modal-title", className: "text-xl sm:text-2xl font-black text-text uppercase tracking-tighter", children: "Reserva tu Cita" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-1 mt-1", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `h-1 rounded-full transition-all duration-500 ${step >= i ? "w-8 bg-primary" : "w-4 bg-primary/10"}`
                    },
                    i
                  )) })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: resetAndClose,
                    "aria-label": "Cerrar modal",
                    className: "hidden sm:block p-3 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-all",
                    children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-8 flex-1 overflow-y-auto custom-scrollbar", children: [
                step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-primary uppercase tracking-ultra mb-4 text-center", children: "¿Qué servicio necesitas?" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: services.map((service) => {
                    const ServiceIcon = IconMap[service.icon_name] || Scissors;
                    return /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => {
                          setSelectedService(service);
                          setStep(2);
                        },
                        "aria-pressed": selectedService?.id === service.id,
                        className: `flex items-center gap-4 p-4 rounded-3xl border transition-all text-left group ${selectedService?.id === service.id ? "border-primary bg-primary/5 shadow-blood-sm" : "border-glass-border bg-surface hover:border-primary/50"}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedService?.id === service.id ? "bg-primary text-white" : "bg-bg text-primary group-hover:bg-primary/20"}`,
                              children: /* @__PURE__ */ jsx(ServiceIcon, { className: "w-6 h-6" })
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "font-bold text-text group-hover:text-primary transition-colors", children: service.name }),
                            /* @__PURE__ */ jsxs("p", { className: "text-2xs text-text-muted font-black uppercase", children: [
                              "$",
                              String(service.price).replace(/[^0-9]/g, ""),
                              " • ",
                              String(service.duration).toLowerCase().includes("min") ? service.duration : `${service.duration} min`
                            ] })
                          ] })
                        ]
                      },
                      service.id
                    );
                  }) })
                ] }),
                step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-primary uppercase tracking-ultra text-center", children: "Elige a tu barbero de confianza" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: team.map((barber) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => {
                        setSelectedBarber(barber);
                        setStep(3);
                      },
                      "aria-pressed": selectedBarber?.id === barber.id,
                      className: `flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${selectedBarber?.id === barber.id ? "border-primary bg-primary/5 shadow-blood-sm" : "border-glass-border bg-surface hover:border-primary/50"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-bg flex items-center justify-center text-primary font-black text-2xl border-2 border-primary/20 overflow-hidden", children: barber.image_url ? /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: barber.image_url,
                              alt: barber.name,
                              className: "w-full h-full object-cover",
                              referrerPolicy: "no-referrer"
                            }
                          ) : barber.name.charAt(0) }),
                          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-surface" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsx("p", { className: "font-bold text-text text-sm", children: barber.name }),
                          /* @__PURE__ */ jsx("p", { className: "text-2xs text-primary font-black uppercase tracking-tighter", children: barber.role })
                        ] })
                      ]
                    },
                    barber.id
                  )) })
                ] }),
                step === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-in fade-in duration-500", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 bg-bg rounded-3xl border border-glass-border", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-text", children: selectedService?.name }),
                      /* @__PURE__ */ jsxs("p", { className: "text-2xs text-text-muted font-black uppercase", children: [
                        "Con ",
                        selectedBarber?.name
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          htmlFor: "date",
                          className: "text-2xs font-black text-text-muted uppercase tracking-ultra px-1",
                          children: "Selecciona el Día"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto pb-4 gap-2 snap-x no-scrollbar sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0", children: (() => {
                        const days = [];
                        for (let i = 0; i < 14; i++) {
                          const date = /* @__PURE__ */ new Date();
                          date.setDate(date.getDate() + i);
                          days.push({
                            fullDate: date.toISOString().split("T")[0],
                            dayName: date.toLocaleDateString("es-ES", {
                              weekday: "short"
                            }),
                            dayNumber: date.getDate(),
                            monthName: date.toLocaleDateString("es-ES", {
                              month: "short"
                            })
                          });
                        }
                        return days.map((day) => {
                          const isSelected = selectedDate === day.fullDate;
                          return /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setSelectedDate(day.fullDate);
                                setSelectedTime("");
                              },
                              "aria-pressed": isSelected,
                              className: `shrink-0 snap-start min-w-17.5 sm:min-w-0 p-3 flex flex-col items-center justify-center rounded-2xl border transition-all relative overflow-hidden group ${isSelected ? "border-primary bg-primary/10 shadow-blood-sm scale-105" : "border-glass-border bg-surface hover:border-primary/40"}`,
                              children: [
                                /* @__PURE__ */ jsx(
                                  "span",
                                  {
                                    className: `text-2xs font-black uppercase tracking-tighter ${isSelected ? "text-primary" : "text-text-muted"}`,
                                    children: day.dayName
                                  }
                                ),
                                /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-text leading-none my-1", children: day.dayNumber }),
                                /* @__PURE__ */ jsx("span", { className: "text-2xs font-bold uppercase text-text-muted tracking-tighter", children: day.monthName })
                              ]
                            },
                            day.fullDate
                          );
                        });
                      })() })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxs("label", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra px-1", children: [
                        "Hora Disponible",
                        " ",
                        fetchingSlots && /* @__PURE__ */ jsx(Loader2, { className: "inline w-3 h-3 animate-spin ml-2" })
                      ] }),
                      selectedDate ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: (() => {
                        const serviceDuration = selectedService ? Number.parseInt(String(selectedService.duration).replace(/[^0-9]/g, ""), 10) || 30 : 30;
                        const slots = generateTimeSlots(selectedDate, serviceDuration);
                        if (slots.length === 0) {
                          return /* @__PURE__ */ jsx("div", { className: "col-span-3 text-center py-4 text-xs font-bold text-text-muted", children: "No hay horarios disponibles para este día" });
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
                            buttonStyles = "bg-surface-hover border-glass-border text-text-muted/40 cursor-not-allowed line-through";
                          } else if (isSelected) {
                            buttonStyles = "bg-primary border-primary text-white shadow-blood-md";
                          } else {
                            buttonStyles = "border-glass-border hover:border-primary/50 text-text-muted";
                          }
                          return /* @__PURE__ */ jsx(
                            "button",
                            {
                              disabled: isOccupied,
                              type: "button",
                              onClick: () => setSelectedTime(time),
                              "aria-pressed": isSelected,
                              className: `py-2 rounded-xl border text-2xs font-black transition-all ${buttonStyles}`,
                              children: isOccupied ? "Ocupado" : time
                            },
                            time
                          );
                        });
                      })() }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 bg-surface/50 rounded-2xl border border-dashed border-primary/10", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-8 h-8 text-text-muted/30 mb-2" }),
                        /* @__PURE__ */ jsx("p", { className: "text-2xs text-text-muted/40 font-bold uppercase", children: "Elige un día primero" })
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-8 border-t border-glass-border bg-surface/50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0", children: [
                step > 1 ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setStep(step - 1),
                    className: "flex items-center gap-2 text-2xs font-black uppercase text-text-muted hover:text-primary transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
                      " Volver"
                    ]
                  }
                ) : /* @__PURE__ */ jsx("div", {}),
                step === 3 ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleBooking,
                    disabled: !selectedDate || !selectedTime || loading,
                    className: "btn-premium w-full sm:w-auto min-w-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                    children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : "Finalizar Reserva"
                  }
                ) : /* @__PURE__ */ jsxs("div", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
                  " Completa los pasos"
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}

function Navbar({ user, services, team, navLinks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [navbarImageError, setNavbarImageError] = useState(false);
  const loginModalRef = useFocusTrap(isLoginModalOpen);
  useEffect(() => {
    if (!isLoginModalOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsLoginModalOpen(false);
      }
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [isLoginModalOpen]);
  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    if (params.get("login") === "true") {
      setIsLoginModalOpen(true);
    } else if (params.get("login") === "unauthorized") {
      setIsLoginModalOpen(true);
      setLoginError(
        "No tienes permisos de administrador para acceder a esa sección."
      );
    }
    const handleOpenBooking = () => setIsBookingOpen(true);
    globalThis.addEventListener("open-booking", handleOpenBooking);
    return () => globalThis.removeEventListener("open-booking", handleOpenBooking);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-bg border-b border-surface shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/",
          className: "flex items-center gap-2 font-bold text-xl text-primary",
          children: [
            /* @__PURE__ */ jsx(Scissors, { className: "w-6 h-6" }),
            "Barber Ray"
          ]
        }
      ),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-6 text-sm font-medium", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          className: "hover:text-primary transition-colors",
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        user ? /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "flex items-center gap-2 text-sm font-medium text-text/80 hover:text-primary transition-colors p-1",
              onClick: () => setUserMenuOpen(!userMenuOpen),
              onBlur: () => setTimeout(() => setUserMenuOpen(false), 200),
              "aria-expanded": userMenuOpen,
              "aria-haspopup": "menu",
              "aria-label": "Menú de usuario",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 overflow-hidden", children: (user.user_metadata?.avatar_url || user.user_metadata?.picture) && !navbarImageError ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: user.user_metadata?.avatar_url || user.user_metadata?.picture,
                    alt: user.user_metadata?.full_name,
                    className: "w-full h-full object-cover",
                    referrerPolicy: "no-referrer",
                    onError: () => setNavbarImageError(true)
                  }
                ) : /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block max-w-25 truncate", children: user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0] }),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: `w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              role: "menu",
              "aria-label": "Opciones de usuario",
              className: `absolute right-0 mt-2 w-48 bg-surface border border-surface shadow-xl rounded-2xl py-2 z-60 transition-all transform origin-top-right ${userMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-b border-bg/50 mb-1", role: "presentation", children: /* @__PURE__ */ jsx("p", { className: "text-2xs text-text/40 font-medium uppercase tracking-ultra", children: "Cuenta" }) }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/profile",
                    role: "menuitem",
                    className: "flex items-center gap-3 px-4 py-2 text-sm text-text/70 hover:text-primary hover:bg-primary/5 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
                      "Mi Perfil"
                    ]
                  }
                ),
                user.isAdmin && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/admin",
                    role: "menuitem",
                    className: "flex items-center gap-3 px-4 py-2 text-sm text-amber-500 hover:bg-amber-500/5 transition-colors font-semibold",
                    children: [
                      /* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4" }),
                      "Dashboard Admin"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "my-1 border-t border-bg/50", role: "presentation" }),
                /* @__PURE__ */ jsx(
                  "form",
                  {
                    action: "/api/auth/signout",
                    method: "post",
                    className: "w-full",
                    role: "none",
                    children: /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "submit",
                        role: "menuitem",
                        className: "flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-colors w-full text-left",
                        children: [
                          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                          "Cerrar sesión"
                        ]
                      }
                    )
                  }
                )
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsLoginModalOpen(true),
            className: "hidden md:inline-flex bg-surface hover:bg-surface-hover text-text text-sm font-semibold px-5 py-2 rounded-full transition-colors border border-glass-border",
            children: "Iniciar sesión"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => user ? setIsBookingOpen(true) : setIsLoginModalOpen(true),
            className: "hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-black px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 uppercase tracking-ultra",
            children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              "Agendar Cita"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "md:hidden p-2 text-text",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            "aria-label": "Menú",
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, {}) : /* @__PURE__ */ jsx(Menu, {})
          }
        )
      ] })
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsxs("nav", { className: "md:hidden bg-bg border-t border-surface px-4 py-4 flex flex-col gap-4 text-sm font-medium", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          className: "hover:text-primary transition-colors",
          onClick: () => setMobileMenuOpen(false),
          children: link.label
        },
        link.href
      )),
      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-surface flex flex-col gap-4", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden", children: (user.user_metadata?.avatar_url || user.user_metadata?.picture) && !navbarImageError ? /* @__PURE__ */ jsx(
            "img",
            {
              src: user.user_metadata?.avatar_url || user.user_metadata?.picture,
              alt: user.user_metadata?.full_name,
              className: "w-full h-full object-cover",
              onError: () => setNavbarImageError(true)
            }
          ) : /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: user.user_metadata?.full_name || "Usuario" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-text/40", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "form",
          {
            action: "/api/auth/signout",
            method: "post",
            className: "w-full",
            children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "w-full bg-surface hover:bg-surface/80 text-text font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" }),
                  "Cerrar sesión"
                ]
              }
            )
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setMobileMenuOpen(false);
            setIsLoginModalOpen(true);
          },
          className: "bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-3 rounded-xl text-center transition-colors",
          children: "Iniciar sesión"
        }
      ) })
    ] }),
    isLoginModalOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        ref: loginModalRef,
        className: "fixed inset-0 z-100 flex items-center justify-center p-4",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute inset-0 bg-bg/80 backdrop-blur-sm transition-opacity w-full h-full border-none cursor-default",
              onClick: () => setIsLoginModalOpen(false),
              "aria-label": "Cerrar modal",
              title: "Cerrar modal"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "login-modal-title",
              className: "relative bg-surface border border-surface w-full max-w-md rounded-3xl p-8 md:p-10 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsLoginModalOpen(false),
                    "aria-label": "Cerrar modal",
                    className: "absolute top-6 right-6 p-2 text-text/40 hover:text-primary transition-colors",
                    children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Scissors, { className: "w-8 h-8 text-primary" }) }),
                  /* @__PURE__ */ jsxs("h2", { id: "login-modal-title", className: "text-3xl font-black text-text mb-2", children: [
                    "Bienvenido",
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "." })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-text/60 mb-10 text-sm", children: "Inicia sesión para gestionar tu cuenta y citas en Barber Ray." }),
                  loginError && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold", children: loginError }),
                  /* @__PURE__ */ jsx("form", { action: "/api/auth/signin", method: "post", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      className: "w-full flex items-center justify-center gap-3 bg-text text-bg font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg",
                      children: [
                        /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "currentColor",
                              d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "currentColor",
                              d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "currentColor",
                              d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "currentColor",
                              d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            }
                          )
                        ] }),
                        "Continuar con Google"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("p", { className: "mt-8 text-2xs text-text/40 px-6 uppercase tracking-ultra font-medium", children: "Estilo • Tradición • Excelencia" })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      BookingModal,
      {
        isOpen: isBookingOpen,
        onClose: () => setIsBookingOpen(false),
        services,
        team,
        user
      }
    )
  ] });
}

const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/node_modules/.pnpm/@vercel+analytics@2.0.1_react@19.2.5/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/node_modules/.pnpm/@vercel+analytics@2.0.1_react@19.2.5/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/node_modules/.pnpm/@vercel+speed-insights@2.0.0_react@19.2.5/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/node_modules/.pnpm/@vercel+speed-insights@2.0.0_react@19.2.5/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Barber Ray | Barbería de Alta Gama en México",
    description = "Barber Ray - Barbería profesional de alta gama. Cortes de precisión, estilo clásico y contemporáneo. Reserva tu cita hoy mismo.",
    services: initialServices = [],
    team: initialTeam = [],
    lcpImage = "/barber_hero_premium.webp",
    navLinks: initialNavLinks = []
  } = Astro2.props;
  const canonicalUrl = Astro2.url.href;
  const ogImageUrl = "https://barber-ray.vercel.app/barber_hero_premium.webp";
  const { user } = Astro2.locals;
  const { cookies, request } = Astro2;
  const supabase = createSupabaseClient(request, cookies);
  let navLinks = initialNavLinks;
  if (navLinks.length === 0) {
    const { data: dbNavLinks } = await supabase.from("nav_links").select("*").order("sort_order", { ascending: true });
    const rawNavLinks = dbNavLinks || [];
    navLinks = rawNavLinks.map((link) => ({
      ...link,
      href: link.href.startsWith("#") ? `/${link.href}` : link.href
    }));
  }
  let services = initialServices;
  if (services.length === 0) {
    const { data: dbServices } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    services = dbServices || [];
  }
  let team = initialTeam;
  if (team.length === 0) {
    const { data: dbTeam } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
    team = dbTeam || [];
  }
  return renderTemplate(_a || (_a = __template([`<html lang="es-MX" class="overflow-x-hidden"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Google Search Console Verification --><meta name="google-site-verification" content="86zTL5sjVmETD11ePLYHGDRuuMLeml4NyXPdZmlkcP4"><link rel="icon" type="image/png" href="/favicon.png"><!-- Font Optimization --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap" media="print" onload="this.media='all'">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap"></noscript><!-- Preload LCP Image --><link rel="preload" as="image"', ' fetchpriority="high">', "<!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><meta name="keywords" content="barbería, barber ray, corte de pelo, barba, estilo masculino, peluquería, barbería premium, corte profesional"><meta name="author" content="Barber Ray"><meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:secure_url"', '><meta property="og:image:type" content="image/webp"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Barber Ray - Barbería profesional de alta gama"><meta property="og:locale" content="es_MX"><meta property="og:site_name" content="Barber Ray"><!-- Twitter / X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt" content="Barber Ray - Barbería profesional de alta gama"><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "BarberShop",\n        "name": "Barbería Ray",\n        "image": "https://barber-ray.vercel.app/barber_hero_premium.webp",\n        "@id": "https://barber-ray.vercel.app",\n        "url": "https://barber-ray.vercel.app",\n        "telephone": "+524626009179",\n        "address": {\n          "@type": "PostalAddress",\n          "streetAddress": "Barcelona 3778",\n          "addressLocality": "Bernardo Cobos, Irapuato",\n          "addressRegion": "Guanajuato",\n          "postalCode": "36610",\n          "addressCountry": "MX"\n        },\n        "geo": {\n          "@type": "GeoCoordinates",\n          "latitude": "20.7029562",\n          "longitude": "-101.3411831"\n        },\n        "openingHoursSpecification": [\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": [\n              "Monday",\n              "Tuesday",\n              "Wednesday",\n              "Thursday",\n              "Friday"\n            ],\n            "opens": "10:00",\n            "closes": "21:00"\n          },\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": "Saturday",\n            "opens": "08:00",\n            "closes": "18:00"\n          },\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": "Sunday",\n            "opens": "11:00",\n            "closes": "18:00"\n          }\n        ],\n        "priceRange": "$$"\n      }\n    <\/script><script>\n      const getTheme = () => {\n        if (\n          typeof localStorage !== "undefined" &&\n          localStorage.getItem("theme")\n        ) {\n          return localStorage.getItem("theme");\n        }\n        return window.matchMedia("(prefers-color-scheme: dark)").matches\n          ? "dark"\n          : "light";\n      };\n\n      const theme = getTheme();\n      if (theme === "dark") {\n        document.documentElement.classList.add("dark");\n      } else {\n        document.documentElement.classList.remove("dark");\n      }\n    <\/script>', '</head> <body class="bg-bg text-text min-h-screen overflow-x-hidden w-full relative"> ', " ", " ", ' <script>\n      document.addEventListener("mousemove", (e) => {\n        const x = (e.clientX / window.innerWidth) * 100;\n        const y = (e.clientY / window.innerHeight) * 100;\n\n        document.body.style.setProperty("--mouse-x", `${x}%`);\n        document.body.style.setProperty("--mouse-y", `${y}%`);\n      });\n    <\/script> </body> </html>'], [`<html lang="es-MX" class="overflow-x-hidden"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Google Search Console Verification --><meta name="google-site-verification" content="86zTL5sjVmETD11ePLYHGDRuuMLeml4NyXPdZmlkcP4"><link rel="icon" type="image/png" href="/favicon.png"><!-- Font Optimization --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap" media="print" onload="this.media='all'">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Syne:wght@400;700;800&display=swap"></noscript><!-- Preload LCP Image --><link rel="preload" as="image"', ' fetchpriority="high">', "<!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><meta name="keywords" content="barbería, barber ray, corte de pelo, barba, estilo masculino, peluquería, barbería premium, corte profesional"><meta name="author" content="Barber Ray"><meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:secure_url"', '><meta property="og:image:type" content="image/webp"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Barber Ray - Barbería profesional de alta gama"><meta property="og:locale" content="es_MX"><meta property="og:site_name" content="Barber Ray"><!-- Twitter / X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt" content="Barber Ray - Barbería profesional de alta gama"><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "BarberShop",\n        "name": "Barbería Ray",\n        "image": "https://barber-ray.vercel.app/barber_hero_premium.webp",\n        "@id": "https://barber-ray.vercel.app",\n        "url": "https://barber-ray.vercel.app",\n        "telephone": "+524626009179",\n        "address": {\n          "@type": "PostalAddress",\n          "streetAddress": "Barcelona 3778",\n          "addressLocality": "Bernardo Cobos, Irapuato",\n          "addressRegion": "Guanajuato",\n          "postalCode": "36610",\n          "addressCountry": "MX"\n        },\n        "geo": {\n          "@type": "GeoCoordinates",\n          "latitude": "20.7029562",\n          "longitude": "-101.3411831"\n        },\n        "openingHoursSpecification": [\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": [\n              "Monday",\n              "Tuesday",\n              "Wednesday",\n              "Thursday",\n              "Friday"\n            ],\n            "opens": "10:00",\n            "closes": "21:00"\n          },\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": "Saturday",\n            "opens": "08:00",\n            "closes": "18:00"\n          },\n          {\n            "@type": "OpeningHoursSpecification",\n            "dayOfWeek": "Sunday",\n            "opens": "11:00",\n            "closes": "18:00"\n          }\n        ],\n        "priceRange": "$$"\n      }\n    <\/script><script>\n      const getTheme = () => {\n        if (\n          typeof localStorage !== "undefined" &&\n          localStorage.getItem("theme")\n        ) {\n          return localStorage.getItem("theme");\n        }\n        return window.matchMedia("(prefers-color-scheme: dark)").matches\n          ? "dark"\n          : "light";\n      };\n\n      const theme = getTheme();\n      if (theme === "dark") {\n        document.documentElement.classList.add("dark");\n      } else {\n        document.documentElement.classList.remove("dark");\n      }\n    <\/script>', '</head> <body class="bg-bg text-text min-h-screen overflow-x-hidden w-full relative"> ', " ", " ", ' <script>\n      document.addEventListener("mousemove", (e) => {\n        const x = (e.clientX / window.innerWidth) * 100;\n        const y = (e.clientY / window.innerHeight) * 100;\n\n        document.body.style.setProperty("--mouse-x", \\`\\${x}%\\`);\n        document.body.style.setProperty("--mouse-y", \\`\\${y}%\\`);\n      });\n    <\/script> </body> </html>'])), maybeRenderHead(), addAttribute(lcpImage, "href"), renderComponent($$result, "Analytics", $$Index$1, {}), title, addAttribute(description, "content"), addAttribute(canonicalUrl, "href"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImageUrl, "content"), addAttribute(ogImageUrl, "content"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImageUrl, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "user": user, "services": services, "team": team, "navLinks": navLinks, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/Navbar", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "SpeedInsights", $$Index, {}));
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/layouts/Layout.astro", void 0);

export { $$Layout as $, useFocusTrap as u };
