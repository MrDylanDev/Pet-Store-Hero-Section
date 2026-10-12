import React from 'react';
import { X, Trash2, ShoppingCart, Star, Heart } from 'lucide-react';
import { ProductItem } from '../data/constants';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: ProductItem[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#EFFDF0]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E86A10] text-white flex items-center justify-center shadow-xs">
              <Star className="w-4 h-4 fill-white stroke-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Your Saved Favorites</h2>
              <p className="text-xs text-gray-500">{favorites.length} items saved for your pets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-[#1a3d1a]/20 transition-all group"
              >
                <div
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer border border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="text-sm font-semibold text-gray-900 hover:text-[#1a3d1a] cursor-pointer truncate"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-[#1a3d1a]">${item.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400">· {item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white rounded-xl text-xs font-medium shadow-xs transition-colors"
                    title="Move to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Heart className="w-10 h-10 mx-auto mb-2 text-gray-300 stroke-[1.5]" />
              <p className="text-sm font-medium text-gray-600">No favorite items yet</p>
              <p className="text-xs text-gray-400 mt-1">Tap the heart on any product to save it here</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Free standard shipping on orders over $45</span>
            <button
              onClick={() => {
                favorites.forEach((item) => onAddToCart(item));
                onClose();
              }}
              className="text-xs font-semibold text-[#1a3d1a] hover:underline"
            >
              Add all to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
