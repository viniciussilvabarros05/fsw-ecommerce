import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";

import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({})
    return (
    <div className="p-5 w-full flex flex-col gap-8">
      <Badge className="gap-1 border-primary border-2 text-base px-3 uppercase py-[0.325rem] w-fit" variant="outline">
        <ShapesIcon size={16}/>
        <h1>Catalogo</h1>
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {categories.map(category=><CategoryItem key={category.id} category={category}/>)}
      </div>
    </div>
  );
};

export default CatalogPage;
