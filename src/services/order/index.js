import Cookies from "js-cookie";



export const createNewOrder = async (formData)=>{

    try {
        const res = await fetch('/api/order/create-order', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),

        });

        const data = await res.json();
        return data;

        
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrdersForUser = async (id)=>{//`/api/order/get-all-orders?id=${id}`
    try {
        const res = await fetch(`/api/order/get-all-orders/${id}`, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        });

        const data = await res.json();
        return data;

        
    } catch (error) {
        console.log(error);
    }
}

export const getOrderDetails = async (id)=>{
    try {
        const res = await fetch(`/api/order/order-details/${id}`, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        });

        const data = await res.json();
        return data;

        
    } catch (error) {
        console.log(error);
    }
}