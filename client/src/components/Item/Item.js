import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Carousel, Form, Button } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import AddReview from './AddReview';
import RatingList from './RatingList';
import './style/Item.css'
import axios from 'axios';
import AlertMessage from '../layout/AlertMessage';

function Item() {
    const location = useLocation();

    const navigate = useNavigate()

    const { _id } = location.state;

    const [itemDetails, setItemDetails] = useState({})
    const [alert, setAlert] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [number, setNumber] = useState(1)
    const [inputs, setInputs] = useState({
        n: 1
    })

    const accessToken = localStorage.getItem('accessToken')

    const { n } = inputs

    const onChangeNumber = event =>
        setInputs({ ...inputs, [event.target.name]: event.target.value })

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get(`http://localhost:5000/GetItemById/${_id}`)).data;
                setItemDetails(response.item)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await (await axios.get(`http://localhost:5000/GetUserById/${localStorage.getItem('user_id')}`)).data;
                setIsAdmin(response.user.isAdmin)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getUser()
    }, [])


    const onAddToCArt = async event => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/AddOrder', { item_id: itemDetails._id, number: n }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (response.data.success) {
                setAlert({ type: 'success', message: response.data.message })
                setTimeout(() => setAlert(null), 3000)
                // setTimeout(() => navigate('/'), 3000)
            }
        } catch (error) {
            setAlert({ type: 'danger', message: error })
            setTimeout(() => setAlert(null), 3000)
        }
    }

    const onRemove = async event => {
        event.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/DeleteItemById/${itemDetails._id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (response.data.success) {
                setAlert({ type: 'success', message: response.data.message })
                setTimeout(() => setAlert(null), 2000)
                setTimeout(() => navigate('/'), 2000)
            }
        } catch (error) {
            setAlert({ type: 'danger', message: error })
            setTimeout(() => setAlert(null), 2000)
        }
    }

    return (
        <>
            <div class="container">
                <div class="col-lg-13 borderShadow p-3 main-section bg-white">
                    <div class="row hedding m-0 pl-3 pt-0 pb-3">
                        {itemDetails.itemName}
                    </div>
                    <div class="row m-0">
                        <div class="col-lg-5 left-side-product-box pb-3">
                            <Carousel className='h-100'>
                                <Carousel.Item interval={1000} className='h-100'>
                                    <img
                                        className="d-block w-100 h-100 "
                                        src={itemDetails.itemImg}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item interval={500} className='h-100'>
                                    <img
                                        className="d-block w-100 h-100"
                                        src={itemDetails.itemImg}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className='h-100'>
                                    <img
                                        className="d-block w-100 h-100"
                                        src={itemDetails.itemImg}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div class="col-lg-7">
                            <div class="right-side-pro-detail border p-3 m-0">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <span>{itemDetails.itemType}</span>
                                        <p class="m-0 p-0">{itemDetails.itemName}</p>
                                    </div>
                                    <div class="col-lg-12">
                                        <p class="m-0 p-0 price-pro">${itemDetails.itemPrice}</p>
                                        <hr class="p-0 m-0" />
                                    </div>
                                    <div class="col-lg-12 pt-2">
                                        <h5>Product Detail</h5>
                                        <span>{itemDetails.description}</span>
                                        <hr class="m-0 pt-2 mt-2" />
                                    </div>
                                    <div className='iconContact'>
                                        <div className='d-flex'>
                                            <p className='btn-i fb transform forcus-p'><i class=" fa-brands fa-facebook-f"></i></p>
                                            <p className='btn-i tt transform forcus-p'><i class=" fa-brands fa-twitter"></i></p>
                                            <p className='btn-i em transform forcus-p'><i class=" fa-solid fa-envelope"></i></p>
                                            <p className='btn-i lk transform forcus-p'><i class=" fa-brands fa-linkedin-in"></i></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="number">
                                                <Form.Label><h6>Quantity :</h6></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="number"
                                                    name='n'
                                                    value={n}
                                                    title="Choose number"
                                                    className='text-center w-100 form-control'
                                                    onChange={onChangeNumber}
                                                />
                                            </Form.Group>
                                            <Form.Group className='row btnForm'>
                                                {
                                                    (isAdmin === false) ?
                                                        <Button className='col-lg-4 pb-2 btn btn-success ' variant="primary" type="submit" onClick={onAddToCArt}>
                                                            Add To Cart
                                                        </Button>
                                                        :
                                                        <Button className='col-lg-4 pb-2 btn btn-danger ' variant="primary" type="submit" onClick={onRemove}>
                                                            Remove this product
                                                        </Button>
                                                }
                                                <AlertMessage info={alert} />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='rating row mb-3 '>
                    <RatingList />
                    <div className='col-md-7'>
                        <AddReview />
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Item;
