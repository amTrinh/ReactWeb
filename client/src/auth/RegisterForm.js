import { Link, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form'
import { useContext, useState } from "react"
import AlerMessage from '../components/layout/AlertMessage'
import { AuthContext } from "../contexts/AuthContext"


const RegisterForm = () => {
    const navigate = useNavigate()

    const { registerUser } = useContext(AuthContext)

    const [registerForm, setRegisterForm] = useState({
        fullName: '',
        userName: '',
        passWord: '',
        confirmPassWord: ''
    })

    const [alert, setAlert] = useState(null)

    const { fullName, userName, passWord, confirmPassWord } = registerForm

    const onChangRegisterForm = event =>
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const register = async event => {
        event.preventDefault()
        if (passWord !== confirmPassWord) {
            setAlert({ type: 'danger', message: 'Passwords do not match!' })
            setTimeout(() => setAlert(null), 6000)
            return
        }

        try {
            const registerData = await registerUser({ fullName, userName, passWord })
            console.log(registerData)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 2000)
            } else {
                setAlert({ type: 'success', message: registerData.message })
                setTimeout(() => setAlert(null), 2000)
            }
        } catch (error) {
            console.log(error)
            setAlert({ type: 'danger', message: error })
            setTimeout(() => setAlert(null), 6000)
        }

    }

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Sign up an account</h1>
                    <Form onSubmit={register}>
                        <AlerMessage info={alert} />
                        <Form.Group>
                            <Form.Control type='text' placeholder='Your fullname' name='fullName' required value={fullName} onChange={onChangRegisterForm} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Username' name='userName' required value={userName} onChange={onChangRegisterForm} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='password' placeholder='Password' name='passWord' required value={passWord} onChange={onChangRegisterForm} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='password' placeholder='Password' name='confirmPassWord' required value={confirmPassWord} onChange={onChangRegisterForm} />
                        </Form.Group>
                        <Button variant='success' type='submit'>Register</Button>
                    </Form>
                    <p>Don't have a account?
                        <Link to='/login'>
                            <Button variant='info' size='ms' className='ml-2'>Login</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm