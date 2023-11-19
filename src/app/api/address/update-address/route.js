import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";



export const dynamic = 'force dynamic';


export async function PUT(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            
            const data = await req.json();
            const { _id, fullName, city, address, country, postalCode } = data;

            const updateAddress = await Address.findOneAndUpdate({_id : _id}, 
                {fullName, city, address, country, postalCode}, 
                { new : true });
            
            if(updateAddress){
                return NextResponse.json({
                    success : true,
                    message : 'Dirección actualizada correctamente'
                })
            } else {
                return NextResponse.json({
                    success : false,
                    message : 'Error al actualizar la dirección'
                })
            } 

        } else {
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