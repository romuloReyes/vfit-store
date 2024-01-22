import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function PUT(req){

    try {
        
        await conectToDB();
        const isAuthUser = await AuthUser(req);
        const data = await req.json();

        if(isAuthUser?.role === 'admin'){

            const { _id, shippingAddress, orderItems, paymentMethod, isPaid, paidAt, isProcessing } = data;
            const updateOrder = await Order.findOneAndUpdate(
                {_id : _id}, 
                {shippingAddress, orderItems, paymentMethod, isPaid, paidAt, isProcessing}, 
                {new : true}
            );

            if(updateOrder){
                return NextResponse.json({
                    success : true,
                    message : 'Orden Actualizada'
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'Error al actualizar la orden'
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