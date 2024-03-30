import { useDispatch } from "react-redux"
import { createUser, loginUser } from "../store/sessionReducer"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './auth.css'

const Auth = () => {
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
    const [errors, setErrors] = useState({
        messages: ""
    })
    

    useEffect( () => {
        setFormData(() => formType)
    }, [location]) // oh no i have a dependency loop! can't use on a cleanup because my component won't unmount, it will only re-render. 


    const handleChange = field => e => (
        setFormData( old => ({ ...old, [field] : e.target.value }))
    )

    const handleSubmit = e => {
        e.preventDefault()
        if (isLogin) {
            dispatch(loginUser(formData)).catch( async res => {
                let data = await res.json()
                
                setErrors( old => ({...old, messages:data.errors}))
                console.log(`error.messages`, errors.messages)
            })
        } else {
            dispatch(createUser(formData))
        }
    }
    return(
        <div className="page-wrapper">
        <div className={ isLogin ? "signin-wrapper" : "register-wrapper"}> 
            {isLogin && 
            <form className="signin" onSubmit={handleSubmit}>
                <div className="welcome">
                    <h1>Welcome Back!</h1>
                    <p>We're so excited to see you again!</p>
                </div>
                <label className={errors.messages ? "error" : "required"}> Email or username {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="text" value={formData.credential} onChange={handleChange('credential')} />
                
                <label className={errors.messages ? "error" : "required"}> Password {errors.messages && (
                        <span className="err-msg"> - {errors.messages}</span>)}
                </label>
                    <input type="password" value={formData.password} onChange={handleChange('password')} />
                
                <button type="submit"> Log In </button>
                <p className="bottom">Need an account? <Link to={`/register`}> Register </Link></p>
            </form>}
            {isLogin && <div className="separator"></div> }
            {isLogin && 
            <div className="signin-right">
                <p>Placeholder for dummy accounts</p>
            </div>}
            {isRegister && 
                <form className="register" onSubmit={handleSubmit}>
                    <h3>Create an account</h3>
                    <label className="required"> Email </label>
                        <input type="text" value={formData.email} onChange={handleChange('email')}/>
                    <label > Display Name </label>
                        <input type="text" value={formData.displayName} onChange={handleChange('displayName')}/>
                    <label className="required"> Username </label>
                        <input type="text" value={formData.username} onChange={handleChange('username')}/>
                    <label className="required"> Password </label>
                        <input type="password" value={formData.password} onChange={handleChange('password')}/>
                    <button type="submit"> Continue </button>
                    <p className="bottom"> <Link to={`/login`}> Already have an account? </Link></p>
                </form>
            }
        </div>
        </div>
    )
}

export default Auth

// Add a pseudo class for form labels to indicate 'required' and place a red asterisk at the end.