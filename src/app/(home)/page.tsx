import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "./components/product-list";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "./components/section-title";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: { gt: 0 },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div>
      <PromoBanner
        src="/banner-desconto.png"
        alt="até 55 porcento de desconto esse mês!"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mb-6 mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="até 55 porcento de desconto esse mês!"
      />
      <div className="mb-6 mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
