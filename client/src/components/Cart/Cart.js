import React, { useEffect, useState } from 'react'
import CartBody from './CartBody';
import CartCheckout from './CartCheckout';
import './Style/Cart.css'
import axios from 'axios';

function Cart() {

    const [total, setTotal] = useState(0)
    const [CartList, setCartList] = useState([])

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get("http://localhost:5000/GetOrders", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })).data;
                let sum = 0
                response.orders.forEach(e => {
                    sum = sum + e.item_id.itemPrice * e.number
                });
                setTotal(sum)
            } catch (error) {
                if (error.response) return error.response
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get("http://localhost:5000/GetOrders", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })).data;
                const list = []
                const listOrders = response.orders
                listOrders.forEach(e => {
                    e.item_id.number = e.number
                    e.item_id._id = e._id
                    list.push(e.item_id)
                })
                setCartList(list)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    const onReceiveCartInfo = async (list) => {
        setCartList(list)
        try {
            const response = await (await axios.get("http://localhost:5000/GetOrders", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })).data;
            let sum = 0
            response.orders.forEach(e => {
                sum = sum + e.item_id.itemPrice * e.number
            });
            setTotal(sum)
        } catch (error) {
            if (error.response) return error.response
            else return { success: false, message: error.message }
        }
    }


    return (
        <div className='cart-contain'>
            <div className='cart'>
                <CartBody CartList={CartList} onReceiveCartInfo={onReceiveCartInfo} />
            </div>
            <CartCheckout total={total} />
        </div>
    )
}


export default Cart;
