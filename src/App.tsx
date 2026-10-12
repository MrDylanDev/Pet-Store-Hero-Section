/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// ¡HOLA! Este es App.tsx, el componente principal (el "cerebro") de nuestra app.
// Aquí guardamos el estado global (como el carrito, favoritos y qué modal está
// abierto) y juntamos todas las piezas: el encabezado, el hero y los modales.
// ============================================================================

import React, { useState } from 'react';

// Importamos los componentes visuales que creamos en carpetas separadas
import { Header } from './components/Header';
import { DesktopHero } from './components/DesktopHero';
import { TabletHero } from './components/TabletHero';
import { MobileHero } from './components/MobileHero';

// Modales: ventanas emergentes que se abren cuando el usuario hace clic en algo
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { CartModal, CartItem } from './components/CartModal';
import { VideoModal } from './components/VideoModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ExploreCatalogModal } from './components/ExploreCatalogModal';
import { ReviewsModal } from './components/ReviewsModal';

// Datos iniciales de prueba (fotos, productos y precios)
import { FEATURED_PRODUCTS, FAVORITES_INITIAL, ProductItem } from './data/constants';

export default function App() {
  // 1. Nombre de la tienda
  // Lo definimos aquí para que sea fácil cambiarlo en un solo lugar si nos lo piden
  const storeName = 'Patitas';

  // 2. Estado de la pestaña activa en el menú de navegación (ej. 'Home', 'Shop')
  const [activeNav, setActiveNav] = useState('Home');

  // 3. Estado del Carrito de compras
  // Inicia con 1 producto (la casita de gato Cozy Cat House) para que la insignia '1' del icono coincida
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: FEATURED_PRODUCTS[0], // Cozy Cat House ($49.99)
      quantity: 1,
    },
  ]);

  // 4. Estado de Favoritos (Lista de deseos)
  // Inicia con 4 productos guardados para que la insignia naranja '4' coincida
  const [favorites, setFavorites] = useState<ProductItem[]>(FAVORITES_INITIAL);

  // 5. Estados para controlar qué modal (ventana emergente) está abierto (true) o cerrado (false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Guarda qué producto específico se seleccionó para ver sus detalles en grande
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // FUNCIONES DEL CARRITO (Lógica paso a paso)

  // Agregar un producto al carrito:
  // Si el producto ya estaba en la bolsa, le sumamos +1 a su cantidad.
  // Si es la primera vez que se agrega, lo añadimos a la lista con cantidad = 1.
  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Modificar la cantidad (+1 o -1):
  // Si la cantidad llega a 0 o menos, lo quitamos con filter(Boolean).
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Eliminar un producto por completo del carrito
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Vaciar todo el carrito (por ejemplo, después de comprar con éxito)
  const handleClearCart = () => {
    setCart([]);
  };

  // FUNCIONES DE FAVORITOS (Guardar o quitar de la lista de deseos)

  // Alternar favorito (toggle):
  // Si ya estaba guardado, lo quitamos; si no estaba, lo agregamos a la lista.
  const handleToggleFavorite = (product: ProductItem) => {
    setFavorites((prevFavorites) => {
      const alreadySaved = prevFavorites.some((p) => p.id === product.id);
      if (alreadySaved) {
        return prevFavorites.filter((p) => p.id !== product.id);
      }
      return [...prevFavorites, product];
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((p) => p.id !== productId));
  };

  // Abrir la casita de gato (producto principal de la tarjeta izquierda)
  const handleOpenCatHouse = () => {
    setSelectedProduct(FEATURED_PRODUCTS[0]);
  };

  // Manejar clics en el menú superior
  // Si el usuario toca 'Shop', 'Brands', etc., le abrimos el catálogo para que vea productos
  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'Shop' || nav === 'Brands' || nav === 'Delivery and payment' || nav === 'Blog') {
      setIsExploreOpen(true);
    }
  };

  // Calculamos el total de unidades sumando las cantidades de cada producto en el carrito
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // RENDERIZADO VISUAL (Lo que el usuario ve en pantalla)
  return (
    // Contenedor principal:
    // - h-screen: Ocupa exactamente el 100% del alto de la ventana
    // - overflow-hidden: No permite barra de desplazamiento vertical (no-scroll)
    // - bg-[#EFFDF0]: Color de fondo verde menta suave
    <div className="h-screen w-full bg-[#EFFDF0] flex flex-col overflow-hidden text-[#1a3d1a] relative antialiased selection:bg-[#E86A10] selection:text-white">
      
      {/* 1. ENCABEZADO (Header): shrink-0 para que nunca se aplaste de tamaño */}
      <Header
        storeName={storeName}
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. SECCIÓN HERO PRINCIPAL: flex-1 para que llene todo el alto restante de la pantalla */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Versión Escritorio (pantallas grandes: lg+) -> se oculta en móviles con hidden lg:flex */}
        <DesktopHero
          onOpenProduct={handleOpenCatHouse}
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenExplore={() => setIsExploreOpen(true)}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />

        {/* Versión Tablet (pantallas medianas: md hasta lg) -> hidden md:flex lg:hidden */}
        <TabletHero
          onOpenProduct={handleOpenCatHouse}
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenExplore={() => setIsExploreOpen(true)}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />

        {/* Versión Móvil (pantallas chicas: menores a md) -> flex md:hidden */}
        <MobileHero
          onOpenProduct={handleOpenCatHouse}
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenExplore={() => setIsExploreOpen(true)}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />
      </main>

      {/* 3. MODALES Y VENTANAS EMERGENTES (Solo se muestran cuando su isOpen es true) */}
      
      {/* Buscador en vivo de productos */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Cajón de Favoritos guardados */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onAddToCart={handleAddToCart}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Carrito de compras con resumen de precio y checkout */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Reproductor de video de reseñas de TikTok y YouTube */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onOpenProduct={handleOpenCatHouse}
      />

      {/* Ficha técnica y detalles del producto seleccionado */}
      <ProductDetailModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favorites.some((f) => f.id === selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Catálogo completo con filtros de categorías */}
      <ExploreCatalogModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
      />

      {/* Reseñas y testimonios de la comunidad con desglose de estrellas */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        storeName={storeName}
      />
    </div>
  );
}
