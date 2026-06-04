import { c as createComponent } from './astro-component_DIAFUT9k.mjs';
import { V as renderTemplate, C as maybeRenderHead } from './sequence_krGa48tk.mjs';
import { r as renderComponent } from './entrypoint_CrODMIMm.mjs';
import { $ as $$Layout } from './Layout_DxOM2QhA.mjs';
import { c as createSupabaseClient } from './supabase_CNNSamdl.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { User, Loader2, CalendarX, Calendar, Scissors, Star, ChevronRight, X } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  "https://sjjaracpnvlhcafzjjso.supabase.co",
  "sb_publishable_6kvaFF6obTbPYsg9DFdEIg_FrV1Gg2D"
);
function ProfileView({ user, initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isCancelling, setIsCancelling] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [reviewingAppointment, setReviewingAppointment] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState({});
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [imageError, setImageError] = useState(false);
  const getFriendlyTime = (dateStr) => {
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
      const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
      if (error) throw error;
      setAppointments(
        appointments.map(
          (app) => app.id === id ? { ...app, status: "cancelled" } : app
        )
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
        const { data } = await supabase.from("appointment_reviews").select("*").in(
          "appointment_id",
          appointments.map((a) => a.id)
        );
        if (data) {
          const reviewsMap = data.reduce((acc, rev) => {
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
        comment
      });
      if (error) throw error;
      setReviews({
        ...reviews,
        [reviewingAppointment.id]: { rating, comment }
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
    (app) => new Date(app.appointment_date) > /* @__PURE__ */ new Date() && app.status !== "cancelled"
  );
  const pastAppointments = appointments.filter(
    (app) => new Date(app.appointment_date) <= /* @__PURE__ */ new Date() || app.status === "cancelled"
  );
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-16 pb-20", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000 mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
        /* @__PURE__ */ jsx("div", { className: "w-32 h-32 rounded-full bg-surface border-2 border-primary/20 p-1 shadow-2xl mx-auto overflow-hidden group", children: (user.user_metadata?.avatar_url || user.user_metadata?.picture) && !imageError ? /* @__PURE__ */ jsx(
          "img",
          {
            src: user.user_metadata?.avatar_url || user.user_metadata?.picture,
            alt: user.user_metadata?.full_name,
            className: "w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110",
            onError: () => setImageError(true)
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full rounded-full bg-bg flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(User, { className: "w-12 h-12" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-bg flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full animate-pulse" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-black text-text uppercase tracking-tight", children: user.user_metadata?.full_name || "Cliente" }),
        /* @__PURE__ */ jsx("p", { className: "text-text-muted font-bold text-sm uppercase tracking-ultra", children: user.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 text-2xs font-black text-primary uppercase tracking-ultra", children: "Cliente VIP" }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-1.5 rounded-full bg-surface border border-primary/10 text-2xs font-black text-text-muted uppercase tracking-ultra", children: [
          appointments.length,
          " Visitas"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300", children: [
      /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-primary rounded-full" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-text uppercase tracking-ultra", children: "Agenda Próxima" })
        ] }),
        upcomingAppointments.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: upcomingAppointments.map((app) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group glass rounded-3xl p-6 border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full md:w-40 flex flex-col items-center justify-center p-4 bg-primary/5 rounded-2xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500", children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xs font-black uppercase tracking-tighter opacity-60", children: new Date(app.appointment_date).toLocaleDateString(
                  "es-ES",
                  { weekday: "short" }
                ) }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-black my-1", children: new Date(app.appointment_date).getDate() }),
                /* @__PURE__ */ jsx("span", { className: "text-2xs font-black uppercase tracking-ultra", children: getFriendlyTime(app.appointment_date) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-2 md:gap-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-text tracking-tight uppercase", children: app.service.name }),
                  /* @__PURE__ */ jsx("span", { className: "w-fit mx-auto md:mx-0 px-3 py-1 rounded-lg bg-primary/10 text-primary text-2xs font-black uppercase", children: String(app.service.duration).toLowerCase().includes("min") ? app.service.duration : `${app.service.duration} min` })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-text-muted text-xs font-bold uppercase flex items-center justify-center md:justify-start gap-2", children: [
                  /* @__PURE__ */ jsx(User, { className: "w-3 h-3 text-primary" }),
                  "Especialista: ",
                  app.barber.name
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-black/5 dark:border-white/5 pt-4 md:pt-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-2xl font-black text-primary tracking-tighter", children: [
                    "$",
                    app.service.price
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-4xs font-black text-text-muted uppercase tracking-ultra", children: "Precio Final" })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setShowConfirmModal(app.id),
                    disabled: isCancelling === app.id,
                    className: "p-3.5 rounded-2xl bg-surface text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all border border-primary/10 shadow-sm active:scale-95",
                    children: isCancelling === app.id ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(CalendarX, { className: "w-5 h-5" })
                  }
                )
              ] })
            ]
          },
          app.id
        )) }) : /* @__PURE__ */ jsxs("div", { className: "glass rounded-5xl p-16 text-center border border-dashed border-black/10 dark:border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted/30", children: /* @__PURE__ */ jsx(Calendar, { className: "w-10 h-10" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-text uppercase mb-2", children: "Sin citas pendientes" }),
          /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm font-bold uppercase tracking-ultra mb-8", children: "No tienes citas agendadas para los próximos días." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => globalThis.dispatchEvent(new CustomEvent("open-booking")),
              className: "btn-premium px-12",
              children: "Agendar Cita"
            }
          )
        ] })
      ] }),
      pastAppointments.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-6 pt-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-black text-text-muted uppercase tracking-giga px-2", children: "Historial Reciente" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: pastAppointments.map((app) => {
          const isCancelled = app.status === "cancelled";
          const isPendingReview = !isLoadingReviews && !reviews[app.id] && !isCancelled;
          let iconWrapperClass = "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white";
          let buttonOpacityClass = "opacity-70 hover:opacity-100 border-primary/5";
          let StatusIcon = Scissors;
          let iconFillClass = "";
          let titleClass = "text-text";
          let StatusBadge = null;
          if (isCancelled) {
            iconWrapperClass = "bg-red-500/10 text-red-500";
            StatusIcon = X;
            titleClass = "text-text/40 line-through";
            StatusBadge = /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-4xs font-black uppercase tracking-tighter", children: "Cancelada" });
          } else if (isPendingReview) {
            iconWrapperClass = "bg-amber-500 text-white animate-pulse";
            buttonOpacityClass = "opacity-100 border-amber-500/30 bg-amber-500/5 shadow-lg shadow-amber-500/5";
            StatusIcon = Star;
            iconFillClass = "fill-current";
            StatusBadge = /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-amber-500 text-4xs font-black uppercase text-white tracking-tighter", children: "Pendiente" });
          }
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setReviewingAppointment(app);
                const existing = reviews[app.id];
                if (existing) {
                  setRating(existing.rating);
                  setComment(existing.comment || "");
                } else {
                  setRating(5);
                  setComment("");
                }
              },
              className: `glass rounded-2xl p-4 border flex items-center justify-between group hover:bg-surface-hover transition-all text-left w-full ${buttonOpacityClass}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${iconWrapperClass}`,
                      children: /* @__PURE__ */ jsx(StatusIcon, { className: `w-6 h-6 ${iconFillClass}` })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("p", { className: `font-bold text-sm ${titleClass}`, children: app.service.name }),
                      StatusBadge
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-2xs text-text-muted group-hover:text-text font-bold uppercase tracking-tighter transition-colors", children: [
                        new Date(
                          app.appointment_date
                        ).toLocaleDateString(),
                        " ",
                        "• ",
                        app.barber.name
                      ] }),
                      reviews[app.id] && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 text-amber-500", children: [
                        /* @__PURE__ */ jsx(Star, { className: "w-2 h-2 fill-current" }),
                        /* @__PURE__ */ jsx("span", { className: "text-4xs font-bold", children: reviews[app.id].rating })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  !isLoadingReviews && !reviews[app.id] && /* @__PURE__ */ jsx("span", { className: "text-2xs font-black text-amber-500 uppercase tracking-tight hidden md:block", children: "Dejar Reseña" }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" })
                ] })
              ]
            },
            app.id
          );
        }) })
      ] })
    ] }),
    showConfirmModal && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-100 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0 w-full h-full bg-bg/80 backdrop-blur-md animate-in fade-in duration-300 border-none cursor-default",
          onClick: () => setShowConfirmModal(null),
          "aria-label": "Cerrar modal"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-surface border border-white/10 w-full max-w-sm rounded-4xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 text-center space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto text-red-500 shadow-inner", children: /* @__PURE__ */ jsx(CalendarX, { className: "w-10 h-10" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-text uppercase tracking-tighter", children: "¿Cancelar Cita?" }),
          /* @__PURE__ */ jsx("p", { className: "text-text-muted text-sm font-medium", children: "Esta acción liberará tu lugar en la agenda. ¿Seguro que quieres cancelar?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCancelAppointment,
              className: "w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-red-600/20 active:scale-95",
              children: "Sí, Cancelar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowConfirmModal(null),
              className: "w-full py-4 bg-surface text-text-muted font-bold uppercase tracking-ultra rounded-2xl border border-primary/10 hover:text-text transition-all",
              children: "Volver"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowConfirmModal(null),
            className: "absolute top-4 right-4 p-2 text-text-muted hover:text-primary transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    reviewingAppointment && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-100 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0 w-full h-full bg-bg/80 backdrop-blur-md animate-in fade-in duration-300 border-none cursor-default",
          onClick: () => setReviewingAppointment(null),
          "aria-label": "Cerrar modal de reseña"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-surface border border-primary/10 w-full max-w-md rounded-5xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 bg-primary text-white space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/10 rounded-2xl", children: /* @__PURE__ */ jsx(Scissors, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setReviewingAppointment(null),
                className: "p-2 hover:bg-white/10 rounded-full transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase tracking-tight", children: "Detalle de la Cita" }),
            /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-2xs font-bold uppercase tracking-ultra", children: [
              "ID: ",
              reviewingAppointment.id.slice(0, 8)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra", children: "Servicio" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-text", children: reviewingAppointment.service.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra", children: "Barbero" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-text", children: reviewingAppointment.barber.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra", children: "Fecha" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-text", children: new Date(
                reviewingAppointment.appointment_date
              ).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xs font-black text-text-muted uppercase tracking-ultra", children: "Precio" }),
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-primary", children: [
                "$",
                reviewingAppointment.service.price
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-primary/5 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-text uppercase tracking-widest", children: reviews[reviewingAppointment.id] ? "Tu Calificación" : "¿Qué tal estuvo el servicio?" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => !reviews[reviewingAppointment.id] && setRating(star),
                  className: `transition-all duration-300 ${reviews[reviewingAppointment.id] ? "cursor-default" : "hover:scale-125 cursor-pointer"}`,
                  children: /* @__PURE__ */ jsx(
                    Star,
                    {
                      className: `w-8 h-8 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-text-muted/20"}`
                    }
                  )
                },
                star
              )) })
            ] }),
            reviews[reviewingAppointment.id] ? /* @__PURE__ */ jsxs("div", { className: "p-4 bg-bg rounded-2xl border border-primary/5 italic text-sm text-text-muted text-center", children: [
              '"',
              reviews[reviewingAppointment.id].comment || "Sin comentarios adicionales.",
              '"'
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  placeholder: "Déjanos un comentario...",
                  value: comment,
                  onChange: (e) => setComment(e.target.value),
                  className: "w-full h-24 p-4 bg-bg border border-primary/10 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleReviewSubmit,
                  disabled: isSubmittingReview,
                  className: "w-full py-4 btn-premium flex items-center justify-center gap-2",
                  children: isSubmittingReview ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : "Enviar Calificación"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Profile;
  const { user } = Astro2.locals;
  if (!user) {
    return Astro2.redirect("/?login=true");
  }
  const supabase = createSupabaseClient(Astro2.request, Astro2.cookies);
  const [
    { data: appointments, error: errApp },
    { data: navLinks, error: errNav }
  ] = await Promise.all([
    supabase.from("appointments").select(`
      *,
      service:service_id(name, price, duration),
      barber:barber_id(name)
    `).eq("user_id", user.id).order("appointment_date", { ascending: false }),
    supabase.from("nav_links").select("*").order("sort_order", { ascending: true })
  ]);
  if (errApp || errNav) {
    console.error("Error fetching profile data:", errApp || errNav);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Perfil | ${user.user_metadata?.full_name || "Usuario"}`, "navLinks": navLinks || [] }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="pt-32 pb-24 px-4 min-h-screen"> <div class="max-w-5xl mx-auto"> ${renderComponent($$result2, "ProfileView", ProfileView, { "user": user, "initialAppointments": appointments || [], "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/components/public/ProfileView", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/profile.astro", void 0);

const $$file = "C:/Users/DGTITCJARAMILLOR/Documents/coding/own/Astro/barber-ray/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
