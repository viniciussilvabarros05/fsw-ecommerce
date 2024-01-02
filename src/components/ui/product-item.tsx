import { ProductWithTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

interface ProductProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductProps) => {
  return (
    <div className="relative flex max-w-[156px] flex-col gap-4">
      <div className=" flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-[auto] max-h-[70%] w-auto max-w-[90%]"
          style={{ objectFit: "contain" }}
          alt={product.name}
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        <div className="flex items-center  gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold">
                R${product?.totalPrice?.toFixed(2)}
              </p>
              <p className="text-xs line-through opacity-75">
                R${Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold">
                R${Number(product.basePrice).toFixed(2)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
