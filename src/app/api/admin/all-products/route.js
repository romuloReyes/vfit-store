import conectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export async function GET(req){

    try {
        await conectToDB();
        //const user = 'admin';

        const extractAllProducts = await Product.find({});

        if(extractAllProducts){
            return NextResponse.json({
                success : true,
                data : extractAllProducts
            })
        }else {
            return NextResponse.json({
            success : false,
            status : 204,
            message : 'No products found'
            })

        }
            
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong, please try again el viernes'
        })
    }
}