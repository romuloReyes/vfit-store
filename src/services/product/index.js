
import Cookies from "js-cookie";

export const addNewProduct = async (formData)=>{
    try {
        const result = await fetch('/api/admin/add-product', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get("token")}`
            },
            body : JSON.stringify(formData)
        });

        const data = await result.json();

        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getAllAdminProducts = async ()=>{
    console.log(process.env.NEXT_PUBLIC_URL);
    const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${url}/api/admin/all-products`, {
            method : 'GET',
            cache : 'no-store'
        });
        console.log('RESPUESTA:', res);
        const data = await res.json();
        console.log('RESPUESTA JSON: ', data);
        return data; 
        
    } catch (error) {
        console.error("Error fetching all products:", error);
        return { error: "Failed to fetch all products." };
    }
}

export const updateProduct = async (formData) => {
    try {
        const res = await fetch('/api/admin/update-product', {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });

        const data = await res.json();

        return data;


    } catch (error) {
        console.log(error);
    }
}

export const deletedProduct = async (id) => {
    try {
        const url = `/api/admin/delete-product/${id}`
        const res = await fetch(`/api/admin/delete-product/${id}`, {
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();

        return data;


    } catch (error) {
        console.log(error);
    }
}

export const productByCategory = async (id) => {
    const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${url}/api/admin/product-by-category/${id}`, {
            method : 'GET',
            cache : 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const productByID = async (id)=>{
    const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    try {
        
        const res = await fetch(`${url}/api/admin/product-by-id/${id}`, {
            method : 'GET',
            cache : 'no-store'
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}