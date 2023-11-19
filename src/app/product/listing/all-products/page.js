import CommonLisnting from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";



export default async function allProducts(){

    const getAllProducts = await getAllAdminProducts();

    return <CommonLisnting data={ getAllProducts && getAllProducts.data } />
}

