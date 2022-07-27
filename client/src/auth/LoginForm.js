import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from '../components/layout/AlertMessage'

const LoginForm = () => {

    //Context
    const { loginUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState({
        userName: '',
        passWord: ''
    })

    const [alert, setAlert] = useState(null)

    const { userName, passWord } = loginForm

    const onChangeLoginForm = event =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData)
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 6000)
            } else {
                navigate('/')
                window.location.reload(false)
            }
        } catch (error) {
            console.log(error)
            setAlert({ type: 'danger', message: error })
            setTimeout(() => setAlert(null), 6000)
        }
    }

    return (
        <div className='landing' >
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Let's login</h1>
                    <Form onSubmit={login}>
                        <AlertMessage info={alert} />
                        <Form.Group>
                            <Form.Control type='text' placeholder='Username' name='userName' required value={userName} onChange={onChangeLoginForm} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='password' placeholder='Password' name='passWord' required value={passWord} onChange={onChangeLoginForm} />
                        </Form.Group>
                        <Button variant='success' type='submit'>Log-in</Button>
                    </Form>
                    <p>Don't have a account?
                        <Link to='/register'>
                            <Button variant='info' size='ms' className='ml-2'>Sign-up</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm