import React, { useState } from 'react';
import { ArrowUpRight, Play, ArrowRight, Plus, Star } from 'lucide-react';
import { ASSETS } from '../data/constants';

// ============================================================================
// Props de DesktopHero:
// Funciones que vienen desde App.tsx para abrir modales al hacer clic
// ============================================================================
interface DesktopHeroProps {
  onOpenProduct: () => void;
  onOpenVideo: () => void;
  onOpenExplore: () => void;
  onOpenReviews: () => void;
}

export const DesktopHero: React.FC<DesktopHeroProps> = ({
  onOpenProduct,
  onOpenVideo,
  onOpenExplore,
  onOpenReviews,
}) => {
  // Manejo de errores por si alguna imagen externa no carga
  const [catHouseImgError, setCatHouseImgError] = useState(false);
  const [videoCardImgError, setVideoCardImgError] = useState(false);

  return (
    // 'hidden lg:flex' significa:
    // Oculto por defecto en móviles y tablets, y visible como 'flex' solo en pantallas de 1024px o más (lg+)
    <div className="hidden lg:flex flex-1 relative w-full h-full overflow-hidden select-none">
      
      {/* CAPA DE TEXTO (Centro, z-index 5):                                  */}
      {/* El titular principal utiliza clamp() para calcular un tamaño de    */}
      {/* fuente fluido entre 60px y 110px según el ancho de la pantalla     */}
      <div className="relative z-[5] w-full text-center px-12 pt-[4.2rem] xl:pt-[5.4rem] pointer-events-none">
        <h1 className="font-serif-display text-[#1a3d1a] text-[clamp(60px,7.5vw,110px)] leading-[0.95] tracking-tight pointer-events-auto">
          {/* Línea 1: "Everything" salta a los 200 milisegundos */}
          <div className="overflow-visible block">
            <span className="inline-block animate-word-pop delay-200">
              Everything
            </span>
          </div>

          {/* Línea 2: Cada palabra tiene un delay diferente para que entren en cascada (efecto dominó) */}
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

      {/* TARJETA IZQUIERDA: Producto destacado ("Cozy Cat House" - $49.99)   */}
      {/* Posicionada de forma absoluta en la esquina superior izquierda      */}
      <div
        onClick={onOpenProduct}
        className="absolute top-[40px] xl:top-[50px] left-12 z-20 w-[clamp(160px,14vw,260px)] cursor-pointer group animate-slide-in-left delay-600"
        role="button"
        tabIndex={0}
        aria-label="Ver detalles de la casita de gato"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenProduct();
          }
        }}
      >
        <div className="relative aspect-[260/257] w-full rounded-2xl overflow-hidden bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)]">
          {!catHouseImgError ? (
            <img
              src={ASSETS.productCatHouse}
              alt="Cozy Cat House"
              referrerPolicy="no-referrer"
              onError={() => setCatHouseImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Respaldo visual si la imagen falla
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4 text-center">
              <span className="text-4xl mb-2">🐱</span>
              <span className="text-xs font-semibold text-gray-800">Cozy Cat House</span>
            </div>
          )}

          {/* Botón circular verde con flecha diagonal en la esquina inferior derecha */}
          <div className="absolute bottom-3 right-3 w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-[#1a3d1a] group-hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4 xl:w-5 xl:h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Textos descriptivos debajo de la foto */}
        <div className="mt-2.5 px-1 flex flex-col gap-0.5">
          <span className="text-gray-700 text-[clamp(13px,1.05vw,16px)] font-medium leading-snug group-hover:text-gray-900 transition-colors">
            Cozy Cat House
          </span>
          <span className="text-[#1a3d1a] font-bold text-[clamp(14px,1.2vw,18px)] leading-tight">
            $49.99
          </span>
        </div>
      </div>

      {/* TARJETA DERECHA: Video viral de TikTok y YouTube                    */}
      {/* Posicionada de forma absoluta en la esquina superior derecha        */}
      <div
        onClick={onOpenVideo}
        className="absolute top-[40px] xl:top-[50px] right-12 z-20 w-[clamp(120px,10vw,177px)] cursor-pointer group animate-slide-in-right delay-700"
        role="button"
        tabIndex={0}
        aria-label="Ver video de reseñas"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenVideo();
          }
        }}
      >
        <div className="relative aspect-[177/287] w-full rounded-2xl overflow-hidden bg-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#1a3d1a]/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)]">
          {!videoCardImgError ? (
            <img
              src={ASSETS.videoCard}
              alt="Preview del video de reseñas"
              referrerPolicy="no-referrer"
              onError={() => setVideoCardImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-emerald-800 to-[#1a3d1a] flex flex-col items-center justify-center p-3 text-white">
              <span className="text-3xl mb-2">🎬</span>
              <span className="text-[11px] font-medium text-center">TikTok & YouTube Viral Reviews</span>
            </div>
          )}

          {/* Degradado oscuro (scrim) para que el texto blanco siempre se lea con claridad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

          {/* Botón circular de reproducción (Play) y texto explicativo */}
          <div className="absolute inset-x-0 bottom-3 xl:bottom-4 px-2.5 flex flex-col items-center text-center">
            <div className="w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-[#1a3d1a] group-hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 mb-2">
              <Play className="w-4 h-4 xl:w-4.5 xl:h-4.5 fill-white stroke-white ml-0.5" />
            </div>
            <p className="text-white text-[clamp(9px,0.72vw,12px)] font-medium leading-tight text-balance drop-shadow-sm">
              Watch Product Reviews on TikTok and YouTube
            </p>
          </div>
        </div>
      </div>

      {/* FOTOS INFERIORES: Las tres fotos de mascotas alineadas en la base   */}
      {/* z-10 para estar debajo de los textos y tarjetas, flex items-end     */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between pointer-events-none">
        
        {/* FOTO 1 (Izquierda): Proporción flex-1 con altura máxima de 70vh */}
        <div className="flex-1 max-h-[min(70vh,55vw)] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-800">
          <img
            src={ASSETS.bottomLeft}
            alt="Mascota acompañante izquierda"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[min(70vh,55vw)] object-contain object-bottom block"
          />

          {/* Tarjetita superpuesta: '98K+' con pila de avatares */}
          <div
            onClick={onOpenReviews}
            className="absolute z-20 left-6 xl:left-12 bottom-[clamp(20px,4vh,50px)] pointer-events-auto cursor-pointer group animate-scale-in delay-1000"
          >
            <div className="flex items-center gap-3 bg-white/85 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/60 shadow-[0_8px_24px_rgb(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:bg-white">
              {/* Stack de avatar + círculo verde con icono Plus */}
              <div className="flex items-center">
                <img
                  src={ASSETS.avatar}
                  alt="Avatar de cliente satisfecho"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="w-9 h-9 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center -ml-2.5 border-2 border-white shadow-sm group-hover:bg-[#2a5a2a] transition-colors">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl xl:text-2xl font-bold text-[#1a3d1a] leading-none tracking-tight">
                  98K+
                </span>
                <span className="text-[11px] font-medium text-gray-600 leading-tight">
                  Happy pets & parents
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOTO 2 (Centro): Es la más ancha y alta con flex-[1.265] y max-height de 85vh */}
        <div className="flex-[1.265] max-h-[min(85vh,70vw)] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-600">
          <img
            src={ASSETS.bottomCenter}
            alt="Mascota protagonista central"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[min(85vh,70vw)] object-contain object-bottom block"
          />

          {/* Elemento central superpuesto: Titular blanco + Botón 'Explore Products' */}
          <div className="absolute z-20 inset-x-0 bottom-[clamp(20px,4vh,50px)] flex flex-col items-center text-center px-4 pointer-events-auto animate-fade-up delay-1100">
            <h2 className="font-serif-display text-white text-xl md:text-2xl xl:text-3xl font-semibold mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] tracking-wide">
              Best Products for Your Pet
            </h2>
            <button
              onClick={onOpenExplore}
              className="group flex items-center gap-2.5 bg-[#E86A10] hover:bg-[#d45e0d] text-white px-6 xl:px-8 py-3 xl:py-3.5 rounded-full font-medium text-sm xl:text-base shadow-[0_10px_25px_rgba(232,106,16,0.35)] transition-all duration-300 transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span>Explore Products</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* FOTO 3 (Derecha): Proporción flex-1 con altura máxima de 70vh */}
        <div className="flex-1 max-h-[min(70vh,55vw)] flex items-end justify-center relative overflow-hidden animate-photo-reveal delay-900">
          <img
            src={ASSETS.bottomRight}
            alt="Mascota juguetona derecha"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[min(70vh,55vw)] object-contain object-bottom block"
          />

          {/* Tarjetita superpuesta: '4.6' estrellas con icono naranja */}
          <div
            onClick={onOpenReviews}
            className="absolute z-20 right-6 xl:right-12 bottom-[clamp(20px,4vh,50px)] pointer-events-auto cursor-pointer group animate-scale-in delay-1200"
          >
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/60 shadow-[0_8px_24px_rgb(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:bg-white">
              <span className="text-xl xl:text-2xl font-bold text-[#1a3d1a] leading-none">
                4.6
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-[#E86A10] text-[#E86A10]" />
                <span className="text-[11px] font-semibold text-gray-500 hidden xl:inline">
                  (14k reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
