"use client"
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
const Cart = () => {
  const { products, total, totalDiscount, subtotal } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-8 h-full">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.325rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5 h-full max-h-[70%]">
        <ScrollArea className="h-full">
        <div className="flex h-full flex-col gap-8">
        {products.length > 0 ? (
            products?.map((product) => (
              <CartItem
                key={product.id}
                product={computeProductTotalPrice(product as any) as any}
              />
            ))
          ) : (
            <p className="text-center font-semibold">Carrinho vazio</p>
          )}
        </div>
        </ScrollArea>
      </div>



      <div className="flex flex-col gap-3 h-[25%]">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entraga</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Desconto</p>
          <p>-R$ {totalDiscount.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
        <Button className="mt-7 font-bold uppercase">
            Finalizar
        </Button>
      </div>
    </div>
  );
};

export default Cart;
