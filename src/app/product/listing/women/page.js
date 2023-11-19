import CommonLisnting from "@/components/CommonListing";
import { productByCategory } from "@/services/product";




export default async function womenAllProducts(){
    const getAllProducts = await productByCategory('women');

    return <CommonLisnting data={ getAllProducts && getAllProducts.data } />
}