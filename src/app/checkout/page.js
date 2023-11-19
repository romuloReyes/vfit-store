'use client'

import { fetchAllAddresses } from "@/services/address";
import { useRouter } from "next/navigation";

const { GlobalContext } = require("@/context")
const { useContext, useEffect, useState } = require("react")

export default function CheckOut(){
            const { cartItems, user, addresses, setAddresses, checkoutFormData, setCheckoutFormData } = useContext(GlobalContext);
            const router = useRouter();
            const [ selectedAddress, setSelectedAddress ] = useState(null); 

            async function getAllAddresses(){
                const res = await fetchAllAddresses(user?.id);

                if(res.success){
                    setAddresses(res.data);
                }
            }

            function handleSelectedAddress(getAddress){
                if( getAddress._id === selectedAddress ){
                    setSelectedAddress(null);
                    setCheckoutFormData({
                        ...checkoutFormData,
                        shippingAddress : {},
                    });

                    return;
                }

                setSelectedAddress(getAddress._id);
                setCheckoutFormData({
                    ...checkoutFormData,
                    shippingAddress : {
                        ...checkoutFormData.shippingAddress,
                        fullName : getAddress.fullName,
                        city : getAddress.city,
                        country : getAddress.country,
                        postalCode : getAddress.postalCode,
                        address : getAddress.address
                    }
                })

            }

            useEffect(()=>{
                if(user !== null) getAllAddresses();
            }, [user])

            console.log(checkoutFormData);

    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4">
                    <p className="font-medium text-xl bg-white px-2 sm:px-5 pt-8 pb-4">Carrito de Compras</p>

                    <div className="space-y-3 rounded-b-lg border bg-white px-2 py-4 sm:px-5">
                        {
                            cartItems && cartItems.length ? (
                                cartItems.map(item => (
                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row" 
                                    key={item._id}
                                    >
                                        <img src={item && item.productID && item.productID.imageUrl} 
                                        alt="Cart item"
                                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                        />

                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-bold">{ item && item.productID && item.productID.name }</span>
                                        </div>

                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-bold">{ item && item.productID && item.productID.price }</span>
                                        </div>
                                    </div>))
                            ) : (
                                <div>Your cart is empty</div>
                            )
                        }

                    </div>

                </div>

                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 shadow-lg">
                        <p className="text-xl font-medium">Direccion de envio</p>
                        <p className="text-gray-400 font-bold">Completa tu orden seleciconando una direccion</p>
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                            {
                                addresses && addresses.length ? (
                                    addresses.map( item =>(
                                        <div onClick={()=>handleSelectedAddress(item)} key={item._id} 
                                            className={`border p-6 ${item._id === selectedAddress ? 'border-red-900' : ''}`}
                                        >
                                            <p>Nombre : {item.fullName} </p>
                                            <p>Dirrección : {item.address} </p>
                                            <p>Ciudad : {item.city} </p>
                                            <p>Pais : {item.country} </p>
                                            <p>Codigo Postal : {item.postalCode} </p>
                                            <button 
                                                className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                            >
                                                { item._id === selectedAddress ? 'Dirección seleccionada' : 'Elegir dirección' }
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay direcciones disponibles</div>
                                )
                            }

                        </div>

                        <button 
                            onClick={()=> router.push('/account')}
                            className='my-5 mr-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                        >
                            Agregar dirección
                        </button>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="text-lg font-bold text-gray-900">
                                    ${ cartItems && cartItems.length ? 
                                    cartItems.reduce( (total, item) => item.productID.price + total, 0 ) 
                                    : 
                                    '0' }
                                </p>
                                
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Envio</p>
                                <p className="text-lg font-bold text-gray-900">Gratis</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-lg font-bold text-gray-900">
                                    ${ cartItems && cartItems.length ? 
                                    cartItems.reduce( (total, item) => item.productID.price + total, 0 ) 
                                    : 
                                    '0' }
                                </p>
                                
                            </div>
                            
                            <div className="pb-10">
                                <button 
                                    disabled = { 
                                        (cartItems && cartItems.length === 0) || Object.keys(checkoutFormData.shippingAddress).length === 0 
                                    }
                                    className='disabled:opacity-50 my-5 mr-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                >
                                    Pagar
                                </button>
                            </div>
                            

                        </div>

                </div>

                

            </div>
        </div>
    )
}