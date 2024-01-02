'use client'

import Notification from "@/components/Notification";
import { fetchAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const { GlobalContext } = require("@/context")
const { useContext, useEffect, useState } = require("react")

export default function CheckOut(){
            const { cartItems, user, addresses, setAddresses, checkoutFormData, setCheckoutFormData } = useContext(GlobalContext);
            const router = useRouter();
            const params = useSearchParams();
            const [ selectedAddress, setSelectedAddress ] = useState(null); 
            const [ isOrderProcessing, setIsOrderProcessing ] = useState(false);
            const [ orderSuccess, setOrderSuccess ] = useState(false);

            const publishableKey = 'pk_test_51OFhvyJsrW3xF2KKUFTdavnfGMT6XlFNIiIo9SjmA3mZMxzGnZmQ7opHZC3JjHBr5ectQkvUOPZv2sTVG521lhYE001XUiuL1f';
            const stripePromise = loadStripe(publishableKey);

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

            async function handleCheckout(){
                const stripe = await stripePromise;

                const createLineItems = cartItems.map(item=>({
                    price_data : {
                        currency : 'mxn',
                        product_data :{
                            images : [item.productID.imageUrl],
                            name : item.productID.name
                        },
                        unit_amount : item.productID.price * 100
                    },
                    quantity : 1
                }));

                const res = await callStripeSession(createLineItems);
                setIsOrderProcessing(true);
                localStorage.setItem('stripe', true);
                localStorage.setItem('checkoutFormData', JSON.stringify(checkoutFormData));

                const {error} = await stripe.redirectToCheckout({
                    sessionId : res.id,
                })

                console.log(error);
                
            }

            useEffect(()=>{
                if(user !== null) getAllAddresses();
            }, [user])

            useEffect(()=>{

                async function createFinalOrder(){
                    const isStripe = JSON.parse(localStorage.getItem('stripe'));

                    if( isStripe && params.get('status') === 'success' && cartItems && cartItems.length > 0 ){
                        setIsOrderProcessing(true);
                        const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'));
                        
                        const createFinalCheckoutFormData = {
                            user : user?.id,
                            shippingAddress : getCheckoutFormData.shippingAddress,
                            orderItems : cartItems.map(item=>({
                                qty : 1,
                                product : item.productID
                            })),
                            paymentMethod : 'Stripe',
                            totalPrice : cartItems.reduce((total, item)=> item.productID.price + total, 0),
                            isPaid : true,
                            isProcessing : true,
                            paidAt : new Date()
                        }

                        const res = await createNewOrder(createFinalCheckoutFormData);

                        if(res.success){
                            setIsOrderProcessing(false);
                            setOrderSuccess(true);
                            toast.success(res.message, {
                                position : toast.POSITION.TOP_RIGHT
                            })
                        }else{
                            setIsOrderProcessing(false);
                            setOrderSuccess(false);
                            toast.error(res.message, {
                                position : toast.POSITION.TOP_RIGHT
                            })
                        }
                    }
                }

                createFinalOrder();

            }, [params.get('status'), cartItems]);

            useEffect(()=>{
                if(orderSuccess){
                    setTimeout(() => {
                        //setOrderSuccess(false);
                        router.push('/orders')
                    }, 3000);
                }

            }, [orderSuccess])


            if(isOrderProcessing){
                return (<div className="w-full min-h-screen flex justify-center items-center">
                    <PulseLoader
                        color={'#000000'}
                        loading={isOrderProcessing}
                        size={30}
                        data-testid="loader"
                    />
                </div> )
            }

            if(orderSuccess){
                return (
                    <section className="h-screen bg-gray-200">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                                <div className="bg-white shadow">
                                    <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                                        <h1 className="font-bold text-lg">
                                            Tu pago fue exitoso. Gracias por tu compra. Seras redireccionado a tus ordenes.

                                        </h1>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                )
            }


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
                                <div>Tu carrito esta vacio</div>
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
                                    onClick={handleCheckout}
                                    className='disabled:opacity-50 my-5 mr-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                >
                                    Pagar
                                </button>
                            </div>
                            

                        </div>

                </div>

                

            </div>

            <Notification/>
        </div>
    )
}