import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";




export const dynamic = 'force-dynamic';

export async function PUT(req){
    try {
        await conectToDB();
        const isAuthUser = AuthUser(req);

        if( isAuthUser?.role === 'admin' ){
            const extractData = await req.json();

            const { _id, name, price, description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl } = extractData;
            const updatedProduct = await Product.findOneAndUpdate({_id : _id},
            {name, price, description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl},
            {new : true});
            
            if(updatedProduct){
                return NextResponse.json({
                    success : true,
                    message : 'Producto actualizado correctamente.'
                })
            }else {
                return NextResponse.json({
                    success : false,
                    message : 'El producto no pudo ser actualizado, intente de nuevo.'
                })
            }

        } else {
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado'
            })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo mas tarde (u-p).'
        }) 
    }
}