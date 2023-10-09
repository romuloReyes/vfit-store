'use client'

import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react";

export default function ProductButton({item}){
    const { setCurrentUpdatedProduct } = useContext(GlobalContext);
    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');
    const router = useRouter();
    
    return isAdminView ? (
        <>
            <button 
                onClick={ ()=>{
                    setCurrentUpdatedProduct(item);
                    router.push('/admin-view/add-product');
                } }
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                Editar
            </button> 
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Eliminar</button>
        </>
        ):(
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Agregar al Carrito</button>
        </>
        )
}