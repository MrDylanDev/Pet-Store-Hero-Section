import React, { useState } from 'react';
import { ArrowUpRight, Play, ArrowRight, Plus, Star } from 'lucide-react';
import { ASSETS } from '../data/constants';

// ============================================================================
// ¡HOLA! Este es TabletHero.tsx.
// Aquí diseñamos la vista intermedia pensada para pantallas medianas (tablets),
// es decir, entre 768px (md) y 1023px (lg) de ancho.
//
// Como las tablets tienen menos espacio horizontal que una laptop grande,
// ajustamos los tamaños:
// 1. El título baja de tamaño fluido a 72px (text-7xl).
// 2. Las tarjetas de los lados se hacen más compactas (160px y 120px).
// 3. Las imágenes inferiores tienen alturas máximas controladas (60vh y 75vh).
// ============================================================================

interface TabletHeroProps {
  onOpenProduct: () => void;
  onOpenVideo: () => void;
  onOpenExplore: () => void;
  onOpenReviews: () => void;
}

export const TabletHero: React.FC<TabletHeroProps> = ({
  onOpenProduct,
  onOpenVideo,
  onOpenExplore,
  onOpenReviews,
}) => {
  // Manejo de errores por si las imágenes de internet tardan o fallan al descargar
  const [catHouseImgError, setCatHouseImgError] = useState(false);
  const [videoCardImgError, setVideoCardImgError] = useState(false);

  return (
    // 'hidden md:flex lg:hidden' es la magia de Tailwind:
    // - hidden: oculto en celulares (menos de 768px)
    // - md:flex: visible como flexbox en tablets (768px a 1023px)
    // - lg:hidden: se vuelve a ocultar en pantallas grandes de escritorio (1024px o más)
    <div className="hidden md:flex lg:hidden flex-1 relative w-full h-full overflow-hidden select-none">
      
      {/* TITULAR CENTRAL (text-7xl):                                         */}
      {/* Usamos z-[5] para que quede por encima del fondo pero bajo tarjetas*/}
      <div className="relative z-[5] w-full text-center px-6 pt-12 pointer-events-none">
        <h1 className="font-serif-display text-[#1a3d1a] text-7xl leading-[0.95] tracking-tight pointer-events-auto">
          {/* Palabra 1: "Everything" con animación suave */}
          <div className="overflow-visible block">
            <span className="inline-block animate-word-pop delay-200">
              Everything
            </span>
          </div>
          {/* Palabras 2, 3 y 4 con retrasos escalonados para efecto cascada */}
          <div className="overflow-visible block mt-1">
            <span className="inline-block animate-word-pop delay-400">
              Your
            </span>{' '}
            <span className="inline-block animate-word-pop delay-500">
              Pets
            </span>{' '}
            <span className="inline-block animate-word-pop delay-600">
              Love
            </span>
          </div>
        </h1>
      </div>

      {/* TARJETA IZQUIERDA: Casita de gato ($49.99)                          */}
      {/* Ancho fijo de 160px para que encaje perfecto en la tablet           */}
      <div
        onClick={onOpenProduct}
        className="absolute top-[80px] left-4 z-20 w-[160px] cursor-pointer group animate-slide-in-left delay-600"
        role="button"
        tabIndex={0}
        aria-label="Ver casita de gato"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenProduct();
          }
        }}
      >
        <div className="relative aspect-[260/257] w-full rounded-2xl overflow-hidden bg-white/70 shadow-[0_8px_24px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 transition-transform duration-300 group-hover:-translate-y-1">
          {!catHouseImgError ? (
            <img
              src={ASSETS.productCatHouse}
              alt="Cozy Cat House"
              referrerPolicy="no-referrer"
              onError={() => setCatHouseImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 p-2 text-center">
              <span className="text-3xl mb-1">🐱</span>
              <span className="text-[11px] font-semibold text-gray-800">Cat House</span>
            </div>
          )}

          {/* Botón verde con flecha diagonal que rota al pasar el ratón encima */}
          <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#1a3d1a] group-hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>

        {/* Nombre y precio del producto */}
        <div className="mt-2 px-1 flex flex-col">
          <span className="text-gray-700 text-xs font-medium leading-snug">
            Cozy Cat House
          </span>
          <span className="text-[#1a3d1a] font-bold text-sm">
            $49.99
          </span>
        </div>
      </div>

      {/* TARJETA DERECHA: Reseñas de video viral (ancho 120px)                */}
      <div
        onClick={onOpenVideo}
        className="absolute top-[80px] right-4 z-20 w-[120px] cursor-pointer group animate-slide-in-right delay-700"
        role="button"
        tabIndex={0}
        aria-label="Ver video de reseñas de mascotas"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenVideo();
          }
        }}
      >
        <div className="relative aspect-[177/287] w-full rounded-2xl overflow-hidden bg-black/5 shadow-[0_8px_24px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 transition-transform duration-300 group-hover:-translate-y-1">
          {!videoCardImgError ? (
            <img
              src={ASSETS.videoCard}
              alt="Preview del video de reseñas"
              referrerPolicy="no-referrer"
              onError={() => setVideoCardImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-emerald-900 flex flex-col items-center justify-center p-2 text-white">
              <span className="text-2xl mb-1">🎬</span>
              <span className="text-[10px] text-center">Reviews</span>
            </div>
          )}

          {/* Degradado oscuro para que el texto blanco siempre se lea con nitidez */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Botón de reproducción e indicador de video */}
          <div className="absolute inset-x-0 bottom-2.5 px-1.5 flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-[#1a3d1a] group-hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-lg mb-1.5">
              <Play className="w-3.5 h-3.5 fill-white stroke-white ml-0.5" />
            </div>
            <p className="text-white text-[9px] font-medium leading-tight drop-shadow-sm line-clamp-2">
              Watch Reviews on TikTok & YouTube
            </p>
          </div>
        </div>
      </div>

      {/* TRES FOTOS INFERIORES: Base de mascotas ajustadas a altura de tablet*/}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between pointer-events-none">
        
        {/* Foto 1: Izquierda (máximo 60% de alto de la pantalla) */}
        <div className="flex-1 max-h-[60vh] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-800">
          <img
            src={ASSETS.bottomLeft}
            alt="Mascota compañera izquierda"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[60vh] object-contain object-bottom block"
          />

          {/* Pastilla con contador 98K+ de clientes felices */}
          <div
            onClick={onOpenReviews}
            className="absolute z-20 left-4 bottom-[clamp(20px,4vh,50px)] pointer-events-auto cursor-pointer group animate-scale-in delay-1000"
          >
            <div className="flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/60 shadow-sm transition-transform hover:scale-105">
              <div className="flex items-center">
                <img
                  src={ASSETS.avatar}
                  alt="Avatar de cliente"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <div className="w-8 h-8 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center -ml-2 border-2 border-white">
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#1a3d1a] leading-none">
                  98K+
                </span>
                <span className="text-[10px] font-medium text-gray-600">
                  Happy pets
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Foto 2: Centro (gato protagonista, hasta 75vh de alto) */}
        <div className="flex-[1.265] max-h-[75vh] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-600">
          <img
            src={ASSETS.bottomCenter}
            alt="Mascota protagonista centro"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[75vh] object-contain object-bottom block"
          />

          {/* Llamado a la acción: Título y botón naranja para explorar catálogo */}
          <div className="absolute z-20 inset-x-0 bottom-[clamp(20px,4vh,50px)] flex flex-col items-center text-center px-4 pointer-events-auto animate-fade-up delay-1100">
            <h2 className="font-serif-display text-white text-xl font-semibold mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              Best Products for Your Pet
            </h2>
            <button
              onClick={onOpenExplore}
              className="group flex items-center gap-2 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-[0_8px_20px_rgba(232,106,16,0.3)] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <span>Explore Products</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Foto 3: Derecha (perrito con valoración de 4.6 estrellas) */}
        <div className="flex-1 max-h-[60vh] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-900">
          <img
            src={ASSETS.bottomRight}
            alt="Mascota juguetona derecha"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[60vh] object-contain object-bottom block"
          />

          {/* Pastilla con calificación de 4.6 estrellas */}
          <div
            onClick={onOpenReviews}
            className="absolute z-20 right-4 bottom-[clamp(20px,4vh,50px)] pointer-events-auto cursor-pointer group animate-scale-in delay-1200"
          >
            <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/60 shadow-sm transition-transform hover:scale-105">
              <span className="text-lg font-bold text-[#1a3d1a] leading-none">
                4.6
              </span>
              <Star className="w-4 h-4 fill-[#E86A10] text-[#E86A10]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
