import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";
const stripe = require('stripe')('sk_test_51OFhvyJsrW3xF2KKmgVAHXxU5xiDKEef7m5gSXItFf1g0ktASR0hfgHOK98d5DeQFWXkNfvElxDx18KMMCfQCb0i00UDdW4eFk');


export const dynamic = 'force-dynamic';

export async function POST(req){

    try {
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const res = await req.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types : ["card"],
                line_items : res,
                mode : "payment",
                success_url : `${process.env.NEXT_PUBLIC_URL}/checkout` + "?status=success", 
                cancel_url : `${process.env.NEXT_PUBLIC_URL}/checkout` + "?status=cancel",
            });

            return NextResponse.json({
                success : true,
                id : session.id,
            })

        }else{
            return NextResponse.json({
                success: false,
                message : 'No estas autenticado',
            })
        }
        

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success : false,
            message : 'Algo salio mal. Por favor intente de nuevo.'
        })
    }
}