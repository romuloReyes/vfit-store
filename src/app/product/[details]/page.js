import CommonDetails from "@/components/commonDetails";
import { productByID } from "@/services/product";




export default async function ProductDetails ({params}){
    const productDetailsData = await productByID(params.details);
    console.log(productDetailsData);

    return <CommonDetails item={ productDetailsData && productDetailsData.data } />
}