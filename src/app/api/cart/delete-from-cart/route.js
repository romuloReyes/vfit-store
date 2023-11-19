import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';



export async function DELETE(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if(!id){
                return NextResponse.json({
                    success : false,
                    message : 'ID del producto no encontrado en el carrito'
                })
            }

            const deleteCartItem = await Cart.findByIdAndDelete(id);

            if(deleteCartItem){
                return NextResponse.json({
                    success : true,
                    message : 'Producto eliminado del carrito'
                })
            } else{
                return NextResponse.json({
                    success : false,
                    message : 'Error al remover articulo del carrito. Intente de nuevo.'
                })
            }




        } else{
            return NextResponse.json({ 
                success : false, 
                message : 'No estas autenticado' 
            })
        } 

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Por favor intente de nuevo'
        })
    }
}