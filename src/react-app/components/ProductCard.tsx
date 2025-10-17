import { Product } from '@/shared/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  return (
    <a 
      href={`/products/${product.id}`}
      className="group block bg-white overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 border border-pink-100 card-sharp"
    >
      {/* Product Image with minimal text overlay */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          style={{
            filter: 'sepia(0.1) contrast(0.95) brightness(0.98)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-medium text-white mb-1 font-source">
            {product.name}
          </h3>
          <div className="text-sm text-white/80 font-source">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    </a>
  );
}
