import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Clock,
  CalendarX,
  AlertCircle,
  Scissors,
  Loader2,
  ChevronRight,
  X,
  AlertTriangle,
  Star,
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import type { AppUser } from "../../interfaces/auth/user.interface";

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

interface Appointment {
  id: string;
  appointment_date: string;
  status: string;
  service: {
    name: string;
    price: string;
    duration: string;
  };
  barber: {
    name: string;
  };
}

interface Props {
  readonly user: AppUser;
  readonly initialAppointments: Appointment[];
}

export default function ProfileView({ user, initialAppointments }: Props) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);
  const [reviewingAppointment, setReviewingAppointment] =
    useState<Appointment | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState<Record<string, any>>({});
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getFriendlyDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getFriendlyTime = (dateStr: string) => {
    const date = new Date(dateStr);
    let h = date.getUTCHours();
    const m = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  const handleCancelAppointment = async () => {
    if (!showConfirmModal) return;

    const id = showConfirmModal;
    setIsCancelling(id);
    setShowConfirmModal(null);

    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;

      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "cancelled" } : app,
        ),
      );
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("No pudimos cancelar la cita. Inténtalo de nuevo.");
    } finally {
      setIsCancelling(null);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("appointment_reviews")
          .select("*")
          .in(
            "appointment_id",
            appointments.map((a) => a.id),
          );

        if (data) {
          const reviewsMap = data.reduce((acc: any, rev: any) => {
            acc[rev.appointment_id] = rev;
            return acc;
          }, {});
          setReviews(reviewsMap);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (appointments.length > 0) {
      fetchReviews();
    } else {
      setIsLoadingReviews(false);
    }
  }, [appointments]);

  const handleReviewSubmit = async () => {
    if (!reviewingAppointment) return;
    setIsSubmittingReview(true);

    try {
      const { error } = await supabase.from("appointment_reviews").upsert({
        appointment_id: reviewingAppointment.id,
        rating,
        comment,
      });

      if (error) throw error;

      setReviews({
        ...reviews,
        [reviewingAppointment.id]: { rating, comment },
      });
      setReviewingAppointment(null);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("No pudimos guardar tu calificación. Inténtalo de nuevo.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const upcomingAppointments = appointments.filter(
    (app) => 
      new Date(app.appointment_date) > new Date() && 
      app.status !== "cancelled"
  );

  const pastAppointments = appointments.filter(
    (app) => 
      new Date(app.appointment_date) <= new Date() || 
      app.status === "cancelled"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      {/* Header Minimalista y Centrado */}
      <header className="text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000 mt-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full bg-surface border-2 border-primary/20 p-1 shadow-2xl mx-auto overflow-hidden group">
            {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && !imageError ? (
              <img
                src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                alt={user.user_metadata?.full_name}
                className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-bg flex items-center justify-center text-primary">
                <User className="w-12 h-12" />
              </div>
            )}
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-bg flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-text uppercase tracking-tight">
            {user.user_metadata?.full_name || "Cliente"}
          </h1>
          <p className="text-text-muted font-bold text-sm uppercase tracking-ultra">
            {user.email}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 text-2xs font-black text-primary uppercase tracking-ultra">
            Cliente VIP
          </div>
          <div className="px-4 py-1.5 rounded-full bg-surface border border-primary/10 text-2xs font-black text-text-muted uppercase tracking-ultra">
            {appointments.length} Visitas
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
        {/* Próximas Citas */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-black text-text uppercase tracking-ultra">
              Agenda Próxima
            </h2>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((app) => (
                <div
                  key={app.id}
                  className="group glass rounded-3xl p-6 border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
                >
                  {/* Left: Date/Time Badge */}
                  <div className="w-full md:w-40 flex flex-col items-center justify-center p-4 bg-primary/5 rounded-2xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <span className="text-2xs font-black uppercase tracking-tighter opacity-60">
                      {new Date(app.appointment_date).toLocaleDateString(
                        "es-ES",
                        { weekday: "short" },
                      )}
                    </span>
                    <span className="text-3xl font-black my-1">
                      {new Date(app.appointment_date).getDate()}
                    </span>
                    <span className="text-2xs font-black uppercase tracking-ultra">
                      {getFriendlyTime(app.appointment_date)}
                    </span>
                  </div>

                  {/* Middle: Service Info */}
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <h3 className="text-2xl font-black text-text tracking-tight uppercase">
                        {app.service.name}
                      </h3>
                      <span className="w-fit mx-auto md:mx-0 px-3 py-1 rounded-lg bg-primary/10 text-primary text-2xs font-black uppercase">
                        {app.service.duration}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs font-bold uppercase flex items-center justify-center md:justify-start gap-2">
                      <User className="w-3 h-3 text-primary" />
                      Especialista: {app.barber.name}
                    </p>
                  </div>

                  {/* Right: Price & Cancel */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-black/5 dark:border-white/5 pt-4 md:pt-0">
                    <div className="text-right">
                      <p className="text-2xl font-black text-primary tracking-tighter">
                        ${app.service.price}
                      </p>
                      <p className="text-4xs font-black text-text-muted uppercase tracking-ultra">
                        Precio Final
                      </p>
                    </div>
                    <button
                      onClick={() => setShowConfirmModal(app.id)}
                      disabled={isCancelling === app.id}
                      className="p-3.5 rounded-2xl bg-surface text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all border border-primary/10 shadow-sm active:scale-95"
                    >
                      {isCancelling === app.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <CalendarX className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-5xl p-16 text-center border border-dashed border-black/10 dark:border-white/10">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted/30">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-text uppercase mb-2">
                Sin citas pendientes
              </h3>
              <p className="text-text-muted text-sm font-bold uppercase tracking-ultra mb-8">
                No tienes citas agendadas para los próximos días.
              </p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
                className="btn-premium px-12"
              >
                Agendar Cita
              </button>
            </div>
          )}
        </section>

        {/* Historial */}
        {pastAppointments.length > 0 && (
          <section className="space-y-6 pt-8">
            <h2 className="text-xs font-black text-text-muted uppercase tracking-giga px-2">
              Historial Reciente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pastAppointments.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setReviewingAppointment(app);
                    const existing = reviews[app.id];
                    if (existing) {
                      setRating(existing.rating);
                      setComment(existing.comment || "");
                    } else {
                      setRating(5);
                      setComment("");
                    }
                  }}
                  className={`glass rounded-2xl p-4 border flex items-center justify-between group hover:bg-surface-hover transition-all text-left w-full ${
                    !isLoadingReviews && !reviews[app.id]
                      ? "opacity-100 border-amber-500/30 bg-amber-500/5 shadow-lg shadow-amber-500/5"
                      : "opacity-70 hover:opacity-100 border-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                      app.status === "cancelled"
                        ? "bg-red-500/10 text-red-500"
                        : !isLoadingReviews && !reviews[app.id]
                        ? "bg-amber-500 text-white animate-pulse"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                    }`}>
                      {app.status === "cancelled" ? (
                        <X className="w-6 h-6" />
                      ) : !isLoadingReviews && !reviews[app.id] ? (
                        <Star className="w-6 h-6 fill-current" />
                      ) : (
                        <Scissors className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm ${app.status === "cancelled" ? "text-text/40 line-through" : "text-text"}`}>
                          {app.service.name}
                        </p>
                        {app.status === "cancelled" ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-tighter">
                            Cancelada
                          </span>
                        ) : !isLoadingReviews && !reviews[app.id] && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[8px] font-black uppercase text-white tracking-tighter">
                            Pendiente
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xs text-text-muted group-hover:text-text font-bold uppercase tracking-tighter transition-colors">
                          {new Date(app.appointment_date).toLocaleDateString()} • {app.barber.name}
                        </p>
                        {reviews[app.id] && (
                          <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="w-2 h-2 fill-current" />
                            <span className="text-4xs font-bold">
                              {reviews[app.id].rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isLoadingReviews && !reviews[app.id] && <span className="text-[10px] font-black text-amber-500 uppercase tracking-tight hidden md:block">Dejar Reseña</span>}
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal de Confirmación Premium */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowConfirmModal(null)}
          />

          <div className="relative bg-surface border border-white/10 w-full max-w-sm rounded-4xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 text-center space-y-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto text-red-500 shadow-inner">
              <CalendarX className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-text uppercase tracking-tighter">
                ¿Cancelar Cita?
              </h3>
              <p className="text-text-muted text-sm font-medium">
                Esta acción liberará tu lugar en la agenda. ¿Seguro que quieres
                cancelar?
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleCancelAppointment}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                Sí, Cancelar
              </button>
              <button
                onClick={() => setShowConfirmModal(null)}
                className="w-full py-4 bg-surface text-text-muted font-bold uppercase tracking-ultra rounded-2xl border border-primary/10 hover:text-text transition-all"
              >
                Volver
              </button>
            </div>

            <button
              onClick={() => setShowConfirmModal(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {/* Modal de Detalle y Calificación */}
      {reviewingAppointment && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setReviewingAppointment(null)}
          />

          <div className="relative bg-surface border border-primary/10 w-full max-w-md rounded-5xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header del Modal */}
            <div className="p-8 bg-primary text-white space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Scissors className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setReviewingAppointment(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  Detalle de la Cita
                </h3>
                <p className="text-white/60 text-2xs font-bold uppercase tracking-ultra">
                  ID: {reviewingAppointment.id.slice(0, 8)}
                </p>
              </div>
            </div>

            {/* Info de la Cita */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-2xs font-black text-text-muted uppercase tracking-ultra">
                    Servicio
                  </p>
                  <p className="font-bold text-text">
                    {reviewingAppointment.service.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xs font-black text-text-muted uppercase tracking-ultra">
                    Barbero
                  </p>
                  <p className="font-bold text-text">
                    {reviewingAppointment.barber.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xs font-black text-text-muted uppercase tracking-ultra">
                    Fecha
                  </p>
                  <p className="font-bold text-text">
                    {new Date(
                      reviewingAppointment.appointment_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xs font-black text-text-muted uppercase tracking-ultra">
                    Precio
                  </p>
                  <p className="font-bold text-primary">
                    ${reviewingAppointment.service.price}
                  </p>
                </div>
              </div>

              {/* Sección de Calificación */}
              <div className="pt-6 border-t border-primary/5 space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-xs font-black text-text uppercase tracking-widest">
                    {reviews[reviewingAppointment.id]
                      ? "Tu Calificación"
                      : "¿Qué tal estuvo el servicio?"}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          !reviews[reviewingAppointment.id] && setRating(star)
                        }
                        className={`transition-all duration-300 ${!reviews[reviewingAppointment.id] ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-text-muted/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {!reviews[reviewingAppointment.id] ? (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Déjanos un comentario..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full h-24 p-4 bg-bg border border-primary/10 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                    <button
                      onClick={handleReviewSubmit}
                      disabled={isSubmittingReview}
                      className="w-full py-4 btn-premium flex items-center justify-center gap-2"
                    >
                      {isSubmittingReview ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Enviar Calificación"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-bg rounded-2xl border border-primary/5 italic text-sm text-text-muted text-center">
                    "
                    {reviews[reviewingAppointment.id].comment ||
                      "Sin comentarios adicionales."}
                    "
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
