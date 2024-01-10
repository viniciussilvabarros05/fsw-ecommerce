import { prismaClient } from "@/lib/prisma";

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
        <h1>
            {product.name}
        </h1> 
    );
}
 
export default ProductDetailsPAge;