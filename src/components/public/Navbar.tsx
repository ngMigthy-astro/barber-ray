import ThemeToggle from "../shared/ThemeToggle";
import BookingModal from "../shared/BookingModal";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Scissors,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import type { AppUser } from "../../interfaces/auth/user.interface";

interface Props {
  readonly user: AppUser | null;
  readonly services: readonly any[];
  readonly team: readonly any[];
  readonly navLinks: readonly { label: string; href: string }[];
}

export default function Navbar({ user, services, team, navLinks }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [navbarImageError, setNavbarImageError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    if (params.get("login") === "true") {
      setIsLoginModalOpen(true);
    } else if (params.get("login") === "unauthorized") {
      setIsLoginModalOpen(true);
      setLoginError(
        "No tienes permisos de administrador para acceder a esa sección.",
      );
    }

    // Escuchar evento para abrir reserva desde cualquier lugar
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("open-booking", handleOpenBooking);

    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-surface shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Scissors className="w-6 h-6" />
          Barber Ray
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 text-sm font-medium text-text/80 hover:text-primary transition-colors p-1"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 overflow-hidden">
                  {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && !navbarImageError ? (
                    <img
                      src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                      alt={user.user_metadata?.full_name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={() => setNavbarImageError(true)}
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <span className="hidden sm:inline-block max-w-25 truncate">
                  {user.user_metadata?.full_name?.split(" ")[0] ||
                    user.email?.split("@")[0]}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-surface border border-surface shadow-xl rounded-2xl py-2 z-60 transition-all transform origin-top-right ${userMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <div className="px-4 py-2 border-b border-bg/50 mb-1">
                  <p className="text-2xs text-text/40 font-medium uppercase tracking-ultra">
                    Cuenta
                  </p>
                </div>

                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-text/70 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </a>

                {user.isAdmin && (
                  <a
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-amber-500 hover:bg-amber-500/5 transition-colors font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard Admin
                  </a>
                )}

                <div className="my-1 border-t border-bg/50"></div>

                <form
                  action="/api/auth/signout"
                  method="post"
                  className="w-full"
                >
                  <button
                    type="submit"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden md:inline-flex bg-surface hover:bg-surface-hover text-text text-sm font-semibold px-5 py-2 rounded-full transition-colors border border-glass-border"
            >
              Iniciar sesión
            </button>
          )}

          <button
            onClick={() =>
              user ? setIsBookingOpen(true) : setIsLoginModalOpen(true)
            }
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-black px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 uppercase tracking-ultra"
          >
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-bg border-t border-surface px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-surface flex flex-col gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                    {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && !navbarImageError ? (
                      <img
                        src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                        alt={user.user_metadata?.full_name}
                        className="w-full h-full object-cover"
                        onError={() => setNavbarImageError(true)}
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {user.user_metadata?.full_name || "Usuario"}
                    </span>
                    <span className="text-xs text-text/40">{user.email}</span>
                  </div>
                </div>
                <form
                  action="/api/auth/signout"
                  method="post"
                  className="w-full"
                >
                  <button
                    type="submit"
                    className="w-full bg-surface hover:bg-surface/80 text-text font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-3 rounded-xl text-center transition-colors"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm transition-opacity w-full h-full border-none cursor-default"
            onClick={() => setIsLoginModalOpen(false)}
            aria-label="Cerrar modal"
            title="Cerrar modal"
          />

          {/* Modal Content */}
          <div className="relative bg-surface border border-surface w-full max-w-md rounded-3xl p-8 md:p-10 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-text/40 hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Scissors className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-3xl font-black text-text mb-2">
                Bienvenido<span className="text-primary">.</span>
              </h2>
              <p className="text-text/60 mb-10 text-sm">
                Inicia sesión para gestionar tu cuenta y citas en Barber Ray.
              </p>

              {loginError && (
                <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <form action="/api/auth/signin" method="post">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-text text-bg font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    ></path>
                  </svg>
                  Continuar con Google
                </button>
              </form>

              <p className="mt-8 text-2xs text-text/40 px-6 uppercase tracking-ultra font-medium">
                Estilo • Tradición • Excelencia
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        team={team}
        user={user}
      />
    </header>
  );
}
