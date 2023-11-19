import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";



export const dynamic = 'force dynamic';


export async function GET(req, {params}){

    try {
        await conectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const id2 = params.id;
        

        if(!id2){
            return NextResponse.json({
                success : false,
                message : 'Inicia sesión para continuar'
            })
        };
        
        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const getAllAddresses = await Address.find({userID : id2})

            if(getAllAddresses){
                return NextResponse.json({
                    success : true,
                    data : getAllAddresses
                })
            }else {
                return NextResponse.json({
                    success : false,
                    message : 'Error al mostrar la información. Por favor intente de nuevo.'
                })
            }
        }

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Por favor intente de nuevo'
        })
    }
}