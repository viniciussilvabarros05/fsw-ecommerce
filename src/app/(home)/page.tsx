import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: { gt: 0 },
    },
  });
  return (
    <div className="">
      <Image
        src="/banner-desconto.png"
        height={0}
        width={0}
        alt="até 55 porcento de desconto esse mês!"
        sizes="100vw"
        className="h-auto w-full px-5"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <p className="mb-5 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
    </div>
  );
}
