'use client'

import { GlobalContext } from "@/context";
import { deletedProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({item}){
            const { setCurrentUpdatedProduct, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
            const pathName = usePathname();
            const isAdminView = pathName.includes('admin-view');
            const router = useRouter();

            async function handleDeleteProduct(item){
                const res = await deletedProduct(item._id);
                setComponentLevelLoader({loading : true, id : item._id});

                if(res.success){
                    setComponentLevelLoader({loading : false, id : ''});
                    toast.success(res.message, {
                        position : toast.POSITION.TOP_RIGHT
                    });
                    
                    router.refresh();
                }else {
                    setComponentLevelLoader({loading : false, id : ''});
                    toast.error(res.message, {
                        position : toast.POSITION.TOP_RIGHT
                    });
    
                }
            }
    
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
            <button 
                onClick={()=>handleDeleteProduct(item)}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {
                    componentLevelLoader && componentLevelLoader.loading && item._id === componentLevelLoader.id ? 
                        <componentLevelLoader 
                            text={'Eliminando Producto'}
                            color={"#ffffff"}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                        /> : 'Eliminar'
                }
            </button>
        </>
        ):(
        <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Agregar al Carrito</button>
        </>
        )
}