import React from 'react';
import { X, Star, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  storeName = 'Patitas',
}) => {
  if (!isOpen) return null;

  const reviews = [
    {
      id: 'rev-1',
      author: 'Sarah Jenkins',
      pet: 'Luna (Maine Coon, 2 yrs)',
      rating: 5,
      date: 'Hace 3 días',
      text: 'El Cozy Cat House superó todas mis expectativas. La base viscoelástica no se deforma aunque Luna salte adentro a las 3 AM. ¡Acabados de primera calidad!',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Marcus Vance',
      pet: 'Buster (Golden Retriever, 4 yrs)',
      rating: 5,
      date: 'Hace 1 semana',
      text: 'Buster se despertaba inquieto por dolor en sus patas. La cama Calming Cloud fue un cambio radical. Envío rápido y embalaje impecable.',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Elena Rostova',
      pet: 'Milo & Oliver (British Shorthair)',
      rating: 5,
      date: 'Hace 2 semanas',
      text: '¡Mis dos gatos se turnan para dormir en la casita! La tela es súper fácil de limpiar y aspirar pelos. 10/10.',
      verified: true,
    },
  ];

  const ratingBars = [
    { stars: 5, pct: 82 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#EFFDF0]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center font-bold text-sm">
              98K+
            </div>
            <div>
              <h2 className="font-serif-display text-xl text-[#1a3d1a]">
                Comunidad de Familias {storeName}
              </h2>
              <p className="text-xs text-gray-500">
                Reseñas verificadas de clientes de {storeName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating summary bar */}
        <div className="px-6 py-4 bg-gray-50/70 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-extrabold text-[#1a3d1a]">4.6</div>
            <div>
              <div className="flex items-center gap-1 text-[#E86A10]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? 'fill-[#E86A10] text-[#E86A10]' : 'fill-[#E86A10]/50 text-[#E86A10]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-600">
                14,200+ Reseñas Verificadas
              </span>
            </div>
          </div>

          {/* Bar breakdown */}
          <div className="space-y-1">
            {ratingBars.map((b) => (
              <div key={b.stars} className="flex items-center gap-2 text-[11px] text-gray-500">
                <span className="w-3 text-right font-medium">{b.stars}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E86A10] rounded-full transition-all"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="w-7 text-right text-gray-400">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer reviews list */}
        <div className="max-h-[50vh] overflow-y-auto p-6 space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Comprador Verificado
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500">{rev.pet}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
              <div className="mt-2 text-[10px] text-gray-400">{rev.date}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Opiniones 100% reales de dueños de mascotas
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#1a3d1a] hover:underline"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
