import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function POST(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){

            const data = await req.json();
            console.log(data);

            const { user } = data;

            const saveNewOrder = await Order.create(data);
            if(saveNewOrder){
                await Cart.deleteMany({ userID : user });

                return NextResponse.json({
                    success : true,
                    message : 'Gracias por su compra'
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'Error al procesar la orden. Por favor intente de nuevo.'
                })
            }

        }else{
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado.'
            });
        }
        
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Por favor intente de nuevo.'
        })
    }
}