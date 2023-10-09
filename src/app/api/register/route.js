import conectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";


//esquema de validacion mediante Joi library
const schema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required().email(),
    password : Joi.string().required().min(6),
    role : Joi.string().required()
});
export const dynamic = 'force-dynamic';



export async function POST(req){
    await conectToDB();
    const { name, email, password, role } = await req.json();

    //validacion con Joi library
    const { error } = schema.validate({name, email, password, role});
    if(error){
        return NextResponse.json({
            success : false,
            message : error.details[0].message
        })
    }

    try {
        //check if the user already exist
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){

            return NextResponse.json({
                success : false,
                message : 'Este email ya fue registrado. Por favor intenta con otro email.'
            })
        }else {
            const hashPassword = await hash(password, 12);

            const newUserCreated = await User.create({
                name, email, password : hashPassword, role
            });

            if(newUserCreated){
                return NextResponse.json({
                    success : true,
                    message : 'Cuenta creada exitosamente.'
                })
            }
        }

    } catch (error) {
        console.log('Error in new user registration');
        
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo mas tarde.'
        }) 
    }
}