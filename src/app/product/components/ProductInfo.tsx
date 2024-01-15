"use client";

import { Button } from "@/components/ui/button";
import DiscountBadeg from "@/components/ui/discount-badeg";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addProductToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  function handleDecreaseQuantityClick() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  }
  function handleIncreaseQuantityClick() {
    setQuantity((prev) => prev + 1);
  }

  function handleAddToCartClick() {
    addProductToCart({...product, quantity});
  }
  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R${product.totalPrice.toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <DiscountBadeg>{product.discountPercentage}</DiscountBadeg>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R${Number(product.basePrice).toFixed(2)}
        </p>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={14} />
        </Button>
        <span>{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={14} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold"></h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>
      <Button className="mt-8 font-bold uppercase" onClick={handleAddToCartClick}>
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrga via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-[#8162FF]">Envio para todo Brasil</p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
