'use client'



export default function CommonCart({cartItems=[], handleDeleteCartItem, componentLevelLoader}){

    return (
        <section className="h-screen bg-gray-100">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">

                    <div className="bg-white shadow">

                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    cartItems && cartItems.length ? 
                                        <ul>{
                                            cartItems.map( cartItem => (
                                                <li 
                                                    key={cartItem._id} 
                                                    className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                                                >
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img 
                                                            src={ cartItem && cartItem.productID && cartItem.productID.imageUrl }
                                                            alt="Product image"
                                                            className="h-full w-full object-cover object-center"
                                                        />

                                                    </div>

                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                            <div className="pr-8 sm:pr-4">
                                                                <p className="text-base font-semibold text-gray-900">
                                                                    {cartItem &&cartItem.productID && cartItem.productID.name} 
                                                                </p>

                                                            </div>

                                                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                                                    {cartItem && cartItem.productID && cartItem.productID.price}
                                                                </p>

                                                                <button 
                                                                    type="button" 
                                                                    className="font-medium text-yellow-700 sm:order-2"
                                                                    onClick={()=> handleDeleteCartItem(cartItem._id)}
                                                                >
                                                                    {
                                                                        componentLevelLoader && componentLevelLoader.loading &&
                                                                        componentLevelLoader.id === cartItem._id ?
                                                                            <componentLevelLoader 
                                                                                text={""}
                                                                                color={"#000000"}
                                                                                loading={componentLevelLoader && componentLevelLoader.loading}
                                                                            /> 
                                                                            : 'Eliminar'
                                                                    }

                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </li>
                                            ))
                                        
                                        }</ul>
                                        
                                    : <div className="font-bold tracking-wide text-lg">Tu carrito esta vacio</div>
                                }
                            </div>
                            
                            <div className="mt-6 border-t py-2 font-bold">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400" >Subtotal</p>
                                    
                                    <p className="text-lg text-black font-semibold" >
                                        ${
                                            cartItems && cartItems.length ? 
                                                cartItems.reduce((total, item)=> item.productID.price + total, 0) 

                                            : "0"
                                        }
                                    
                                    </p>

                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400" >Envio</p>
                                    
                                    <p className="text-lg text-black font-semibold" >$0</p>

                                </div>

                                <div className="flex items-center border-t border-gray-300 justify-between mt-4">
                                    <p className="text-sm text-gray-700" >Total</p>
                                    
                                    <p className="text-lg text-black font-semibold" >
                                        ${
                                            cartItems && cartItems.length ? 
                                                cartItems.reduce((total, item)=> item.productID.price + total, 0) 

                                            : "0"
                                        }
                                    
                                    </p>

                                </div>

                                <div className="mt-5 text-center">
                                    <button 
                                        className="group inline-flex w-full items-center justify-center bg-black text-white px-6 py-4 text-lg font-medium uppercase tracking-wide disabled:opacity-50"
                                        disabled={cartItems && cartItems.length === 0}
                                    >
                                        Continuar y pagar
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            
        </section>
    )
}