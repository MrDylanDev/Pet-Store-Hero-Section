import React, { useState } from 'react';

// Importamos los iconos svg bonitos de lucide-react
import { Search, Star, ShoppingCart, Heart, Package, LogOut } from 'lucide-react';
import { ASSETS } from '../data/constants';

// ============================================================================
// Props que recibe el Header:
// - storeName: El nombre de la tienda ('Patitas')
// - cartCount & favoritesCount: Cantidades numéricas para mostrar en las bolitas (badges)
// - activeNav & setActiveNav: Para saber qué pestaña está seleccionada y cambiarla
// - onOpen*: Funciones que abren los respectivos modales cuando el usuario hace clic
// ============================================================================
interface HeaderProps {
  storeName?: string;
  cartCount: number;
  favoritesCount: number;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeName = 'Patitas',
  cartCount,
  favoritesCount,
  activeNav,
  setActiveNav,
  onOpenSearch,
  onOpenFavorites,
  onOpenCart,
}) => {
  // Estado por si la foto del avatar falla al cargar por internet
  const [avatarError, setAvatarError] = useState(false);
  
  // Estado para saber si el menú desplegable del usuario está abierto o cerrado
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Lista de enlaces del menú central para no repetir código HTML
  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Shop', label: 'Shop' },
    { id: 'Delivery and payment', label: 'Delivery and payment' },
    { id: 'Brands', label: 'Brands' },
    { id: 'Blog', label: 'Blog' },
  ];

  return (
    // <header> fijo en la parte superior con z-30 para flotar por encima de las imágenes del fondo
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 relative z-30 shrink-0 animate-fade-in delay-200">
      <div className="flex items-center justify-between">
        
        {/* ================================================================== */}
        {/* ZONA 1 (Izquierda): Imagotipo y Nombre de la tienda ('Patitas')    */}
        {/* ================================================================== */}
        <div className="flex items-center shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Evita que la página recargue con #
              setActiveNav('Home');
            }}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d1a] rounded-xl transition-transform hover:scale-[1.02] group"
            aria-label={`${storeName} Home`}
          >
            {/* Cajita con icono vectorial SVG de huellita */}
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center shadow-md shadow-[#1a3d1a]/15 group-hover:bg-[#2a5a2a] transition-colors relative overflow-hidden shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6 fill-current text-white"
              >
                {/* Almohadillas de la huella */}
                <circle cx="7" cy="8.5" r="2.2" />
                <circle cx="17" cy="8.5" r="2.2" />
                <circle cx="10.5" cy="5" r="2.2" />
                <circle cx="13.5" cy="5" r="2.2" />
                {/* Base de la huella */}
                <path d="M12 11.5c-3.2 0-5 2.2-5 4.8 0 2.2 1.8 3.7 5 3.7s5-1.5 5-3.7c0-2.6-1.8-4.8-5-4.8z" />
              </svg>
              {/* Detalle decorativo en color naranja */}
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#E86A10] rounded-full border-2 border-[#1a3d1a]" />
            </div>

            {/* Texto con la fuente elegante DM Serif Display */}
            <span className="font-serif-display text-2xl md:text-3xl font-bold tracking-tight text-[#1a3d1a] leading-none">
              {storeName}
            </span>
          </a>
        </div>

        {/* ================================================================== */}
        {/* ZONA 2 (Centro): Menú de navegación (se oculta en móviles con hidden md:flex) */}
        {/* ================================================================== */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`whitespace-nowrap transition-colors duration-200 py-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-gray-900 border-[#1a3d1a] font-semibold'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ================================================================== */}
        {/* ZONA 3 (Derecha): Botones de acción y perfil del usuario           */}
        {/* ================================================================== */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          
          {/* Botón de Buscar (oculto en pantallas muy chiquitas sm para ahorrar espacio) */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[#1a3d1a]/20 bg-transparent text-[#1a3d1a] hover:bg-[#1a3d1a]/5 hover:border-[#1a3d1a]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d1a]"
            aria-label="Buscar productos para mascotas"
            title="Buscar"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Botón de Favoritos (círculo naranja con estrella blanca) */}
          <div className="relative">
            <button
              onClick={onOpenFavorites}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white shadow-xs transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86A10]"
              aria-label={`Favoritos: ${favoritesCount} artículos`}
              title="Favoritos guardados"
            >
              <Star className="w-4 h-4 fill-white stroke-white" />
            </button>
            {/* Insignia numérica flotante (badge) */}
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-xs pointer-events-none">
                {favoritesCount}
              </span>
            )}
          </div>

          {/* Botón del Carrito de compras (círculo con borde e icono de carrito) */}
          <div className="relative">
            <button
              onClick={onOpenCart}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1a3d1a]/20 bg-transparent text-[#1a3d1a] hover:bg-[#1a3d1a]/5 hover:border-[#1a3d1a]/40 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d1a]"
              aria-label={`Carrito: ${cartCount} artículos`}
              title="Carrito de compras"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2]" />
            </button>
            {/* Insignia numérica flotante del carrito */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-xs pointer-events-none">
                {cartCount}
              </span>
            )}
          </div>

          {/* Avatar del usuario con menú desplegable al hacer clic */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border border-[#1a3d1a]/15 ring-2 ring-transparent hover:ring-[#1a3d1a]/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d1a]"
              aria-label="Menú de cuenta"
              aria-expanded={userMenuOpen}
            >
              {!avatarError ? (
                <img
                  src={ASSETS.avatar}
                  alt="Perfil del dueño de mascota"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Si la imagen falla, mostramos iniciales como respaldo
                <div className="w-full h-full bg-[#1a3d1a] text-white flex items-center justify-center text-xs font-semibold">
                  JD
                </div>
              )}
            </button>

            {/* Menú desplegable emergente (dropdown) */}
            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-emerald-900/10 p-2 z-50 animate-fade-in"
                onMouseLeave={() => setUserMenuOpen(false)} // Se cierra suave si el cursor se aleja
              >
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <p className="text-xs font-medium text-gray-500">Conectado como</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    mrdylanospina@gmail.com
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    🐾 {storeName} VIP Club
                  </span>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenFavorites();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EFFDF0] hover:text-[#1a3d1a] rounded-xl transition-colors text-left"
                >
                  <Heart className="w-3.5 h-3.5 text-[#E86A10]" />
                  <span>Wishlist ({favoritesCount} guardados)</span>
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EFFDF0] hover:text-[#1a3d1a] rounded-xl transition-colors text-left"
                >
                  <Package className="w-3.5 h-3.5 text-[#1a3d1a]" />
                  <span>Mis pedidos activos (1 en camino)</span>
                </button>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
