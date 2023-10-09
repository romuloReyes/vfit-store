import conectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";



const schemaJoi = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST(req){
    await conectToDB(); //1.- Conect to the database.
    const { email, password } = await req.json(); //2.- Destructure name and password of the user that wants to log in.
    const { error } = schemaJoi.validate({email, password}); //3.- Validating that name and password are valid entries using Joi library.
    if(error){
        return NextResponse.json({
            success : false,
            message : error.details[0].message
        })//3.b.- If error exist, return object with the above information.
    };

    try {
        const findUser = await User.findOne({email}); //4.- Validate that the user actually exist using the "User" schema.
        if(!findUser){
            return NextResponse.json({
                success : false,
                message : 'Contraseña o Email incorrecto.'
            });//4.b.- If user does not exist, return object with the above information.
        }
        const checkPassword = await compare(password, findUser.password);//5.- validate that the password provide by user is the same that the one in the database using the compare method provide by bcryptjs library.
        if(!checkPassword){
            return NextResponse.json({
                success : false,
                message : 'Contraseña o Email incorrecto.'
            });//5.b.- if the compare method result is false, return object with the above information.
        }

        //6.- Once the information provide by user past the validations, create Json web token with the jwt library.
        const token = jwt.sign({
            user : findUser._id,
            email : findUser.email,
            role : findUser.role
        }, 'default_secret_key', { expiresIn : '1d' });

        const finalData = {
            token,
            user : {
                name : findUser.name,
                email : findUser.email,
                id : findUser._id,
                role : findUser.role
            }
        }

        return NextResponse.json({
            sucess : true,
            message : 'Inicio de Sesión exitoso',
            finalData
        })// Return the information that frontend will need.
        
    } catch (error) {
        console.log('Error while new user registration. Please try again', error);
        
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo mas tarde.'
        }) 
    }


}