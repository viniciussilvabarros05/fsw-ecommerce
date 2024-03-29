import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-[100px] h-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          alt={orderProduct.product.name}
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex rounded-md bg-accent px-3 py-1 w-fit">
          <p className="text-[10px]">
            Vendido e entregue por
            <span className="font-bold">FSW Store</span>
          </p>
        </div>
        <p>{orderProduct.product.name}</p>
        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p>R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>
            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
