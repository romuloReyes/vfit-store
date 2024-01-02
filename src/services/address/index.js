import Cookies from "js-cookie";




export const addNewAddress = async ( FormData )=>{

    try {

        const res = await fetch('api/address/add-new-address', {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(FormData)
        })

        const data = await res.json();

        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async ( id )=>{

    try {
        const res = await fetch(`/api/address/delete-address?id=${id}`, {
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        })

        const data = await res.json();

        return data;

        
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllAddresses = async ( id )=>{

    try {
        const res = await fetch(`api/address/get-all-address/${id}`, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        })
        const data = await res.json();

        return data;

        
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async ( FormData )=>{

    try {
        const res = await fetch('api/address/update-address', {
            method : 'PUT',
            headers :  {
                'Content-Type' : 'Application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(FormData)
        })

        const data = await res.json();

        return data;

        
    } catch (error) {
        console.log(error);
    }
}