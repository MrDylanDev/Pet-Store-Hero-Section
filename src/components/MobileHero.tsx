import React, { useState } from 'react';
import { ArrowUpRight, Play, ArrowRight, Plus, Star } from 'lucide-react';
import { ASSETS } from '../data/constants';

// ============================================================================
// ¡HOLA! Este es MobileHero.tsx.
// Aquí diseñamos la vista para teléfonos inteligentes (celulares).
// En móviles no tenemos espacio horizontal, así que en vez de poner
// los elementos flotando a los lados, los organizamos de arriba hacia abajo
// en una columna limpia (flex-col justify-between) que cabe en cualquier pantalla
// sin necesidad de hacer scroll vertical.
// ============================================================================

interface MobileHeroProps {
  onOpenProduct: () => void;
  onOpenVideo: () => void;
  onOpenExplore: () => void;
  onOpenReviews: () => void;
}

export const MobileHero: React.FC<MobileHeroProps> = ({
  onOpenProduct,
  onOpenVideo,
  onOpenExplore,
  onOpenReviews,
}) => {
  // Estados para controlar si las imágenes fallan al cargar desde la red
  const [catHouseImgError, setCatHouseImgError] = useState(false);
  const [videoCardImgError, setVideoCardImgError] = useState(false);

  return (
    // 'flex md:hidden' significa:
    // Visible únicamente en pantallas pequeñas (menos de 768px de ancho).
    // A partir de 'md' (768px hacia arriba), se oculta automáticamente.
    <div className="flex md:hidden flex-1 flex-col justify-between overflow-hidden relative px-4 pt-1 pb-0 select-none">
      
      {/* 1. SECCIÓN SUPERIOR: Título (36px), subtítulo y botón de acción     */}
      <div className="text-center flex flex-col items-center shrink-0">
        <h1 className="font-serif-display text-[#1a3d1a] text-[34px] sm:text-[36px] leading-[0.98] tracking-tight">
          <span className="block animate-word-pop delay-200">Everything</span>
          <span className="block animate-word-pop delay-400">
            <span className="inline-block">Your</span>{' '}
            <span className="inline-block">Pets</span>{' '}
            <span className="inline-block">Love</span>
          </span>
        </h1>

        <p className="mt-1 text-xs text-gray-600 max-w-xs leading-snug animate-fade-in delay-500">
          Curated comfort, organic nutrition & cozy essentials.
        </p>

        {/* Botón principal naranja 'Explore Products' para abrir el catálogo */}
        <button
          onClick={onOpenExplore}
          className="mt-2.5 inline-flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2 rounded-full font-medium text-xs shadow-md active:scale-95 transition-all animate-scale-in delay-600 cursor-pointer"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 2. DOS TARJETAS LADO A LADO: Producto (cuadrada) + Video (vertical) */}
      <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto my-2 shrink-0">
        
        {/* TARJETA 1 (Izquierda): Cozy Cat House con aspect-square (proporción 1:1) */}
        <div
          onClick={onOpenProduct}
          className="flex-1 aspect-square rounded-2xl overflow-hidden relative bg-white/80 shadow-[0_4px_16px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 cursor-pointer active:scale-95 transition-transform animate-slide-in-left delay-700"
          role="button"
          tabIndex={0}
          aria-label="Ver casita de gato"
        >
          {!catHouseImgError ? (
            <img
              src={ASSETS.productCatHouse}
              alt="Cozy Cat House"
              referrerPolicy="no-referrer"
              onError={() => setCatHouseImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 p-2">
              <span className="text-2xl">🐱</span>
            </div>
          )}

          {/* Botón flotante verde con flecha diagonal */}
          <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center shadow">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>

          {/* Degradado oscuro para que el texto blanco resalte sobre la foto */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 text-white">
            <div className="text-[10px] font-medium leading-tight">Cozy Cat House</div>
            <div className="text-xs font-bold text-emerald-200">$49.99</div>
          </div>
        </div>

        {/* TARJETA 2 (Derecha): Video de reseñas virales con aspect-[3/4] */}
        <div
          onClick={onOpenVideo}
          className="w-[110px] aspect-[3/4] rounded-2xl overflow-hidden relative bg-black/10 shadow-[0_4px_16px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 cursor-pointer active:scale-95 transition-transform animate-slide-in-right delay-800"
          role="button"
          tabIndex={0}
          aria-label="Ver video de reseñas"
        >
          {!videoCardImgError ? (
            <img
              src={ASSETS.videoCard}
              alt="Video Reviews"
              referrerPolicy="no-referrer"
              onError={() => setVideoCardImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-emerald-950 flex flex-col items-center justify-center p-2 text-white">
              <span className="text-xl">🎬</span>
            </div>
          )}

          {/* Degradado oscuro (scrim) inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Botón de reproducción de video (Play) */}
          <div className="absolute inset-x-0 bottom-2 px-1.5 flex flex-col items-center text-center">
            <div className="w-6 h-6 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center shadow mb-1">
              <Play className="w-2.5 h-2.5 fill-white stroke-white ml-0.5" />
            </div>
            <span className="text-white text-[8px] font-medium leading-tight line-clamp-2">
              Reviews on TikTok & YouTube
            </span>
          </div>
        </div>
      </div>

      {/* 3. FILA DE ESTADÍSTICAS: Contador 98K+ y puntuación de 4.6 estrellas*/}
      <div className="flex items-center justify-center gap-4 py-1 shrink-0 animate-fade-in delay-900">
        {/* Botón interactivo para ver reseñas (98K+) */}
        <button
          onClick={onOpenReviews}
          className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/60 shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center">
            <img
              src={ASSETS.avatar}
              alt="Usuario satisfecho"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-white"
            />
            <div className="w-6 h-6 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center -ml-2 border border-white">
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
          <span className="text-xs font-bold text-[#1a3d1a]">98K+</span>
        </button>

        {/* Separador vertical sutil */}
        <div className="w-px h-5 bg-[#1a3d1a]/20" />

        {/* Botón interactivo para ver reseñas (4.6 estrellas) */}
        <button
          onClick={onOpenReviews}
          className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/60 shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-xs font-bold text-[#1a3d1a]">4.6</span>
          <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
          <span className="text-[10px] text-gray-500 font-medium">Ratings</span>
        </button>
      </div>

      {/* 4. TRES MASCOTAS EN LA BASE: Ajustadas para ocupar el fondo inferior*/}
      {/* mt-auto hace que se empujen naturalmente hacia la parte de abajo     */}
      <div className="w-full flex items-end justify-center pointer-events-none mt-auto -mb-1 animate-photo-reveal delay-900">
        {/* Mascota izquierda (máximo 30% de la altura de la pantalla del celular) */}
        <div className="flex-1 flex items-end justify-center">
          <img
            src={ASSETS.bottomLeft}
            alt="Mascota acompañante izquierda"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain object-bottom block max-h-[30vh]"
          />
        </div>
        {/* Mascota central protagonista (un poco más grande, 36vh) */}
        <div className="flex-[1.265] flex items-end justify-center">
          <img
            src={ASSETS.bottomCenter}
            alt="Mascota protagonista centro"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain object-bottom block max-h-[36vh]"
          />
        </div>
        {/* Mascota derecha (30vh) */}
        <div className="flex-1 flex items-end justify-center">
          <img
            src={ASSETS.bottomRight}
            alt="Mascota juguetona derecha"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain object-bottom block max-h-[30vh]"
          />
        </div>
      </div>
    </div>
  );
};
