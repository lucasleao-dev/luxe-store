import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails, onAddToCart }: ProductCardProps) => {
  const { image, name, description, price } = product;
  
  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-foreground line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2 gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            R$ {price.toFixed(2)}
          </span>
          <Button 
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => onViewDetails(product)}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
