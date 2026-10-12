import React, { useState } from 'react';
import { X, Star, Heart, Check, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductItem } from '../data/constants';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onAddToCart: (product: ProductItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedSize, setSelectedSize] = useState('Standard (up to 16 lbs)');
  const [selectedColor, setSelectedColor] = useState('Forest Mint');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const sizes = ['Standard (up to 16 lbs)', 'Jumbo (up to 28 lbs)'];
  const colors = [
    { name: 'Forest Mint', class: 'bg-[#1a3d1a]' },
    { name: 'Warm Cream', class: 'bg-[#F2EBD9]' },
    { name: 'Sunset Terracotta', class: 'bg-[#E86A10]' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="bg-[#EFFDF0]/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative aspect-square w-full max-w-[260px] rounded-2xl overflow-hidden shadow-lg border border-white">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#E86A10] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700" /> Free 2-day delivery
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700" /> 30-day return guarantee
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1a3d1a] uppercase tracking-wider">
                  {product.category}
                </span>
                <button
                  onClick={() => onToggleFavorite(product)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-[#E86A10] text-[#E86A10]' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <h3 className="font-serif-display text-2xl text-[#1a3d1a] mt-1 mb-2">
                {product.name}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-[#1a3d1a]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium ml-auto">
                  <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount})</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-3.5">
                <label className="block text-[11px] font-semibold text-gray-700 mb-1.5">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs py-2 px-2.5 rounded-xl border text-center transition-all ${
                        selectedSize === s
                          ? 'border-[#1a3d1a] bg-[#EFFDF0] font-semibold text-[#1a3d1a]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-gray-700 mb-1.5">
                  Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full ${c.class} border-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#1a3d1a] scale-110 shadow-sm ring-2 ring-emerald-200'
                          : 'border-white hover:scale-105'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quality Badges */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-4 space-y-1 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Orthopedic, claw-proof & machine washable</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Tested & approved by 98,000+ pets</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-2xl bg-[#E86A10] hover:bg-[#d45e0d] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Bag — ${product.price.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
