import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "../../components/ui/product-list";
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
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-8 py-8">
      <PromoBanner
        src="/banner-desconto.png"
        alt="até 55 porcento de desconto esse mês!"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>
      <div>
        <PromoBanner
          src="/banner-mouses.png"
          alt="até 55% porcento de desconto em mouses!"
        />
      </div>
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      <div>
        <PromoBanner
          src="/banner-fones.png"
          alt="até 20% porcento de desconto em fones!"
        />
      </div>
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
