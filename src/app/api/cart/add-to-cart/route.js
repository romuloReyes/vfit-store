import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const AddToCart = await Joi.object({
    userID : Joi.string().required(),
    productID : Joi.string().required()
})



export async function POST(req){

    try {
        await conectToDB();
        const isAuthUser = await AuthUser(req);        

        if(isAuthUser){

            const data = await req.json();
            const { productID, userID } = data;
            const { error } = AddToCart.validate({userID, productID});

            if(error){
                return NextResponse.json({
                    success : false,
                    message : error.details[0].message
                })
            }

            const currentCartItemAlreadyExists = await Cart.find({
                productID : productID,
                userID : userID
            })

            if(currentCartItemAlreadyExists?.length > 0){
                return NextResponse.json({
                    success : false,
                    message : 'Este producto ya fue agregado al carrito'
                });
            }

            const saveProductInCart = await Cart.create(data);
            if(saveProductInCart){
                return NextResponse.json({
                    success : true,
                    message : 'Producto agregado al carrito'
                })
            } else{
                return NextResponse.json({
                    success : false,
                    message : 'No se pudo agregar al carrito. Intente de nuevo.'
                })
            }

        } else{
            return NextResponse.json({
                success : false,
                message : 'No estas autenticado.'
            })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal. Intenta de nuevo mas tarde.'
        })
    }

}