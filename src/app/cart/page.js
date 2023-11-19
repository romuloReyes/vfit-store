'use client'

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";


export default function Cart(){
            const { user, setCartItems, cartItems, pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);

            async function extractAllCartItems(){
                setPageLevelLoader(true);
                const res = await getAllCartItems(user?.id);

                if(res.success){
                    setPageLevelLoader(false);
                    setCartItems(res.data);
                    localStorage.setItem('cartItems', JSON.stringify(res.data));
                }

                console.log(res);
            };

            useEffect(()=>{
                if( user !== null ) extractAllCartItems();
            }, [user]);

            async function handleDeleteCartItem(cartItemID){
                setComponentLevelLoader({loading: true, id: cartItemID});
                const res = await deleteFromCart(cartItemID);
        
                if(res.success){
                    setComponentLevelLoader({loading: false, id: ''});
                    toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        
                    extractAllCartItems();
        
                }else {
                    setComponentLevelLoader({loading: false, id: cartItemID});
                    toast.error(res.message, { position: toast.POSITION.TOP_RIGHT });
        
                }
        
            }   

            if(pageLevelLoader){
                return <div className="w-full min-h-screen flex justify-center items-center">
                    <PulseLoader
                        color={'#000000'}
                        loading={pageLevelLoader}
                        size={30}
                        data-testid="loader"
                    />
                </div> 
                
            }

    return <CommonCart componentLevelLoader={componentLevelLoader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems} />
        
}