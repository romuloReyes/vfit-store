
'use client'
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



export default function CartModal(){
            const { showCartModal, 
                setShowCartModal, 
                user, cartItems, 
                setCartItems, 
                componentLevelLoader, 
                setComponentLevelLoader,  } = useContext(GlobalContext);
            const router = useRouter();


            async function extractAllCartItems(){
                const res = await getAllCartItems(user?.id);

                if(res.success){
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

            function handleGoToCart(){
               
            }


    return <CommonModal 
        showButtons={true}
        show={showCartModal} 
        setShow={setShowCartModal}
        mainContent={
            cartItems && cartItems.length ? 
                <ul className="my-6 divide-y divide-gray-300">
                    {
                        cartItems.map(cartItem=> 
                        <li key={cartItem.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img 
                                    src={cartItem && cartItem.productID && cartItem.productID.imageUrl}
                                    alt="Cart Item"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a>{cartItem && cartItem.productID && cartItem.productID.name}</a>
                                        </h3>
                                    </div>

                                    <p className="mt-1 text-sm text-gray-600">
                                        ${cartItem && cartItem.productID && cartItem.productID.price}
                                    </p>

                                </div>

                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <button 
                                        type="button" 
                                        className="font-medium text-yellow-600 sm:order-2"
                                        onClick={()=> handleDeleteCartItem(cartItem._id)}
                                    >
                                        {
                                            componentLevelLoader && componentLevelLoader.loading && 
                                            componentLevelLoader.id === cartItem._id ?
                                                <componentLevelLoader 
                                                    text={'Eliminando'}
                                                    color={"#000000"}
                                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                                /> : 'Eliminar'
                                        }
                                    </button>

                                </div>

                            </div>
                        
                        </li> )
                    }

                </ul>
            : null
        }
        buttonComponent={
            <Fragment>
                <button 
                    type="button"
                    className="mt-1.5 w-full inline-block bg-black text-white px5 py-3 text-xs font-medium uppercase tracking-wide"
                    onClick={()=> { router.push('/cart'); setShowCartModal(false); }}
                >
                    Carrito
                </button>

                <button 
                    onClick={()=> {router.push('/checkout'); setShowCartModal(false);}}
                    disabled={ cartItems && cartItems.length === 0 }
                    type="button"
                    className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50">
                    Proceder al pago
                </button>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                    <button type="button" className="font-medium text-grey">
                        Continuar Comprando <span aria-hidden="true">  &rarr;</span>
                    </button>

                </div>
            </Fragment>
        }
    />
}