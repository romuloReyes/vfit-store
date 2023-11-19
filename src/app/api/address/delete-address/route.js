import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";



export const dynamic = 'force dynamic';


export async function DELETE(req){

    try {
        await conectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if(!id){
            return NextResponse.json({
                success : false,
                message : 'Inicia sesión para continuar'
            })
        };

        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const deletedItem = await Address.findByIdAndDelete(id);
            if(deletedItem){
                return NextResponse.json({
                    success : true,
                    message : 'Direccion eliminada correctamente'
                })
            } else {
                return NextResponse.json({
                    success : false,
                    message : 'Error al eliminar la direccion'
                })
            }
           
        } else {
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado.'
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