import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { categoryIcon } from "@/constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProduct = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      Product: true,
    },
  });
  if (!category) {
    return null;
  }
  return (
    <div className="flex h-full w-full flex-col gap-8 p-4">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.325rem] text-base uppercase"
        variant="outline"
      >
        {categoryIcon[params.slug as keyof typeof categoryIcon]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {category?.Product.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
