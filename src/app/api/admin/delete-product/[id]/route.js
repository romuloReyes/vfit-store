import conectToDB from "@/database";
import Product from "@/models/product";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export async function DELETE(req){ 
    //console.log(req)
    //const router = useRouter();
    //console.log(router.query);
    try {       
        await conectToDB();
        const { searchParams, pathname } = new URL(req.url);
        //const id = searchParams.get('id');
        const id2 = pathname.slice(26);
        

        if(!id2) return NextResponse.json({ success : false, message : 'ID del producto no encontrado' });
        
        const deletedProduct = await Product.findByIdAndDelete(id2);
        if(deletedProduct){
            return NextResponse.json({ success : true, message : 'Producto eliminado correctamente' });
        }else{
            return NextResponse.json({ success : false, message : 'Error al borrar el producto' });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo (d-p)'
        })
    }
}