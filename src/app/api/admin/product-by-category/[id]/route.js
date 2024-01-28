import conectToDB from "@/database";
import Product from "@/models/product";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(req, {params}){
    try {
        await conectToDB();
        //const {searchParams, pathname} = new URL(req.url);
        //const id = pathname.slice(31);
        const id = params.id;

        const getData = await Product.find({ category : id });

        if(getData){
            return NextResponse.json({
                success: true, data : getData
            });
        }else {
            return NextResponse.json({
                success : false, status: 204, message : 'No products found'
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Something went wrong, please try again el viernes'
        })
    }
}