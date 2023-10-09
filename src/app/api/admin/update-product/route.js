import conectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";




export const dynamic = 'force-dynamic';

export async function PUT(req){
    try {
        await conectToDB();
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
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo mas tarde (u-p).'
        }) 
    }
}