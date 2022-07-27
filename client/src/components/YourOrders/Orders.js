import React from 'react';
import { Form, Row, Col, ListGroup } from 'react-bootstrap';
import OrderSuccess from './OrderSuccess';
import YourOrders from './YourOrders';
import { useState, useEffect } from "react";
import axios from 'axios';
import './Style/YourOrders.css';
const Orders = () => {
    const [CartList, setCartList] = useState([])
    const [total, setTotal] = useState(0)
    const [fullName, setFullName] = useState('')

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get("http://localhost:5000/GetOrders", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })).data;
                const list = []
                let sum = 0
                response.orders.forEach(e => {
                    e.item_id.number = e.number
                    list.push(e.item_id)
                    sum = sum + e.item_id.itemPrice*e.number
                })
                setCartList(list)
                setTotal(sum)
                setFullName(response.orders[0].user_id.fullName)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='container'>
            <Row>
                <Col className='category bg-w ' sm={8}>
                    <ListGroup className=' borderShadow'>
                        <YourOrders orders={CartList} />
                    </ListGroup>
                </Col>
                <Col sm={4} className="sticky">
                    <Form className='info-user-name' onSubmit={handleSubmit}>
                        <div className='borderShadow' >
                            <h5>Information</h5>
                            <Form.Group className="mb-3" controlId="fullname">
                                <Form.Label>FullName</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Full Name"
                                    name='fullname'
                                    value={fullName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="number"
                                    placeholder="Phone Number"
                                    name='phonenumber'
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    placeholder="Address"
                                    required
                                    name='address'
                                    onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='borderShadow'>
                            <div className='cart-summary'>
                                <div className='summary-item row'>
                                    <div className='col-9'>
                                        <p className='sumary-label'>Free shipping</p>
                                    </div>
                                    <div className='text-right col-3 '>
                                        <p className='summary-value fl-r'>$0</p>
                                    </div>
                                </div>
                                <div className=' summary-item row'>
                                    <div className='col-9'>
                                        <p className='sumary-label'>Total</p>
                                    </div>
                                    <div className='text-right col-3 '>
                                        <p className='summary-value fl-r'>${total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='number'>
                                <OrderSuccess fullName={fullName} total={total} inputs={inputs} />
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>

    )
};

export default Orders;
