// ============================================================================
// ¡HOLA! Este archivo contiene los datos fijos (constantes) de nuestra tienda.
// Como desarrollador junior, aprendí que guardar URLs e información de productos
// en un solo lugar hace que sea súper fácil modificarlos sin romper la interfaz.
// ============================================================================

// 1. Enlaces a las imágenes y fotos que usamos en toda la aplicación
export const ASSETS = {
  // Logotipo vectorial original
  logo: 'https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg',
  // Foto circular del cliente satisfecho (usada en el encabezado y en el contador de 98K+)
  avatar: 'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128',
  // Tarjeta izquierda: Foto de la casita para gatos (Cozy Cat House)
  productCatHouse: 'https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png',
  // Tarjeta derecha: Foto vertical con vista previa de reseñas de TikTok y YouTube
  videoCard: 'https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png',
  // Foto inferior izquierda (perrito compañero)
  bottomLeft: 'https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png',
  // Foto inferior central (gato protagonista más grande)
  bottomCenter: 'https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024',
  // Foto inferior derecha (perrito juguetón)
  bottomRight: 'https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png',
};

// 2. Modelo (Interface de TypeScript) que define qué datos debe tener un producto
export interface ProductItem {
  id: string;               // Identificador único (ej: 'cozy-cat-house')
  name: string;             // Nombre para mostrar al usuario
  price: number;            // Precio actual en dólares
  originalPrice?: number;   // Precio tachado anterior (opcional)
  rating: number;           // Calificación promedio de estrellas (ej: 4.9)
  reviewsCount: number;     // Número total de reseñas escritas
  image: string;            // URL de la imagen del producto
  category: string;         // Categoría (para filtrar en el catálogo)
  description: string;      // Explicación de los materiales y beneficios
  badge?: string;           // Etiqueta destacada opcional (ej: 'Bestseller', 'Popular')
  inStock: boolean;         // Si hay unidades disponibles para comprar
}

// 3. Lista de productos de prueba para la tienda
export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'cozy-cat-house',
    name: 'Cozy Cat House',
    price: 49.99,
    originalPrice: 65.00,
    rating: 4.9,
    reviewsCount: 1420,
    image: ASSETS.productCatHouse,
    category: 'Furniture & Sleep',
    description: 'Enclosed plush sanctuary crafted with orthopedic memory-foam cushioning, breathable wool-blend fabric, and durable scratch-proof exterior.',
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'ergonomic-donut-bed',
    name: 'Calming Cloud Pet Bed',
    price: 58.50,
    originalPrice: 72.00,
    rating: 4.8,
    reviewsCount: 890,
    image: ASSETS.bottomCenter,
    category: 'Bedding',
    description: 'Ultra-soft self-warming shaggy fur pet bed engineered to ease joint tension and relieve pet anxiety.',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: 'organic-salmon-bites',
    name: 'Wild Salmon Crunch Treats',
    price: 18.99,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 2310,
    image: ASSETS.bottomLeft,
    category: 'Nutrition & Treats',
    description: 'Single-ingredient freeze-dried wild Alaskan salmon bites rich in natural Omega-3 fatty acids for vibrant coat luster.',
    badge: 'Organic',
    inStock: true,
  },
  {
    id: 'ceramic-water-fountain',
    name: 'Serene Stream Pet Fountain',
    price: 42.00,
    originalPrice: 50.00,
    rating: 4.7,
    reviewsCount: 654,
    image: ASSETS.bottomRight,
    category: 'Feeding & Hydration',
    description: 'Whisper-quiet triple-filtration ceramic water dispenser encouraging hydration and urinary health.',
    badge: 'Eco-Friendly',
    inStock: true,
  },
];

// 4. Lista inicial de favoritos para que al cargar la web el contador muestre 4
export const FAVORITES_INITIAL = [
  FEATURED_PRODUCTS[0],
  FEATURED_PRODUCTS[1],
  FEATURED_PRODUCTS[2],
  FEATURED_PRODUCTS[3],
];
