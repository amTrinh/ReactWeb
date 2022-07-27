import axios from 'axios';
import React from 'react';
import './Style/ItemCartComp.css';
function ItemCartComp(props) {

    const item = props.item

    const onResetCartList = async event => {
        event.preventDefault()
        try {
            await axios.delete(`http://localhost:5000/DeleteOrderById/${item._id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })

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

            return props.onReceiveCartList(list)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='item-box'>
            <div className='item-details'>
                <div className='mb-2 align-items-center row'>
                    <div className='pr-0 col-10'>
                        <div className='d-flex align-items-center'>
                            <img class="item-image mr-2" src={item.itemImg} alt='img' />
                            <a href='/shop' className='item-link one-line-ellipsis'>
                                <h5 className='item-name one-line-ellipsis'>
                                    {item.itemName}
                                </h5>
                            </a>
                        </div>
                    </div>
                    <div className='col-2 fl-r text-right'>
                        <button type='submit  icon-left removeProduct' onClick={onResetCartList} >
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className='align-items-center row'>
                    <div className='col-9'>
                        <p className='item-label'>Price</p>
                    </div>
                    <div className='text-right col-3'>
                        <p className='value price'>${item.itemPrice}</p>
                    </div>
                </div>
                <div className='align-items-center row'>
                    <div className='col-9'>
                        <p className='item-label'>Quantity</p>
                    </div>
                    <div className='text-right col-3'>
                        <p className='value price'>{item.number}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default ItemCartComp;