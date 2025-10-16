import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Cart, { CartItem } from "@/components/Cart";
import { products, Product } from "@/data/products";
import { ShoppingBag, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success("Quantidade atualizada no carrinho!");
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success("Produto adicionado ao carrinho!");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Produto removido do carrinho");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LuxeStore
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <nav className="hidden lg:flex gap-6 mr-4">
                <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Produtos
                </a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Categorias
                </a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </a>
              </nav>

              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Produtos Premium
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
            Descubra nossa coleção exclusiva de produtos cuidadosamente selecionados
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado para "{searchQuery}"
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 LuxeStore. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Cart */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;
