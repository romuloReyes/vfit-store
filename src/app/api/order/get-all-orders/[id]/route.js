import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export async function GET(req, {params}){
    try {

        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            const id2 = params.id;

            const extractAllOrders = await Order.find({user : id2}).populate('orderItems.product');
        
            if(extractAllOrders){
                return NextResponse.json({
                    success : true,
                    data : extractAllOrders
                });
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'Error al cargar la orden.'
                })
            }



        }else{
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado'
            });
        }

        
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Por favor intente de nuevo'
        })
    }
}