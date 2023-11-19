import CommonLisnting from "@/components/CommonListing";
import { productByCategory } from "@/services/product";




export default async function kidsAllProducts(){
    const getAllProducts = await productByCategory('kids');

    return <CommonLisnting data={ getAllProducts && getAllProducts.data } />
}

