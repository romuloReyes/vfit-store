import { NextResponse } from "next/server";
import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";


export const dynamic = 'force-dynamic';


export async function GET(req){

    try {

        await conectToDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser?.role === 'admin'){

            const getAllOrders = await Order.find({}).populate('orderItems.product').populate('user');
            if(getAllOrders){
                return NextResponse.json({
                    success : true,
                    data : getAllOrders
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'Error. No se encontraron las ordenes'
                })
            }

        }else{
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