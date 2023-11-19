import conectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(req, {params}){
    
    try {
        await conectToDB();
        const productId = params.id;

        if(!productId){
            return NextResponse.json({
                success : false,
                status : 400,
                message : 'Product ID not found'
            });
        }
        const result = await Product.find({ _id : productId });
        
        if(result && result.length){
            return NextResponse.json({ success : true, data : result[0] });
        }else {
            return NextResponse.json({
                success : false,
                status : 204,
                message : 'Producto no encontrado'
            });
        }


        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Algo salio mal, por favor intente de nuevo el viernes'
        })
    }
}