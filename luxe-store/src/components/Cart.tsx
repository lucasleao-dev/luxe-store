import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart = ({ open, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground">
            Carrinho de Compras
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Seu carrinho está vazio
            </p>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-secondary/20 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm font-bold text-primary">
                        R$ {item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-foreground">Total:</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Finalizar Compra
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
