import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";



export const dynamic = 'force dynamic';
const addNewAddress = Joi.object({
    fullName : Joi.string().required(),
    address : Joi.string().required(),
    city : Joi.string().required(),
    country : Joi.string().required(),
    postalCode : Joi.string().required(),
    userID : Joi.string().required(),
})


export async function POST(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const data = await req.json();

            const { fullName, address, city, country, postalCode, userID } = data;
            const { error } = addNewAddress.validate({
                fullName, 
                address, 
                city, 
                country, 
                postalCode, 
                userID
            })

            if(error){
                return NextResponse.json({
                    success: false,
                    message : error.details[0].message
                })

            }
            const NewlyAddedAddress = await Address.create(data);
            if(NewlyAddedAddress){
                return NextResponse.json({
                    success: true,
                    message: 'Dirección agregada correctamente'
                })

            } else {
                return NextResponse.json({
                    success: false,
                    message : 'Error al agregar dirección'
                })
            }

        }else {
            return NextResponse.json({
                success: false,
                message: 'No estas autenticado'
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