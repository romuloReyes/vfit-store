'use client'

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context"
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";



export default function Account(){
    const { user, 
        addresses, 
        setAddresses, 
        addressFormData, 
        setAddressFormData, 
        componentLevelLoader, 
        setComponentLevelLoader, 
        pageLevelLoader, 
        setPageLevelLoader } = useContext(GlobalContext);
    const [ showAddressForm, setShowAddressForm ] = useState(false);
    const [ currentEditedAddressId, setCurrentEditedAddressId ] = useState(false);
    const router = useRouter();


                async function extractAllAddresses(){
                    setPageLevelLoader(true);
                    const res = await fetchAllAddresses(user?.id);

                    if(res.success){
                        setPageLevelLoader(false);
                        setAddresses(res.data)
                    }
                }

                async function handleAddOrUpdateAddress(){

                    setComponentLevelLoader({ loading : true, id : '' });

                    const res = /**currentEditedAddressId !== null ? 
                        await updateAddress( { ...addressFormData, _id : currentEditedAddressId } )
                        :**/
                        await addNewAddress( {...addressFormData, userID : user?.id} );

                    if(res.success){
                        setComponentLevelLoader({ loading : false, id : '' })
                        toast.success(res.message, {
                            position : toast.POSITION.TOP_RIGHT
                        });
                        setAddressFormData({
                            fullName : '',
                            city : '',
                            country : '',
                            postalCode : '',
                            address : ''
                        });

                        extractAllAddresses();
                        setCurrentEditedAddressId(null);

                    } else {
                        setComponentLevelLoader({ loading : false, id : '' })
                        toast.error(res.message, {
                            position : toast.POSITION.TOP_RIGHT
                        });
                        setAddressFormData({
                            fullName : '',
                            city : '',
                            country : '',
                            postalCode : '',
                            address : ''
                        });
                    }


                }

                function handleUpdateAddress(getCurrentAddress){
                    setShowAddressForm(true);

                    setAddressFormData({
                        fullName : getCurrentAddress.fullName,
                        city : getCurrentAddress.city,
                        country : getCurrentAddress.country,
                        postalCode : getCurrentAddress.postalCode,
                        address : getCurrentAddress.address
                    });
                    setCurrentEditedAddressId(getCurrentAddress._id);

                }

                async function handleDelete(getCurrentAddressID){
                    setComponentLevelLoader({ loading : true, id : getCurrentAddressID })
                    const res = await deleteAddress(getCurrentAddressID);

                    if(res.success){
                        setComponentLevelLoader({ loading : false, id : '' })
                        toast.success(res.message, {
                            position : toast.POSITION.TOP_RIGHT
                        });
                        extractAllAddresses()
                    }else{
                        setComponentLevelLoader({ loading : false, id : '' })
                        toast.success(res.message, {
                            position : toast.POSITION.TOP_RIGHT
                        });
                    }

                }

    useEffect(()=>{
        if(user !== null){
            extractAllAddresses();
        }

    }, [user]);


    return(
        <section>
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                            {/**Render randow user image here */}

                        </div>

                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">
                                {user?.name}
                            </h4>

                            <p>{user?.email}</p>
                            <p>{user?.role}</p>

                        </div>

                        <button onClick={ ()=> router.push('/orders') } className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50">
                            Tus ordenes
                        </button>

                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Tus direcciónes:</h1>

                            {
                                pageLevelLoader ? 
                                    <div className="ml-16 mt-8">
                                        <PulseLoader
                                            color={'#000000'}
                                            loading={pageLevelLoader}
                                            size={15}
                                            data-testid="loader" 
                                        />
                                    </div>
                                :
                                <div className="mt-4 flex flex-col gap-4">
                                {
                                    addresses && addresses.length ? 
                                        addresses.map( item => <div className="border p-6" key={item._id}>
                                            <p>Nombre : {item.fullName} </p>
                                            <p>Dirrección : {item.address} </p>
                                            <p>Ciudad : {item.city} </p>
                                            <p>Pais : {item.country} </p>
                                            <p>Codigo Postal : {item.postalCode} </p>
                                            <button 
                                                className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                                onClick={ ()=> handleUpdateAddress(item) }
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase'
                                                onClick={ ()=> handleDelete(item._id) }
                                            >
                                                {
                                                    componentLevelLoader && componentLevelLoader.loading 
                                                    && componentLevelLoader.id === item._id ?
                                                        <ComponentLevelLoader
                                                            text={''}
                                                            color={"#ffffff"}
                                                            loading={componentLevelLoader && componentLevelLoader.loading}
                                                        />
                                                        :
                                                        'Eliminar'
                                                }
                                            </button>

                                        </div> ) 
                                        : 
                                        <p>Por favor, agrega una direccion de envío.</p>
                                }

                            </div>

                            }
                            
                        </div>

                        <div className="mt-4">
                            <button 
                                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
                                onClick={()=> setShowAddressForm(!showAddressForm) }
                            >
                                { showAddressForm ? 'Ocultar Formulario' : 'Agregar dirrección' }
                            </button>
                        </div>

                        {
                            showAddressForm ? 
                                <div className="flex flex-col mt-5 pt-4 justify-center items-center">
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                        { addNewAddressFormControls.map( controlItem => 
                                            <InputComponent
                                                key={controlItem.id}
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label}
                                                value={addressFormData[controlItem.id]}
                                                onChange={ (e) => setAddressFormData({
                                                    ...addressFormData, [controlItem.id] : e.target.value
                                                }) }
                                            />    
                                        ) }

                                    </div>

                                    <button 
                                        className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
                                        onClick={ handleAddOrUpdateAddress }
                                    >
                                        {
                                            componentLevelLoader && componentLevelLoader.loading ? (
                                                <ComponentLevelLoader 
                                                    text={''}
                                                    color={"#ffffff"}
                                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                                />)
                                                :(
                                                'Guardar')
                                        }
                                    </button>

                                </div>
                            : null
                        }

                        

                    </div>

                </div>

            </div>
            
            <Notification />
        </section>

    )
}