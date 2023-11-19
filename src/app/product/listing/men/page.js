import CommonLisnting from "@/components/CommonListing";
import { productByCategory } from "@/services/product";



export default async function menAllProducts(){
    const getAllProducts = await productByCategory('men');

    return <CommonLisnting data={ getAllProducts && getAllProducts.data } />;
}