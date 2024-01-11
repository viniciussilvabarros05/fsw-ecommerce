import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";

interface ProductDetailsPageProps{
    params:{
        slug:string;
    }
}


const ProductDetailsPAge = async ({params: {slug}}: ProductDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where:{
            slug: slug
        }
    })
    if(!product){
        return null
    }
    return ( 
        <div className="w-full flex flex-col gap-8">
            <ProductImages imageUrls={product.imageUrls} name={product.name}/>
            <ProductInfo product={computeProductTotalPrice(product)}/>
        </div> 
    );
}
 
export default ProductDetailsPAge;