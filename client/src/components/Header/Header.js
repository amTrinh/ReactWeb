import { Navbar, Container, Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart'
import { Link } from 'react-router-dom';
import './Header.css'
import axios from 'axios';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cartNumber, setCartNumber] = useState(0)

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await (await axios.get("http://localhost:5000/GetOrders", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })).data;
                setCartNumber(response.orders.length)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getItems()
    }, [])

    return (
        <>
            <Button className='no-bd position-rela btn-icon-cart' variant='a' onClick={handleShow}>
                <span className='fa-solid fa-cart-shopping'></span>
                <span className='cart-badge'>{cartNumber}</span>
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Cart />
            </Offcanvas>
        </>
    );
}

function Example() {
    return (
        <>
            {['end'].map((placement, idx) => (
                <OffCanvasExample key={idx} placement={placement} name={placement} />
            ))}
        </>
    );
}

function Header() {

    const onLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user_id')
    }
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [loggedinUser, setLoggedinUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await (await axios.get(`http://localhost:5000/GetUserById/${localStorage.getItem('user_id')}`)).data;
                setLoggedinUser(response.user)
            } catch (error) {
                if (error.response.data) return error.response.data
                else return { success: false, message: error.message }
            }
        }
        getUser()
    }, [])

    return (
        <div className='header'>
            <Navbar key='xll' bg="light" expand='xll' className="mb-3">
                <Container>
                    <Navbar.Brand href="/">The Fashion Store</Navbar.Brand>
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" >
                        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form>
                    {
                        (accessToken !== null && loggedinUser.isAdmin !== true) && <Example />
                    }
                    {
                        accessToken !== null &&
                        <NavDropdown title={loggedinUser.fullName} id="navbarScrollingDropdown">
                            {
                                loggedinUser.isAdmin === true ? <NavDropdown.Item href="/addproduct">Add Product</NavDropdown.Item> :
                                    <NavDropdown.Item href="/orders">Your orders</NavDropdown.Item>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={onLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                    {
                        accessToken === null &&
                        <div class="text-end">
                            <Link to='login'>
                                <button type="button" class="btn btn-outline-dark me-2 btn-success" >Login</button>
                            </Link>
                            <Link to='/register'>
                                <button type="button" class="btn btn-outline-dark me-2 btn-warning">Sign-up</button>
                            </Link>
                        </div>
                    }
                </Container>
            </Navbar>
            <hr />
        </div >
    )
}


export default Header;
