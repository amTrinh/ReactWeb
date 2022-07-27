import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import './Style/AddProduct.css'
import AlertMessage from '../layout/AlertMessage';

const AddProduct = (prod) => {
    const types = [
        {
            "typeName": "Shoe"
        },
        {
            "typeName": "Jacket"
        },
        {
            "typeName": "Sock"
        },
        {
            "typeName": "T-shirt"
        },
        {
            "typeName": "Hoodie"
        }
    ]
    const [inputs, setInputs] = useState({
        itemName: '',
        itemType: 'Shoe',
        description: '',
        itemPrice: 0,
        itemImg: ''
    });

    const [alert, setAlert] = useState(null)

    const [disable, setDisable] = useState(false)

    const onChangeInputs = event =>
        setInputs({ ...inputs, [event.target.name]: event.target.value })

    const addProduct = async (event) => {
        event.preventDefault();

        if (!inputs.itemType || !inputs.itemName || !inputs.description || !inputs.itemImg || !inputs.itemImg) {
            setAlert({ type: 'danger', message: 'There are mising fields!' })
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const response = await axios.post('http://localhost:5000/AddNewItem', inputs, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (!response.data.success) {
                setAlert({ type: 'danger', message: response.data.message })
                setTimeout(() => setAlert(null), 3000)
            } else {
                setDisable(true)
                setAlert({ type: 'success', message: response.data.message })
                setTimeout(() => setAlert(null), 3000)
                setTimeout(() => window.location.reload(false), 3000)
            }
        } catch (error) {
            setAlert({ type: 'danger', message: error })
            setTimeout(() => setAlert(null), 3000)
        }

    }

    return (
        <Form className="container borderShadow borderPadding" onSubmit={addProduct}>
            <h2>ADD PRODUCT</h2>
            <Form.Group className="style-flex">
                <Form.Group className="mb-3 flex1-item" controlId="formBasicEmail">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select required aria-label="Default select example" name="itemType" onChange={onChangeInputs}>
                        <option selected value={types[0].typeName}>{types[0].typeName}</option>
                        <option value={types[1].typeName}>{types[1].typeName}</option>
                        <option value={types[2].typeName}>{types[2].typeName}</option>
                        <option value={types[3].typeName}>{types[3].typeName}</option>
                        <option value={types[4].typeName}>{types[4].typeName}</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 flex2-item" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name="itemName" placeholder="Enter name" onChange={onChangeInputs} />
                </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" name="description" placeholder="Write some description ..." onChange={onChangeInputs} />
            </Form.Group>
            <Form.Group className="style-flex">
                <Form.Group className="mb-3 flex1-item" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control required type="number" name="itemPrice" onChange={onChangeInputs} />
                </Form.Group>
                <Form.Group className="mb-3 flex2-item" controlId="formBasicEmail">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control required type="text" name="itemImg" onChange={onChangeInputs} />
                </Form.Group>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={disable}>
                Submit
            </Button>
            <AlertMessage info={alert} />
        </Form>

    );
};

export default AddProduct;