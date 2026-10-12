import React, { useState } from 'react';
import { X, Star, ShoppingCart, ArrowRight, Eye, Check } from 'lucide-react';
import { FEATURED_PRODUCTS, ProductItem } from '../data/constants';

interface ExploreCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ExploreCatalogModal: React.FC<ExploreCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filters = ['All', 'Furniture & Sleep', 'Bedding', 'Nutrition & Treats', 'Feeding & Hydration'];

  const filtered =
    selectedFilter === 'All'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.category === selectedFilter);

  const handleQuickAdd = (product: ProductItem) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#EFFDF0]/60">
          <div>
            <h2 className="font-serif-display text-2xl text-[#1a3d1a]">
              Best Products for Your Pet
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Veterinarian-recommended comfort essentials, organic nourishment, and toys
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2 overflow-x-auto text-xs">
          {filters.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full font-medium transition-all ${
                selectedFilter === category
                  ? 'bg-[#1a3d1a] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="max-h-[60vh] overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 hover:border-[#1a3d1a]/30 p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                <div
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 relative cursor-pointer border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#E86A10] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white text-gray-900 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Details
                    </span>
                  </div>
                </div>

                <div className="mt-2.5">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="text-sm font-semibold text-gray-900 group-hover:text-[#1a3d1a] cursor-pointer line-clamp-1 mt-0.5"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500">
                    <Star className="w-3 h-3 fill-[#E86A10] text-[#E86A10]" />
                    <span className="font-semibold text-gray-800">{item.rating}</span>
                    <span className="text-gray-400">({item.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#1a3d1a]">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[11px] text-gray-400 line-through ml-1">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleQuickAdd(item)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                    addedId === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white shadow-xs'
                  }`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {addedId === item.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#EFFDF0]/40 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <span>🐾 100% Pet-Safe Materials · Ethically Sourced</span>
          <span className="font-semibold text-[#1a3d1a]">Fast & Free Shipping over $45</span>
        </div>
      </div>
    </div>
  );
};
