import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';



export async function GET(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const { searchParams } =  new URL(req.url);
            const id = searchParams.get('id');

            if(!id) return NextResponse.json({ success : false, message : 'Por favor inicie sesion para continuar' });

            const extractAllCartItems = await Cart.find({ userID : id }).populate('productID');

            if(extractAllCartItems){
                return NextResponse.json({
                    success : true,
                    data : extractAllCartItems
                })

            }else {
                return NextResponse.json({
                    success : false,
                    status : 204,
                    message : 'No se encontro ningun articulo en el carrito'
                })

            }


        }else {
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado'
            })
        }
        
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Por favor intenta de nuevo.'
        })
    }
}