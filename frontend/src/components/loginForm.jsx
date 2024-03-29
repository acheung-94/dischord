import { useDispatch } from "react-redux"
import { loginUser } from "../store/sessionReducer"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './loginForm.css'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        credential: '',
        password: ''
    })

    const handleChange = field => e => (
        setFormData( old => ({ ...old, [field] : e.target.value }))
    )

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }

    return(
        <>
        <div className="signin-wrapper"> 
            <form className="signin" onSubmit={handleSubmit}>
                <h3>Welcome Back!</h3>
                <h4>We are so excited to see you again!</h4>
                <label > Email or username </label>
                    <input type="text" value={formData.credential} onChange={handleChange('credential')} />
                
                <label > Password </label>
                    <input type="password" value={formData.password} onChange={handleChange('password')} />
                
                <button> Log In </button>
                <p>Need an account? <Link to={`/register`}> Register </Link></p>
            </form>
            <div className="signin-right">
                <p>Placeholder for dummy accounts</p>
            </div>
        </div>
        </>
    )
}

export default LoginForm

// Add a pseudo class selector for form labels to indicate 'required' and place a red asterisk at the end.