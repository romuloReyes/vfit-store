"use client"

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import ComponentLevelLoader from "@/components/Loader/componentLevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { addNewProduct, updateProduct } from "@/services/product"
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStorageURL } from "@/utils"
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"; 
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

            //firebase service to manage image
            const app = initializeApp(firebaseConfig);
            const storage = getStorage(app, firebaseStorageURL);

            const createUniqueFileName = (getFile)=>{
                const timeStamp = Date.now();
                const randomStringValue = Math.random().toString(36).substring(2, 12);

                return `${getFile.name}-${timeStamp}-${randomStringValue}`
            }

            async function helperForUpLoadingImageToFirebase(file){
                const getFileName = createUniqueFileName(file);
                const storageReference = ref(storage, `vfit-store/${getFileName}`);
                const uploadImage = uploadBytesResumable(storageReference, file);

                return new Promise((resolve, reject)=>{
                    uploadImage.on('state_changed', 
                        (snapshot)=>{}, 
                        (error)=>{
                            console.log(error); 
                            reject(error);
                        },

                        ()=>{
                            getDownloadURL(uploadImage.snapshot.ref)
                                .then((downloadUrl)=> resolve(downloadUrl))
                                .catch((error)=> reject(error));
                        }
                    )
                })
            }

            const initialFormData = {
                name : '',
                price : 0,
                description : '', 
                category : '',
                sizes : [],
                deliveryInfo : '',
                onSale : 'no',
                imageUrl : '',
                priceDrop : 0
            }



export default function AdminAddNewProduct(){
        const [ formData, setFormData ] = useState(initialFormData);
        const { componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct } = useContext(GlobalContext);
        
        console.log(currentUpdatedProduct);
        const router = useRouter();

        useEffect(()=>{
            if(currentUpdatedProduct !== null){
                setFormData(currentUpdatedProduct);
            }
        },[currentUpdatedProduct])
        
        //START FLOW FOR HANDLE IMAGE (FFHI). 1.- call to the handleImage from input type file, with onChange property (LINE 47).
        async function handleImage(event){
            console.log(event.target.files);
            //FFHI 2.-HandleImage receives the event through parameter that is an object with image properties.
            const extractImageURL = await helperForUpLoadingImageToFirebase(event.target.files[0]);

            if(extractImageURL !== ''){
                setFormData({
                    ...formData,
                    imageUrl : extractImageURL
                })
            }

        } 

        function handleTileClick(getCurrentItem){

            let cpySizes = [ ...formData.sizes ];
            const index = cpySizes.findIndex(item => item.id === getCurrentItem.id );

            if(index === -1){
                cpySizes.push(getCurrentItem);
            }else {
                cpySizes = cpySizes.filter((item)=> item.id !== getCurrentItem.id);
            }

            setFormData({
                ...formData,
                sizes : cpySizes
            })
        }

        console.log(formData);

        async function handleAddProduct(){
            setComponentLevelLoader({loading : true, id : ''});
            const res = currentUpdatedProduct !== null ? await updateProduct(formData) : await addNewProduct(formData);
            console.log(res);

            if(res.success){
                setComponentLevelLoader({loading : false, id : ''});
                toast.success(res.message, {
                    position : toast.POSITION.TOP_RIGHT
                });

                setFormData(initialFormData);
                setCurrentUpdatedProduct(null);
                setTimeout(() => {
                    router.push('/admin-view/all-products');
                }, 1000);

            }else {
                setComponentLevelLoader({loading : false, id : ''});
                toast.error(res.message, {
                    position : toast.POSITION.TOP_RIGHT
                });

                setFormData(initialFormData);
            }
            
        }

    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">

                    <input 
                        accept="image/*"
                        max="1000000"
                        type="file"
                        onChange={handleImage}
                    />

                    <div className="flex flex-col gap-2">
                        <label>Tallas disponibles</label>

                        <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes} />
                    </div>
                    {
                        adminAddProductformControls.map( controlItem => (
                            controlItem.componentType === 'input' ? (
                                <InputComponent 
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    value={formData[controlItem.id]}
                                    onChange={(event)=> {
                                        setFormData({
                                            ...formData,
                                            [controlItem.id] : event.target.value
                                        })
                                    }}
                                />
                            ) :
                            controlItem.componentType === 'select' ? (
                                <SelectComponent 
                                    label={controlItem.label}
                                    options={controlItem.options}
                                    value={formData[controlItem.id]}
                                    onChange={(event)=> {
                                        setFormData({
                                            ...formData,
                                            [controlItem.id] : event.target.value
                                        })
                                    }}
                                />
                            ) : null
                        ) )
                    }

                    <button onClick={handleAddProduct} className="inline-flex items-center justify-center w-full px-6 py-4 bg-black text-white text-lg font-medium uppercase tracking-wide ">
                        {
                            componentLevelLoader && componentLevelLoader.loading ? (
                            <ComponentLevelLoader 
                                text={currentUpdatedProduct !== null ? 'Actualizando Producto' : "Agregando Producto"}
                                color={"#ffffff"}
                                loading={componentLevelLoader && componentLevelLoader.loading}
                            /> ) : ( 
                            currentUpdatedProduct !== null ? 
                                'Actualizar Producto' : 'Agregar Producto'
                            )
                        }
                    </button>

                </div>
            </div>
            <Notification />
        </div>

    )
}