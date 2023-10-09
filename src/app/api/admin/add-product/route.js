import conectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddNewProductSchema = Joi.object({
    name : Joi.string().required(),
    description : Joi.string().required(),
    price : Joi.number().required(),
    category : Joi.string().required(),
    sizes : Joi.array().required(),
    deliveryInfo : Joi.string().required(),
    onSale : Joi.string().required(),
    priceDrop : Joi.number().required(),
    imageUrl : Joi.string().required()
}) 

export const dynamic = 'force-dynamic';

export async function POST(req){
    try {
        await conectToDB();

        /*SECURITY BREACH: hard code use to validate the user as authenticated and with an admin rol during development.
         Is intented to be replaced with a middlewere */
         const user = 'admin'; /* ---- */ 

         if(user === 'admin'){
            const extractData = await req.json();
            const { name, description, price, category, sizes, deliveryInfo, onSale, priceDrop,imageUrl } = extractData;

            const { error } = AddNewProductSchema.validate({
                name, 
                description, 
                price, 
                category, 
                sizes, 
                deliveryInfo, 
                onSale, 
                priceDrop,
                imageUrl
            })
            if(error){
                return NextResponse.json({
                    success : false,
                    message : error.details[0].message
                })
            }

            const newlyCreatedProduct = await Product.create(extractData);
            if(newlyCreatedProduct){
                return NextResponse.json({
                    success : true,
                    message : 'Producto agregado exitosamente'
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'Error al cargar el producto. Por favor intente de nuevo'
                })
            }

         }else{
            return NextResponse.json({
                success : false,
                message : 'No estas autorizado.'
            }) 
         }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo mas tarde.'
        }) 
    }
}