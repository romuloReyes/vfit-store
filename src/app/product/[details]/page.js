import CommonDetails from "@/components/commonDetails";
import { productByID } from "@/services/product";




export default async function ProductDetails ({params}){
    const productDetailsData = await productByID(params.details);

    return <CommonDetails item={ productDetailsData && productDetailsData.data } />
}