import { useDispatch } from "react-redux"
import { createUser, loginUser } from "../store/sessionReducer"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './loginForm.css'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const isLogin = location.pathname === '/login'
    const isRegister = location.pathname === '/register'

    const formType = isLogin ? {
        credential: '',
        password: ''
        } : {
            email: '',
            username: '',
            password: '',
            displayName: ''
        }
    const [formData, setFormData] = useState(formType)
    
    console.log('component is rerendering', formData, isLogin)

    useEffect( () => {
        setFormData(() => formType)
    }, [location]) // oh no i have a dependency loop! can't use on a cleanup because my component won't unmount, it will only re-render. 


    const handleChange = field => e => (
        setFormData( old => ({ ...old, [field] : e.target.value }))
    )

    const handleSubmit = e => {
        e.preventDefault()
        if (isLogin) {
            dispatch(loginUser(formData))
        } else {
            dispatch(createUser(formData))
        }
    }
    const testNew = e => {
        e.preventDefault()
        console.log( isLogin, `login`)
        console.log(formData)
    }

    return(
        <>
        <div className="signin-wrapper"> 
            {isLogin && 
            <form className="signin" onSubmit={handleSubmit}>
                <h3>Welcome Back!</h3>
                <p>We're so excited to see you again!</p>
                <label > Email or username </label>
                    <input type="text" value={formData.credential} onChange={handleChange('credential')} />
                
                <label > Password </label>
                    <input type="password" value={formData.password} onChange={handleChange('password')} />
                
                <button type="submit"> Log In </button>
                <p>Need an account? <Link to={`/register`}> Register </Link></p>
            </form>}
            {isLogin && 
            <div className="signin-right">
                <p>Placeholder for dummy accounts</p>
            </div>}
            {isRegister && 
                <form className="register" onSubmit={handleSubmit}>
                    <h3>Create an account</h3>
                    <label > Email </label>
                        <input type="text" value={formData.email} onChange={handleChange('email')}/>
                    <label > Display Name </label>
                        <input type="text" value={formData.displayName} onChange={handleChange('displayName')}/>
                    <label > Username </label>
                        <input type="text" value={formData.username} onChange={handleChange('username')}/>
                    <label > Password </label>
                        <input type="password" value={formData.password} onChange={handleChange('password')}/>
                    <button type="submit"> Continue </button>
                    <Link to={`/login`}> Already have an account? </Link>
                </form>
            }
        </div>
        </>
    )
}

export default LoginForm

// Add a pseudo class selector for form labels to indicate 'required' and place a red asterisk at the end.