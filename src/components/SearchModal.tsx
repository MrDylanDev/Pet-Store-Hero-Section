import React, { useState } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { FEATURED_PRODUCTS, ProductItem } from '../data/constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularQueries = [
    'Cat house',
    'Orthopedic bed',
    'Salmon treats',
    'Water fountain',
    'Scratching post',
    'Puppy toys',
  ];

  const filteredProducts = query.trim()
    ? FEATURED_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : FEATURED_PRODUCTS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-[#EFFDF0]/40">
          <Search className="w-5 h-5 text-[#1a3d1a]/70 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cozy beds, organic treats, toys, houses..."
            autoFocus
            className="w-full text-base bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-500 font-medium shrink-0">Popular:</span>
          {popularQueries.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#1a3d1a] hover:text-[#1a3d1a] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          <div className="text-xs font-semibold text-gray-500 px-2 uppercase tracking-wider">
            {query.trim() ? `Found ${filteredProducts.length} items` : 'Featured Products'}
          </div>

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-[#EFFDF0]/80 transition-colors cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/60">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-[#1a3d1a] truncate">
                      {product.name}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-[#1a3d1a]">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Star className="w-3 h-3 fill-[#E86A10] text-[#E86A10]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1a3d1a] group-hover:translate-x-1 transition-all mr-2" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-sm">No pet products found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for &ldquo;cat&rdquo; or &ldquo;bed&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
