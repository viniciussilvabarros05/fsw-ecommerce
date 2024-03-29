import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "./button";
interface CartItemProps {
  product: CartProduct;
}
const CartItem = ({ product }: CartItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity,removeProductFromCart} = useContext(CartContext)

  function handleDecreaseProductQuantity(){
    decreaseProductQuantity(product.id)
  }
  function handleIncreaseProductQuantity(){
    increaseProductQuantity(product.id)
  }
  function handleRemoveProductFromCart(){
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center  rounded-lg bg-accent">
          <Image
            src={""}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">R$ {product.totalPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="line-through text-xs opacity-75">
                R${Number(product.basePrice)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="outline"  className="h-8 w-8" onClick={handleDecreaseProductQuantity}>
              <ArrowLeftIcon size={12}/>
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleIncreaseProductQuantity}>
              <ArrowRightIcon size={12}   />
            </Button>
          </div>
        </div>
      </div>
      <Button size="icon" variant="outline" onClick={handleRemoveProductFromCart}>
        <TrashIcon size={14} />
      </Button>
    </div>
  );
};

export default CartItem;
