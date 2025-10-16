import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail = ({ product, open, onClose, onAddToCart }: ProductDetailProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30">
            <img 
              src={product.image} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {product.description}
            </p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Características:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Qualidade premium garantida</li>
                <li>Garantia de 12 meses</li>
                <li>Entrega rápida em todo Brasil</li>
                <li>Produto original</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              
              <Button 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
