import React from 'react';
import { Table } from 'react-bootstrap';
import './Style/YourOrders.css'

const YourOrders = (props) => {


    const displayOrders = props.orders.map((item) => (
        <tr>
            <td><img src={item.itemImg} alt='Product' /></td>
            <td>{item.itemName}</td>
            <td className='number'>{item.number}</td>
            <td><span>${item.itemPrice}</span></td>
            <td>X</td>
        </tr>
    ))

    return (
        <div className='container'>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Orders</td>
                        <td>Product</td>
                        <td className='number'>Quatity</td>
                        <td><span>Price</span></td>
                    </tr>
                </thead>
                <tbody>
                    {displayOrders}
                </tbody>
            </Table>
        </div>

    )
};

export default YourOrders;
