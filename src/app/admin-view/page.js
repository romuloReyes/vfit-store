

'use client'

import ComponentLevelLoader from "@/components/Loader/componentLevel";
import { GlobalContext } from "@/context"
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { Chau_Philomene_One } from "next/font/google";
import { useContext, useEffect } from "react"
import { PulseLoader } from "react-spinners";

export default function AdminView(){
    const { 
        allOrdersForAllUsers, 
        setAllOrdersForAllUsers, 
        user, 
        pageLevelLoader, 
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader, 
    } = useContext(GlobalContext);

    async function extractAllOrdersForAllUsers(){
        setPageLevelLoader(true);
        const res = await getAllOrdersForAllUsers();
        console.log(res, 'esta es la respues RES');

        if(res.success){
            setPageLevelLoader(false);
            setAllOrdersForAllUsers( res.data && res.data.length ? res.data.filter( (item)=> item.user._id !== user.id ) : [] )

        }else{
            setPageLevelLoader(false);
        }
    }

    useEffect(()=>{
        if( user !== null )extractAllOrdersForAllUsers();

    }, [ user ]);

    async function handleUpdateOrderStatus(getItem){

        setComponentLevelLoader({loading : true, id : getItem._id})
        const res = await updateStatusOfOrder({
            ...getItem,
            isProcessing : false
        });

        if(res.success){
            setComponentLevelLoader({loading : false, id : ''})
            const res = await getAllOrdersForAllUsers();
            console.log(res, 'esta es la respues RES');

            if(res.success){
                setAllOrdersForAllUsers( res.data && res.data.length ? res.data.filter( (item)=> item.user._id !== user.id ) : [] )

            }else{
                setComponentLevelLoader({loading : false, id : ''})}
        } else{
            setComponentLevelLoader({loading : false, id : ''})
        }
    }

    if(pageLevelLoader){
        return (<div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader            
            color={'#000000'}
            loading={pageLevelLoader}
            size={30}
            data-testid="loader"
        />
    </div> )

    }

    console.log(allOrdersForAllUsers, 'Este es el estado allOrders');

    return <section>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div>
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                        {
                        allOrdersForAllUsers && allOrdersForAllUsers.length ? 
                            <ul className="flex flex-col gap-4">
                                {
                                allOrdersForAllUsers.map((item)=>(
                                    <li 
                                        key={item._id}
                                        className="p-5 bg-gray-200 shadow flex flex-col space-y-3 py-6 text-left"    
                                    >
                                        <div className="flex">
                                            <h1 className="font-bold text-lg mb-3 flex-1">
                                                Orden #: {item._id}
                                            </h1>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">Nombre de usuario:</p>
                                                    <p className="text-sm font-semibold text-gray-900">{item?.user?.name}</p>

                                                </div>

                                                <div className="flex items-center">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">Email:</p>
                                                    <p className="text-sm font-semibold text-gray-900">{item?.user?.email}</p>

                                                </div>
                                                <div className="flex items-center">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">Total pagado:</p>
                                                    <p className="text-sm font-semibold text-gray-900">${item?.totalPrice}</p>

                                                </div>
                                            </div>
                                           

                                        </div>

                                        <div className="flex gap-2">
                                            {
                                            item.orderItems.map((orderItem, index)=> (
                                                <div key={index} className="shrink-0">
                                                    <img 
                                                        src={ orderItem && orderItem.product && orderItem.product.imageUrl } 
                                                        className="h-24 w-24 max-w-full rounded-lg object-cover" 
                                                        alt="Order item"
                                                    />
                                                </div>
                                            ))
                                            }

                                        </div>

                                        <div className="flex gap-5">
                                            <button 
                                                className='disabled:opacity-50 my-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                            >
                                                { item.isProcessing ? 'Orden en proceso' : 'Orden enviada' }
                                            </button>

                                            <button 
                                                className='my-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase disabled:opacity-50'
                                                onClick={()=> handleUpdateOrderStatus(item)}
                                                disabled={!item.isProcessing}
                                            >
                                                {
                                                    componentLevelLoader && componentLevelLoader.loading &&
                                                    componentLevelLoader.id === item._id ? 
                                                    <ComponentLevelLoader
                                                        text={'Actualizando'}
                                                        color={"#ffffff"}
                                                        loading={componentLevelLoader && componentLevelLoader.loading}
                                                    /> : 'Actualizar Orden'
                                                }
                                            </button>
                                        </div>

                                    </li>
                                ))
                                }

                            </ul>
                            :
                            null
                        }

                    </div>

                </div>
            </div>
        </div>
    </section>
}