import conectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export async function DELETE(req, {params}){ 
    
    try {       
        await conectToDB();
        const isAuthUser = AuthUser(req);

        if(isAuthUser?.role === 'admin'){
            const id2 = params.id;
            

            if(!id2) return NextResponse.json({ success : false, message : 'ID del producto no encontrado' });
            
            const deletedProduct = await Product.findByIdAndDelete(id2);
            if(deletedProduct){
                return NextResponse.json({ success : true, message : 'Producto eliminado correctamente' });
            }else{
                return NextResponse.json({ success : false, message : 'Error al borrar el producto' });
            }

        } else{
            return NextResponse.json({ success : false, message : 'No estas autenticado' });

        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Algo salio mal, intenta de nuevo (d-p)'
        })
    }
}