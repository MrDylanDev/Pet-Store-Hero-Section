import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { ProductItem } from '../data/constants';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 45 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'COZY10' || promoCode.trim().toUpperCase() === 'PETLOVE') {
      setDiscountPercent(10);
      setPromoMessage('10% VIP discount applied!');
    } else {
      setPromoMessage('Try "COZY10" for 10% off');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        onClearCart();
        onClose();
      }, 2500);
    }, 1200);
  };

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
            <div className="w-8 h-8 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Your Pet Bag</h2>
              <p className="text-xs text-gray-500">
                {cart.reduce((n, i) => n + i.quantity, 0)} items in your basket
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

        {orderComplete ? (
          <div className="p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-serif-display text-2xl text-[#1a3d1a] mb-2">Order Confirmed!</h3>
            <p className="text-xs text-gray-600 max-w-xs mx-auto mb-4">
              Your pet's cozy goodies are being hand-packed with organic treats. A tracking link was sent to your email!
            </p>
            <div className="inline-block bg-[#EFFDF0] border border-emerald-200 px-4 py-2 rounded-xl text-xs font-semibold text-[#1a3d1a]">
              Order #CP-82914 · Estimated 2-Day Delivery
            </div>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="max-h-[45vh] overflow-y-auto p-6 space-y-3.5">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">${item.product.price.toFixed(2)} each</p>
                      <div className="text-sm font-bold text-[#1a3d1a] mt-0.5">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 shadow-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors ml-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300 stroke-[1.5]" />
                  <p className="text-sm font-medium text-gray-600">Your basket is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Discover favorites for your pets from the hero section!</p>
                </div>
              )}
            </div>

            {/* Promo Code & Order Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50/80 border-t border-gray-100 space-y-3">
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try COZY10)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a3d1a]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-900 text-white rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p className="text-[11px] font-medium text-emerald-700">{promoMessage}</p>
                )}

                <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount (10%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1a3d1a] pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-3 py-3 rounded-2xl bg-[#E86A10] hover:bg-[#d45e0d] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
                >
                  {isCheckingOut ? (
                    <span>Processing securely...</span>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
