import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function MyVerticallyCenteredModal(props) {

    const navigate = useNavigate()
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Success
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Thank you for shopping with us at The Fashion Store</h4>
                <p>
                    This is details about your order:
                </p>
                <ul>
                    <li>Full Name: {props.fullName} </li>
                    <li>Phone Number: {props.inputs ? props.inputs.phonenumber : 'not'}</li>
                    <li>Address: {props.inputs ? props.inputs.address : 'not'}</li>
                    <li>Total: ${props.total}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    navigate('/')
                    window.location.reload(false)
                }}>Back to Shop</Button>
            </Modal.Footer>
        </Modal>
    );
}

function OrderSuccess({ fullName, total, inputs }) {
    const [modalShow, setModalShow] = React.useState(false);

    const onOrder = async (event) => {
        event.preventDefault()
        setModalShow(true)
        try {
            await axios.delete('http://localhost:5000/CompleteOrder', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
        } catch (error) {

        }
    }
    return (
        <>
            <Button type='submit' variant="primary" onClick={onOrder}>
                Order
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                fullName={fullName} total={total} inputs={inputs}
            />
        </>
    );
}

export default OrderSuccess;
