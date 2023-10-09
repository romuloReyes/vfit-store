import CommonLisnting from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";



export default async function AdminAllProducts(){

    const allAdminProducts = await getAllAdminProducts();

    return <CommonLisnting data={allAdminProducts && allAdminProducts.data} />
}