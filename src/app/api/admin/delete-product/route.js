import conectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export default async function DELETE(req){
    try {
        await conectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if(!id) return NextResponse.json({ success : false, message : 'ID del producto no encontrado' });
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(deletedProduct){
            return NextResponse.json({ success : true, message : 'Producto eliminado correctamente' });
        }else{
            return NextResponse.json({ success : false, message : 'Error al borrar el producto' });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo (d-p)'
        })
    }
}